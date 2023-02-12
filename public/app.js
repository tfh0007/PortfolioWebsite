let isProfileLoaded = false;
let generalNotificationsLoaded = false;
let userNotificationsLoaded = false;
var currentUser = null;
let generalNotificationCount = 0;
let userNotificationCount = 0;
let userNotificationsSet = new Set();

notificationTypeToLoad = 1; // 1 is for general, 2 is for user specific

///// User Authentication /////
const auth = firebase.auth();
const whenSignedOut = document.getElementById('whenSignedOut');
const signInGoogleBtn = document.getElementById('signInGoogleBtn');
const signInMetaBtn = document.getElementById('signInMetaBtn');
const signOutBtn = document.getElementById('signOutBtn');
const editProfileBtn = document.getElementById('editProfileBtn');
const settingsBtn = document.getElementById('settingsBtn');
const userDetails = document.getElementById('userAndMyLogo');
const navbarLoginBtn = document.getElementById('navbar-logIn');
const navbarSignUpBtn = document.getElementById('navbar-signUp');
const mainPageContactFormBtn = document.getElementById('contactFormSubmitBtn');
const numOfNotificationsMobile = document.getElementById('setNumOfNotifications-mobile');
const numOfNotificationsDesktop = document.getElementById('setNumOfNotifications');
const showProfileBtn = document.getElementById('navbar__desktop__Profile');
const notificationTypeUserBtn = document.getElementById("notificationTypeUserBtn");
const notificatonTypeGeneralBtn = document.getElementById("notificatonTypeGeneralBtn");
var notificationPageText = document.getElementById("notificationPageText");
var emailSubmissionForm = document.getElementById("my-form");

/*
try {
    const booksRef = firebase.firestore().collection("General_Notifications");
    console.log("Global Notification Data: ")
    booksRef.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        }));
        console.log(data);
    });
    
}
catch(error) {
GenerateUIErrorMsg(error);
};

*/
// FIREBASE NOTIFICATION RETRIEVAL
const database = firebase.firestore();
const GeneralNotificationsCollection = database.collection("General_Notifications");
const UserNotificationsCollection = database.collection("User_Notifications");
let generalNotificationsData = null;
var userNotificationsData = null;
var userNotificationDocumentIDs = [];
var deletedUserNotificationDocumentIDs = new Set();
var userCreatedNotifications = [];


retrieveNotifications();
setEmailFormStatus();

function startTimer(message) {
    timer = setInterval(function() { 
        console.log(message); 
    }, 1000);
}

