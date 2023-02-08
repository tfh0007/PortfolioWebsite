let isProfileLoaded = false;
var currentUser = null;
let generalNotificationCount = 0;
let userNotificationCount = 0;

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
const notificationPageText = document.getElementById("notificationPageText");

/*
try {
    const booksRef = firebase.firestore().collection("Global_Notifications");
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
console.log("Error getting Global Notification data: ", error);
};

*/
retrieveNotifications();


async function retrieveNotifications() {

    try {
        const database = firebase.firestore();
        const collectionRef1 = database.collection("Global_Notifications");
        console.log(collectionRef1);
        const data = await collectionRef1.get();
        console.log(data);
        generalNotificationCount = data.size;


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

            data.forEach(doc => {
                notificationPageText.innerHTML += (`
                <div class = "notification__heading__msg">
                <h1> ${doc.data().Heading} </h1> 
                <p> ${doc.data().Body} </p> 
                </div>
                `);
          });
        }


        if(currentUser != null) {
            const collectionRef2 = database.collection("User_Notifications");
            // We need to look for user specific entries here
            const data = await collectionRef2.where('uid', '==', currentUser.uid).get();
            userNotificationCount = data.size;

            // Now we ned to look through the data and append the notifications to the html
        if(notificationTypeToLoad == 2) {
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

            data.forEach(doc => {
                notificationPageText.innerHTML += (`
                    <div class = "notification__heading__msg">
                    <h1> ${doc.data().Heading} </h1> 
                    <p> ${doc.data().Body} </p> 
                    </div>
                `);
          });
        }
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
    }
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
        if(userNotificationCount == 0) {
            retrieveNotifications();
            let notificationCount = generalNotificationCount + userNotificationCount;
            console.log('Total Number of Notifications Updated To: ', notificationCount);
            numOfNotificationsDesktop.innerHTML = notificationCount;
            numOfNotificationsMobile.innerHTML = notificationCount;
        }
        
        //mainPageContactFormBtn.style.display = "inline"; //makes the buttom visible and usable as an inline style
        //document.getElementById("lockTheContactForm").style['pointer-events'] = 'all';
        //document.getElementById("contactFormLockObj").style['display'] = 'none'
        //document.getElementById("contactFormLockTxt").style['display'] = 'none'
        //document.getElementById("my-form").style['opacity'] = '1'

        //numOfNotificationsDesktop.innerHTML = "?";
        //numOfNotificationsMobile.innerHTML = "?";
        
        
    } else {
        // not signed in
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
        userDetails.innerHTML = `<h3> Guest <h3> <p> ID: Unregistered </p>`;
        numOfNotificationsDesktop.innerHTML = "?";
        numOfNotificationsMobile.innerHTML = "?";
        navbarLoginBtn.hidden = false;
        navbarSignUpBtn.hidden = false;
        signOutBtn.hidden = true;
        editProfileBtn.hidden = true;
        settingsBtn.hidden = true;
        isProfileLoaded = false;
        notificationTypeUserBtn.hidden = true;
        notificatonTypeGeneralBtn.hidden = true;
        notificationTypeToLoad = 1; // When user logged out default notification type to general
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
        console.log("Notification Type set to General");
        // More work needed to display notifications from server








    }
    else if (type == 2) {
        notificationTypeUserBtn.classList.add("focus");
        console.log("Notification Type set to User Specific");
        // More work needed to display notifications from server





    }
    retrieveNotifications();
    console.log("");

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
        console.error("Error removing document: ", error);
        });
    });
    })
    .catch(function(error) {
    console.log("Error getting documents: ", error);
    });

    
}

