// Signup
const signupForm = document.querySelector('#signup-form'); // This is our sign up form
signupForm.addEventListener('submit', (e) => { // e is the event object
    e.preventDefault(); // prevent refreshing the page
    // get user info
    const userNameFirst = signupForm['user-name-first'].value; // Store the value of the user's first name
    const userNameLast = signupForm['user-name-last'].value; // Store the value of the user's last
    const userEmail = signupForm['user-email'].value;
    const userPhone = signupForm['user-phone'].value;
    
    const userPassword = signupForm['user-password'].value;

    //console.log(userName,userEmail,userPassword); // Used for Testing

    auth.createUserWithEmailAndPassword(userEmail,userPassword)
    
    .then(credential => {
        loadjscssfile("loadingScreen.css", "css") // dynamically load and add this .css file
        var elemDiv = document.createElement('div');
        elemDiv.id = "loading__Screen";
        elemDiv.innerHTML = (`
        <div class="loading__bar__container" id="loading__bar__container">
            <div class="loader">
                <div class="loader__bar"></div>
                <div class="loader__bar"></div>
                <div class="loader__bar"></div>
                <div class="loader__bar"></div>
                <div class="loader__bar"></div>
                <div class="loader__ball"></div>
            </div>
            <div class="Loading__Text">
                <h1> Creating Account </h1>
                <h2> ... Please Wait ... </h2>
                </div>
            
            </div>
        `)
        document.body.appendChild(elemDiv);
        document.getElementById('loading__bar__container').classList.add("animateIn");



        // console.log("User credentials: " + credential) // For testing purposes
        signupForm.reset() // reset the form information
        const { serverTimestamp } = firebase.firestore.FieldValue;
        defineUserInformation(userNameFirst,userNameLast,userPhone,serverTimestamp,userEmail);

        //setTimeout(() => { window.location.reload(true); }, 5000); // Reload the page after 200ms seconds to allow database time to update first
        
    }).catch(error => {
        GenerateUIErrorMsg(error);
    });



    
    
});


async function defineUserInformation(userNameFirst,userNameLast,userPhone,serverTimestamp,userEmail){ 
        
    //location.reload(); // Reload the page so the new display name updates
        // Database Reference


        // THE 58 WILL NEED TO BE CHANGED IF WE EVER ADD OR REMOVE ICON OPTIONS
        /*
    var randomIconNumber = Math.floor(Math.random() * 58) + 1;
    var profileIconURL = defaultProfileIconURL;
    var randomIcon = document.getElementById('iconSelectionImage__' + randomIconNumber);
    if(randomIcon != null) {
        profileIconURL = randomIcon.src;
    }
    */

    usersRef = await database.collection('Users')
        usersRef.add({
            uid: currentUser.uid,
            UserName: userNameFirst + " " + userNameLast,
            UserEmail: userEmail,
            userPhone: userPhone,
            DateJoined: serverTimestamp()
        })
        .then(
            await currentUser.updateProfile({
                displayName: userNameFirst + " " + userNameLast,
            })
            .then(
                createUserWelcomeMessage(serverTimestamp)
            )
        )
        .catch(error => {
            GenerateUIErrorMsg(error);
        });

        
    
        
    

    

};

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }


async function createUserWelcomeMessage(serverTimestamp)
{
    
    // We may need to try a few times to send the new user welcome message since the user's full profile may not be loaded yet
    // Lets try to send the message 5 times
    
    let attemptsSoFar = 0;
    var userWelcomeMessageSent = false;
    
    while(userWelcomeMessageSent == false && attemptsSoFar < 5) {

        if(currentUser.uid != null && currentUser.displayName != null && currentUser.email != null) {
        
            userNtfRef = database.collection('User_Notifications')
                userNtfRef.add({
                    uid: currentUser.uid,
                    Heading: `<i class="fas fa-check" style="color:green;"></i> Welcome ${currentUser.displayName},`,
                    Body: `<p>Your account for thomashansknecht.com has been created. I have sent a verification email to ${currentUser.email} which should be received soon. Note that while verification is not required it is recommended. To make changes to you account or update/add/remove any user details click on your user profile. Welcome to my website and have fun exploring.</p>`,
                    CreationDate: serverTimestamp() 
                })
                .then(async function(docRef) {
                    userWelcomeMessageSent = true;
                    userNotificationCount++;
                    // Updating the Notification count UI to show this notification was added
                    let notificationCount = generalNotificationCount + userNotificationCount;
                    console.log('Total Number of Notifications Updated: ', notificationCount);
                    numOfNotificationsDesktop.innerHTML = notificationCount;
                    numOfNotificationsMobile.innerHTML = notificationCount;
    
    
                    //console.log("User Notification Document Added To Database with ID: ", docRef.id);
                    var fullDocument = await UserNotificationsCollection.where(firebase.firestore.FieldPath.documentId(), '==', docRef.id).get()
                    //console.log("Full Document after completion: ", fullDocument);
                    // unshift will push elements to the beginning of the array which will reflect queries ordered by creation date/time
                    userCreatedNotifications.unshift(fullDocument);
                    await delay(5000);
                    document.getElementById('loading__bar__container').classList.remove("animateIn");
                    await delay(1000);
                    removejscssfile("loadingScreen.css", "css"), //remove all occurences "somestyle.css" on page
                    document.getElementById('loading__Screen').remove();
                    buildNotificationsHtml(),
                    
                    document.getElementById('notificationPageContainer').classList.add('visible');
                    notificationPageText.scrollIntoView(({behavior: "smooth", block: "start", inline: "nearest"}))
                    
                    
                    
                     // Now we need to remove the new notification ui and show the added message from the server
                    // Now we need to animate the notification appearing

                    // Now we can remove the loading screen
                    
                       
                        
                    
                });
        };

        attemptsSoFar++;
        if(userWelcomeMessageSent == false) {
            console.warn("Welcome Message failed to generate " + attemptsSoFar + " times so far");
        };

        await delay(2000);
    };
    
    
    // auth.currentUser.sendEmailVerification().then(() => {
    // Email verification sent!
    // console.log("Email verification sent");
    // });

}

function removejscssfile(filename, filetype){
    var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
    var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
    var allsuspects=document.getElementsByTagName(targetelement)
    for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
    if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
        allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
    }
}
 




// Customer Log In
const logInForm = document.querySelector('#logIn-form'); // This is our sign up form
logInForm.addEventListener('submit', (e) => { // e is the event object
    e.preventDefault(); // prevent refreshing the page
    // get user info
    
    const logInEmail = logInForm['logIn-email'].value;
    const logInPassword = logInForm['logIn-password'].value;

    //console.log(logInEmail,logInPassword); // Used for Testing

    auth.signInWithEmailAndPassword(logInEmail,logInPassword).then(credential => {
        //console.log(credential) // For testing purposes
        logInForm.reset() // reset the form information    
    
    })

    .catch((error) => { // We need to present any errors to the user
        GenerateUIErrorMsg(error);

    });    
})

// Customer Reset Password
const ResetForm = document.querySelector('#passwordReset-form'); // This is our sign up form
ResetForm.addEventListener('submit', (f) => { // f is the event object
    f.preventDefault(); // prevent refreshing the page
    // get user info
    
    const resetEmail = ResetForm['resetPassword-email'].value;

    //console.log(resetEmail); // Used for Testing

    auth.sendPasswordResetEmail(resetEmail).then(() => {
        //console.log('Password Reset Email Sent');
        GenerateUISuccessMsg("Password Reset Request Received","Your Request to Reset Your Password is being processed. Check your email within the next few minutes to finish your request");
        ResetForm.reset(); // reset the form information

       
        //DisplayErrorMessage.innerHTML = "The reset password email was successfully sent to your inbox. You should receive the email within the next few minutes. If you do not receive an email it may be in your spam/junk folder or you did not have an account made/submited the wrong email address.";

    })

    .catch((error) => { // We need to present any errors to the user
        GenerateUIErrorMsg(error);
    });

})

function GenerateUIErrorMsg(error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    const DisplayErrorMessage = document.getElementById('CreateUserError');
    //DisplayErrorOccuredTitle.innerHTML = "Uh Oh your account was not created"
    //DisplayErrorCode.innerHTML = "Error Code: " + errorCode;
    DisplayErrorMessage.innerHTML = `<h2 id="errorMessageHeading"><i class="fas fa-exclamation-triangle"></i> &nbsp; ${errorCode} &nbsp; <i class="fas fa-exclamation-triangle"></i></h2> <p> ${errorMessage} </p>`;
    document.getElementById("CreateUserError").style.transform = "translateY(0%)";
    setTimeout(() => {  
        document.getElementById("CreateUserError").style.transform = "translateY(-150%)";
     }, 10000); //Using this timeout makes the error message disappear after x miliseconds of being active
}


    