function buildNotificationsHtml() {
   
    // Now we ned to look through the data and append the notifications to the html
    if(notificationTypeToLoad == 1) {
        if(generalNotificationCount == 0) {
            notificationPageText.innerHTML = (`
                <div class = "notification__heading__msg">
                <h1> No New Notifications To Read </h1> 
                </div>
            `);
        }
        else {
        notificationPageText.innerHTML = "";
        }

        // Need some stop condition here
        if(generalNotificationsLoaded == false) {
            console.log("General Notifications Data Not Loaded Yet");
            return;
        }

        generalNotificationsData.forEach(doc => {
            notificationPageText.innerHTML += (`
            <div class = "notification__Container">
                <div class = "notification__heading__msg">
                    <h1> ${doc.data().Heading} </h1> 
                    <p> ${doc.data().Body} </p> 
                </div>
            </div>
            `);
        });
    }
    else if(notificationTypeToLoad == 2) {

        // Now we ned to look through the data and append the notifications to the html
        if(userNotificationCount == 0) {
            notificationPageText.innerHTML = (`
                <div class = "notification__heading__msg">
                <h1> No New Notifications To Read </h1> 
                </div>
            `);
        }
        else {
            notificationPageText.innerHTML = "";
        }

        // Need some stop condition here
        if(userNotificationsLoaded == false) {
            console.log("User Notifications Data Not Loaded Yet"); 
            return;
        }

        let notificationIndex = 0;
        userNotificationsSet.clear();

        // We need to delete all the old action listeners everytime we update the text
        var elem = document.getElementById('notificationPageText');
        elem.replaceWith(elem.cloneNode(true));
        notificationPageText = document.getElementById("notificationPageText");

        // We need to clear out our array of data
        userNotificationDocumentIDs = [];

        // May want to show that these are new somehow
        for(let i=0; i < userCreatedNotifications.length; i++) {
            console.log(userCreatedNotifications);
            var stuff = userCreatedNotifications[i];
            stuff.forEach(doc =>  {
                if(doc == null || deletedUserNotificationDocumentIDs.has(doc.id)) {
                    console.warn("Doc was null in user Created Notifications array");
                    console.log(doc);
                    return; // In a for each loop return is equivalent to continue
                }
                let notificationId = `notification__btn__${notificationIndex}`;
                let notificationContainerId = `notification__Container__${notificationIndex}`;
                let curNotificationIndex = notificationIndex;
                notificationPageText.innerHTML += (`
                <div class = "notification__Container" id="${notificationContainerId}">
                    <div class = "notification__icon">
                        <p> <button class = "notification__btn" id = "${notificationId}" > <i class="far fa-times-circle"></i> </button> </p>
                    </div>
                    <div class = "notification__heading__msg">
                        <h1> ${doc.data().Heading} </h1> 
                        <p> ${doc.data().Body} </p> 
                    </div>
                    <div class ="new_notification__icon">
                        <p><button class = "notification__btn" id="newNotificationIcon"> *new* </button></p>
                    </div>
                </div>
                `);
                userNotificationDocumentIDs.push(doc.id);
                // We need to dynamically create button action listners based on the id number of the button
                // We only want to add a click event listener if one does not already exist
                
                if(!userNotificationsSet.has(notificationId)) {

                    document.getElementById("notificationPageText").addEventListener("click", e => {
                    const target = e.target.closest("#" + notificationId); // Or any other selector.
                    
                    //console.log("How many times is this read?");
                    
                    if(target){
                        // We need to keep track of what buttons exist so we do not create duplicate events
                        userNotificationsSet.add(notificationId);
                        deleteNotification(curNotificationIndex,notificationContainerId);
                    // Do something with `target`.
                    }
                });

                }
                
                notificationIndex++;
            });
        };

        // These are the notifications that came directly from the latest database request
        userNotificationsData.forEach(doc => {
            // If we already deleted the document from the server but have not updated the local storage to remove it ignore the document
            if(doc == null || deletedUserNotificationDocumentIDs.has(doc.id)) {
                return; // In a for each loop return is equivalent to continue
            }
            let notificationId = `notification__btn__${notificationIndex}`;
            let notificationContainerId = `notification__Container__${notificationIndex}`;
            let curNotificationIndex = notificationIndex;
            notificationPageText.innerHTML += (`
            <div class = "notification__Container" id="${notificationContainerId}">
                <div class = "notification__icon">
                    <p> <button class = "notification__btn" id = "${notificationId}" > <i class="far fa-times-circle"></i> </button> </p>
                </div>
                <div class = "notification__heading__msg">
                    <h1> ${doc.data().Heading} </h1> 
                    <p> ${doc.data().Body} </p> 
                </div>
            </div>
            `);
            userNotificationDocumentIDs.push(doc.id);
            // We need to dynamically create button action listners based on the id number of the button
            // We only want to add a click event listener if one does not already exist
            
            if(!userNotificationsSet.has(notificationId)) {

                document.getElementById("notificationPageText").addEventListener("click", e => {
                const target = e.target.closest("#" + notificationId); // Or any other selector.
                
                //console.log("How many times is this read?");
                
                if(target){
                    // We need to keep track of what buttons exist so we do not create duplicate events
                    userNotificationsSet.add(notificationId);
                    deleteNotification(curNotificationIndex,notificationContainerId);
                  // Do something with `target`.
                }
              });

            }
            
            notificationIndex++;
        });

        

        notificationPageText.innerHTML += (`
                <div id="CreateUserNotificationContainer">
                    <button class="CreateNewUserNotificationBtn" id="CreateNewUserNotificationBtn"> Create New Notification </button>
                </div>
            `);
            // We need to delete all the old action listeners everytime we update the text
            var elem = document.getElementById('CreateUserNotificationContainer');
            elem.replaceWith(elem.cloneNode(true));
        
            document.getElementById("CreateUserNotificationContainer").addEventListener("click", e => {
                const target = e.target.closest("#CreateNewUserNotificationBtn"); // Or any other selector.
                
                //console.log("How many times is this read?");
                
                if(target){
                    // We need to keep track of what buttons exist so we do not create duplicate events
                    addNewUserNotification();
                  // Do something with `target`.
                }
              });
    }
    let notificationCount = generalNotificationCount + userNotificationCount;
    console.log('Total Number of Notifications Updated: ', notificationCount);
    numOfNotificationsDesktop.innerHTML = notificationCount;
    numOfNotificationsMobile.innerHTML = notificationCount;
    numOfNotificationsDesktop.classList.add("fadeIn");
    numOfNotificationsMobile.classList.add("fadeIn");

}

