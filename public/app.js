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
const whenSignedIn = document.getElementById('whenSignedIn');
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
const collectionRef1 = database.collection("General_Notifications");
const collectionRef2 = database.collection("User_Notifications");
let generalNotificationsData = null;
let userNotificationsData = null;


retrieveNotifications();

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

        // need some wait condition here
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

        // need some wait condition here
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


        userNotificationsData.forEach(doc => {
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
    }
    let notificationCount = generalNotificationCount + userNotificationCount;
    console.log('Total Number of Notifications Updated: ', notificationCount);
    numOfNotificationsDesktop.innerHTML = notificationCount;
    numOfNotificationsMobile.innerHTML = notificationCount;

}

function deleteNotification(deletionIndex,notificationId) {
    console.log("Need to delete Notification: " + deletionIndex + " which has Container ID value " + notificationId);
    // When we delete the button we need to remove the listner
}


async function retrieveNotifications() {

    try {
        
        generalNotificationsData = await collectionRef1.get();
        generalNotificationsLoaded = true;
        generalNotificationCount = generalNotificationsData.size;

        if(currentUser != null) {
            
            // We need to look for user specific entries here
            userNotificationsData = await collectionRef2.where('uid', '==', currentUser.uid).get();
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
        whenSignedIn.hidden = false;
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
        whenSignedIn.hidden = true;
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
        //mainPageContactFormBtn.style.display = "none"; //makes the button invisible and unusable
        //document.getElementById("lockTheContactForm").style['pointer-events'] = 'none';
        //document.getElementById("contactFormLockObj").style['display'] = 'inline'
        //document.getElementById("contactFormLockTxt").style['display'] = 'inline'
        //document.getElementById("my-form").style['opacity'] = '0.2'
        //numOfNotificationsDesktop.innerHTML = "?";
        //numOfNotificationsMobile.innerHTML = "?";


    }
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
                setTimeout(() => { userDetails.innerHTML = `<h3> ${currentUser.displayName}</h3> <p>ID: ${currentUser.uid}</p>`; }, 5000); // This implementation is static and does not update when needed
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



///// Firestore /////

const db = firebase.firestore();

const createThing = document.getElementById('createThing');
const thingsList = document.getElementById('thingsList');


let thingsRef;
let unsubscribe;

auth.onAuthStateChanged(user => {

    if (user) {

        // Database Reference
        thingsRef = db.collection('things')

        createThing.onclick = () => {

            const { serverTimestamp } = firebase.firestore.FieldValue;

            thingsRef.add({
                uid: user.uid,
                name: faker.commerce.productName(),
                createdAt: serverTimestamp()
            });
        }


        // Query
        unsubscribe = thingsRef
            .where('uid', '==', user.uid)
            .orderBy('createdAt') // Requires a query
            .onSnapshot(querySnapshot => {
                
                // Map results to an array of li elements

                const items = querySnapshot.docs.map(doc => {

                    return `<li>${doc.data().name}</li>`

                });

                thingsList.innerHTML = items.join('');

            });

    } else {
        // Unsubscribe when the user signs out
        unsubscribe && unsubscribe();
    }
});

///// Delete Data from firestore /////
const deleteThings = document.getElementById('deleteThings');

deleteThings.onclick = () => {

    let fs = firebase.firestore();
    let collectionRef = fs.collection("things");
    let user = auth.currentUser;

    collectionRef.where('uid', '==', user.uid)
    .get()
    .then(querySnapshot => {
    querySnapshot.forEach((doc) => {
        doc.ref.delete().then(() => {
        console.log("Document successfully deleted!");
        }).catch(function(error) {
            GenerateUIErrorMsg(error);
        });
    });
    })
    .catch(function(error) {
        GenerateUIErrorMsg(error);
    });

    
}

