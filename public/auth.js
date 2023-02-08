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

    auth.createUserWithEmailAndPassword(userEmail,userPassword).then(credential => {
        //console.log(credential) // For testing purposes
        signupForm.reset() // reset the form information
        const user = auth.currentUser; // Gather the current user information
        
        //location.reload(); // Reload the page so the new display name updates
            // Database Reference
        usersRef = db.collection('Users')
        const { serverTimestamp } = firebase.firestore.FieldValue;
            usersRef.add({
                uid: user.uid,
                UserName: userNameFirst + "" + userNameLast,
                UserEmail: userEmail,
                userPhone: userPhone,
                DateJoined: serverTimestamp()
            })

            
        user.updateProfile({
            displayName: userNameFirst
            
        })

        userNtfRef = db.collection('UserNotifications')
            userNtfRef.add({
                uid: user.uid,
                MessageHeading: `<i class="fas fa-check"></i> Congratulations`,
                MessageBody: `Your account for thomashansknecht.com has been created. We have sent you a verification email to the email address you provided which you should receive within the next few minutes. Note that while verification is not required it is recommended because if you forget/lose your password and do not use a valid email we will be unable to reset your password and you will be permanently locked out of your account without contacting Thomas F Hansknecht directly. To make changes to you account or update/add/remove any user details click on your user profile. Welcome to my website and have fun exploring.`,
                ReadStatus: false
            })
        

        auth.currentUser.sendEmailVerification().then(() => {
        // Email verification sent!
        console.log("Email verification sent");
        });

        
        //setTimeout(() => { window.location.reload(true); }, 5000); // Reload the page after 200ms seconds to allow database time to update first
        
    })
    .catch((error) => { // We need to present any errors to the user
        const errorCode = error.code;
        const errorMessage = error.message;
        const DisplayErrorCode = document.getElementById('CreateUserErrorCode');
        const DisplayErrorMessage = document.getElementById('CreateUserError');
        const DisplayErrorOccuredTitle = document.getElementById('CreateUserErrorOccuredTitle');
        //DisplayErrorOccuredTitle.innerHTML = "Uh Oh your account was not created"
        //DisplayErrorCode.innerHTML = "Error Code: " + errorCode;
        DisplayErrorMessage.innerHTML = `<h2 id="errorMessageHeading"><i class="fas fa-exclamation-triangle"></i> &nbsp; ${errorCode} &nbsp; <i class="fas fa-exclamation-triangle"></i></h2> <p> ${errorMessage} </p>`;
        document.getElementById("CreateUserError").style.transform = "translateY(0%)";
        setTimeout(() => {  
            document.getElementById("CreateUserError").style.transform = "translateY(-150%)";
         }, 10000); //Using this timeout makes the error message disappear after x miliseconds of being active

    });    
})

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
        console.log('Password Reset Email Sent')
        ResetForm.reset() // reset the form information

       
        //DisplayErrorMessage.innerHTML = "The reset password email was successfully sent to your inbox. You should receive the email within the next few minutes. If you do not receive an email it may be in your spam/junk folder or you did not have an account made/submited the wrong email address.";

    })

    .catch((error) => { // We need to present any errors to the user
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

    });

})


    