async function addNewUserNotification() {
    console.log("Need to add new notification here");
    var element = document.getElementById("CreateUserNotificationContainer")
    element.parentNode.removeChild(element)
    
    // Now we can add the html for a create new notification form
    notificationPageText.innerHTML += (`
    <div class= "New__Notification__Form__Container" id="New__Notification__Form__Container">
        <form id="New__Notification__Form" onsubmit = "return false">
            <label for="messageHeading">Message Heading</label>
            <input class="notificationInputBox" type="text" id="messageHeading" placeholder="Type Something" required>
            <label for="messageBody">Message Body</label>
            <textarea class="notificationInputBox" type="text" name="message" rows="6" placeholder="Type Something" id="messageBody" required> </textarea>
            <div class="notificationTypes">
                <button id="SubmitNewNotification" class="btn btn-success"> Upload Notification </button>
                <button id="CancelNewNotification" class="btn btn-success" formnovalidate> Cancel Upload </button>	
            </div>
        </form>
    </div>

    `);

    document.getElementById("SubmitNewNotification").onclick = function() {UploadNewUserNotification(document.getElementById("messageHeading").value,document.getElementById("messageBody").value)};
    document.getElementById("CancelNewNotification").onclick = function() {VisuallyProccessNewUserNotification(false)};
    


}

async function UploadNewUserNotification(heading, body) {

    console.log("Message Heading: " + heading);
    console.log("Message Body: " + body);

    
    if(heading == null || heading === "") {
        console.log("Can't upload notification because heading is null");
        return;
    }
    if(body == null || body === "") {
        console.log("Can't upload notification because body is null");
        return;
    }

    if(currentUser == null) {
        console.log("Can't upload notification because user is not logged in");
        return;
    }

    console.log("Time to upload the new notification");

    
        const { serverTimestamp } = firebase.firestore.FieldValue;
            await UserNotificationsCollection.add({
                uid: currentUser.uid,
                Heading: heading,
                Body: body,
                CreationDate: serverTimestamp()
            })
            .then(async function(docRef) {
                userNotificationCount++;
                // Updating the Notification count UI to show this notification was added
                let notificationCount = generalNotificationCount + userNotificationCount;
                console.log('Total Number of Notifications Updated: ', notificationCount);
                numOfNotificationsDesktop.innerHTML = notificationCount;
                numOfNotificationsMobile.innerHTML = notificationCount;


                console.log("User Notification Document Added To Database with ID: ", docRef.id);
                var fullDocument = await UserNotificationsCollection.where(firebase.firestore.FieldPath.documentId(), '==', docRef.id).get()
                console.log("Full Document after completion: ", fullDocument);
                // unshift will push elements to the beginning of the array which will reflect queries ordered by creation date/time
                userCreatedNotifications.unshift(fullDocument);
                 // Now we need to remove the new notification ui and show the added message from the server
                VisuallyProccessNewUserNotification(true)
                .then(function() {
                    // Now we need to animate the notification appearing
                    notificationPageText.scrollIntoView(({behavior: "smooth", block: "start", inline: "nearest"}))
                        
                    buildNotificationsHtml();
                    
                });
                
            })
            .catch(function(error) {
                GenerateUIErrorMsg(error);
            });
            
            
           
    
    

    

}

async function VisuallyProccessNewUserNotification(notificationAccepted) {
    console.log("Time to cancel the new notification upload");

    document.getElementById("New__Notification__Form__Container").className = "Delete__Notification";

    if(notificationAccepted == false) {
        document.getElementById("New__Notification__Form__Container").classList.add("delete");
    }
    else {
        document.getElementById("New__Notification__Form__Container").classList.add("approve");
    }
        element = document.getElementById("New__Notification__Form__Container");
        // Now that we deleted the message we need to look for all messages that are under the current message and move those up
        await delay(500);
        element.parentNode.removeChild(element)

        notificationPageText.innerHTML += (`
                <div id="CreateUserNotificationContainer">
                    <button class="CreateNewUserNotificationBtn" id="CreateNewUserNotificationBtn"> Create New Notification </button>
                </div>
            `);
            // We need to delete all the old action listeners everytime we update the text
            var elem = document.getElementById('CreateUserNotificationContainer');
            elem.replaceWith(elem.cloneNode(true));
        
            document.getElementById("CreateUserNotificationContainer").addEventListener("click", e => {
                const target = e.target.closest("#CreateNewUserNotificationBtn"); // Or any other selector.
                
                //console.log("How many times is this read?");
                
                if(target){
                    // We need to keep track of what buttons exist so we do not create duplicate events
                    addNewUserNotification();
                  // Do something with `target`.
                }
              });
}

async function deleteNotification(deletionIndex,notificationId) {
    
    // Now it is time to delete this notification both in the UI and in the server
    // First lets delete from the server
    var docId = userNotificationDocumentIDs[deletionIndex];
    console.log("The doc id to delete is " + docId)
    try {
        await UserNotificationsCollection.doc(docId).delete();
        userNotificationCount--;

        // Now it is time to visually delete th notification
        // The html id for the notification container will be located in the notificationId
        console.log("Need to graphically remove Notification with ID value: " + notificationId);
        document.getElementById(notificationId).className = "Delete__Notification";
        document.getElementById(notificationId).classList.add("delete");
        element = document.getElementById(notificationId);
        // Now that we deleted the message we need to look for all messages that are under the current message and move those up
        await delay(500);
        element.parentNode.removeChild(element)

        // The element is deleted in the server and visually but we still have a local copy of the element stored so we need to delete that too
        console.log("Flaging notification document to never be shown again while stored as current local cache");
        deletedUserNotificationDocumentIDs.add(docId);

        // Updating the Notification count UI to show this notification was deleted
        let notificationCount = generalNotificationCount + userNotificationCount;
        console.log('Total Number of Notifications Updated: ', notificationCount);
        numOfNotificationsDesktop.innerHTML = notificationCount;
        numOfNotificationsMobile.innerHTML = notificationCount;

    }
    catch(error) {
        GenerateUIErrorMsg(error);
        return;
    }


    







    

}

function setEmailFormStatus() {
    var elements = emailSubmissionForm.elements;

    if(currentUser == null) {
        for (var i = 0, len = elements.length; i < len; ++i) {
            elements[i].disabled = true;
        }
        document.getElementById('contactFormLockObj').style['display'] = "block";
        document.getElementById('contactFormLockTxt').style['display'] = "block";
        document.getElementById('emailSubmissionBtn').style['display'] = "none";
        document.getElementById('userFirst').classList.add('disable');
        document.getElementById('userLast').classList.add('disable');
        document.getElementById('userEmail').classList.add('disable');
        document.getElementById('textBoxArea').classList.add('disable');
        
        
    }
    else {
        for (var i = 0, len = elements.length; i < len; ++i) {
            elements[i].disabled = false;
        } 
        document.getElementById('contactFormLockObj').style['display'] = "none";
        document.getElementById('contactFormLockTxt').style['display'] = "none";
        document.getElementById('emailSubmissionBtn').style['display'] = "block";
        
        
        document.getElementById('userFirst').classList.remove('disable');
        document.getElementById('userLast').classList.remove('disable');
        document.getElementById('userEmail').classList.remove('disable');
        document.getElementById('textBoxArea').classList.remove('disable');
            
        
       
    }


}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }



async function retrieveNotifications() {

    try {
        
        generalNotificationsData = await GeneralNotificationsCollection.orderBy('CreationDate', 'desc').orderBy('Heading','Body').get();
        generalNotificationsLoaded = true;
        generalNotificationCount = generalNotificationsData.size;

        if(currentUser != null) {

            // We need to look for user specific entries here
            userNotificationsData = await UserNotificationsCollection.orderBy('CreationDate', 'desc').orderBy('Heading','Body','uid').where('uid', '==', currentUser.uid).get();
            userNotificationsLoaded = true;
            userNotificationCount = userNotificationsData.size;
        }

        console.log("Number of General Notifications " + generalNotificationCount);
        console.log("Number of User Specific Notifications " + userNotificationCount);

        let notificationCount = generalNotificationCount + userNotificationCount;
        
        console.log('Total Number of Notifications: ', notificationCount);

        numOfNotificationsDesktop.innerHTML = notificationCount;
        numOfNotificationsMobile.innerHTML = notificationCount;
    }
    catch(error) {
        numOfNotificationsDesktop.innerHTML = "ERR";
        numOfNotificationsMobile.innerHTML = "ERR";
        GenerateUIErrorMsg(error);
    }

    



    buildNotificationsHtml();
}






const provider = new firebase.auth.GoogleAuthProvider();
// Settings for FacebookAuthprovider can be found at https://developers.facebook.com/apps/
// Name of project is Sign In for Thomas Portfolio
const provider2 = new firebase.auth.FacebookAuthProvider()


/// Button handlers

signInGoogleBtn.onclick = () => auth.signInWithPopup(provider);
signInMetaBtn.onclick = () => auth.signInWithPopup(provider2);
signOutBtn.onclick = () => auth.signOut();
showProfileBtn.onclick = function() {loadBaseProfileInfo()};
notificatonTypeGeneralBtn.onclick = function() {setNotificationType(1)};
notificationTypeUserBtn.onclick = function() {setNotificationType(2)};


auth.onAuthStateChanged(user => {
    if (user) {
        // signed in
        currentUser = user;
        whenSignedOut.hidden = true;
        navbarLoginBtn.hidden = true;
        navbarSignUpBtn.hidden = true;
        signOutBtn.hidden = false;
        editProfileBtn.hidden = false;
        settingsBtn.hidden = false;
        notificationTypeUserBtn.hidden = false;
        notificatonTypeGeneralBtn.hidden = false;
        notificationTypeToLoad = 2; // When user logged in default notification type to user specific
        setNotificationType(notificationTypeToLoad);
        // If the user logs in we need to update the total number of notifications
        retrieveNotifications();

        // FOR RIGHT NOW ADD A BUNCH OF DUMMY NOTIFICATIONS WHEN USER LOGS IN AND NO NOTFICATIONS ALREADY EXIST
        /*
        if(userNotificationCount == 0) {
            const entries = Math.floor(Math.random() * 100) + 30;  //returns a random integer from 5 to 50
            console.log("Generating " + entries + " Random Notifications. Remove this process before production");
            for(var i = 0; i < entries; i++) {
                const { serverTimestamp } = firebase.firestore.FieldValue;
                UserNotificationsCollection.add({
                    uid: currentUser.uid,
                    Heading: faker.name.findName(),
                    Body: faker.lorem.sentence(),
                    CreationDate: serverTimestamp()
                });
            }
           
        }
        */
        
        
        //mainPageContactFormBtn.style.display = "inline"; //makes the buttom visible and usable as an inline style
        //document.getElementById("lockTheContactForm").style['pointer-events'] = 'all';
        //document.getElementById("contactFormLockObj").style['display'] = 'none'
        //document.getElementById("contactFormLockTxt").style['display'] = 'none'
        //document.getElementById("my-form").style['opacity'] = '1'

        //numOfNotificationsDesktop.innerHTML = "?";
        //numOfNotificationsMobile.innerHTML = "?";
        
        
    } else {
        // not signed in
        currentUser = null;
        whenSignedOut.hidden = false;
        userDetails.innerHTML = `<h3> Guest <h3> <p> ID: Unregistered </p>`;
        navbarLoginBtn.hidden = false;
        navbarSignUpBtn.hidden = false;
        signOutBtn.hidden = true;
        editProfileBtn.hidden = true;
        settingsBtn.hidden = true;
        isProfileLoaded = false;
        notificationTypeUserBtn.hidden = true;
        notificatonTypeGeneralBtn.hidden = true;
        notificationTypeToLoad = 1; // When user logged out default notification type to general
        userNotificationCount = 0; // When no user is present then no user notifications will exist
        setNotificationType(notificationTypeToLoad);
        // We need to clear out the user created and deleted notifications othewise when we log into another account these cached messages will follow
        userCreatedNotifications = [];
        deletedUserNotificationDocumentIDs.clear();

        //mainPageContactFormBtn.style.display = "none"; //makes the button invisible and unusable
        //document.getElementById("lockTheContactForm").style['pointer-events'] = 'none';
        //document.getElementById("contactFormLockObj").style['display'] = 'inline'
        //document.getElementById("contactFormLockTxt").style['display'] = 'inline'
        //document.getElementById("my-form").style['opacity'] = '0.2'
        //numOfNotificationsDesktop.innerHTML = "?";
        //numOfNotificationsMobile.innerHTML = "?";


    }
    setEmailFormStatus();
});

function setNotificationType(type) {
    notificationTypeToLoad = type;
    notificatonTypeGeneralBtn.classList.remove('focus')
    notificationTypeUserBtn.classList.remove('focus');

    if(type == 1) {
        notificatonTypeGeneralBtn.classList.add("focus");
        // console.log("Notification Type set to General");
        // More work needed to display notifications from server








    }
    else if (type == 2) {
        notificationTypeUserBtn.classList.add("focus");
        // console.log("Notification Type set to User Specific");
        // More work needed to display notifications from server





    }
    buildNotificationsHtml();
    console.log("");

}

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


function loadBaseProfileInfo() {
    // console.log("Profile button clicked");
    // Check if user is logged in
    
    if(currentUser != null) {
        // console.log("Profile Is Not Null");
        if(isProfileLoaded == false) {

            if (!currentUser.displayName) {
                    
                userDetails.innerHTML = `<h3>...Loading...<h3>` // We need to wait for the data to update
                setTimeout(() => { userDetails.innerHTML = `<h3> ${currentUser.displayName}</h3> <p>ID: ${currentUser.uid}</p>`; }, 10000); // This implementation is static and does not update when needed
            }
            else {
                userDetails.innerHTML = `<h3> ${currentUser.displayName}</h3> <p> ID: ${currentUser.uid}</p>`;
                isProfileLoaded = true;
            }
        }
        else {
            // console.log("Profile Already Loaded");
        }

    }
    else {
        // console.log("Profile Is Null");
    }

    // console.log("");
    // console.log("");
}


// Handling FormSpree Submissions
var form = document.getElementById("my-form");
    
    async function handleSubmit(event) {
        if(currentUser == null) {
            const myCustomError = new Error('Contact submissions only allowed when valid user is identified. Please sign in to continue this process.');
            myCustomError.code = 'auth/user-not-present';
            GenerateUIErrorMsg(myCustomError);
            return;
          }
      event.preventDefault();
      
      document.getElementById("userUID").value = currentUser.uid;
      document.getElementById("userDisplayName").value = currentUser.displayName;
      document.getElementById("userAccountEmail").value = currentUser.email;
      document.getElementById("userAccountPhone").value = currentUser.phoneNumber;
      console.log("User phone number is: " + currentUser.phoneNumber);
      
      var status = document.getElementById("my-form-status");
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        status.classList.add('success');
        status.innerHTML = "Thank you for your submission. I look forward to reading your message";
        form.reset()
        // We want to have different css formatting for a success or failure of our form
        
        
        
      }).catch(error => {
        status.classList.add('error');
        status.innerHTML = "Oops! There was an issue submitting your form"
        // We want to have different css formatting for a success or failure of our form
        
        
        
      });
    }
    form.addEventListener("submit", handleSubmit)



    function loadjscssfile(filename, filetype){
        if (filetype=="js"){ //if filename is a external JavaScript file
            var fileref=document.createElement('script')
            fileref.setAttribute("type","text/javascript")
            fileref.setAttribute("src", filename)
        }
        else if (filetype=="css"){ //if filename is an external CSS file
            var fileref=document.createElement("link")
            fileref.setAttribute("rel", "stylesheet")
            fileref.setAttribute("type", "text/css")
            fileref.setAttribute("href", filename)
        }
        if (typeof fileref!="undefined")
            document.getElementsByTagName("head")[0].appendChild(fileref)
    }
    

