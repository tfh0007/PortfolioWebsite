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




const provider = new firebase.auth.GoogleAuthProvider();
// Settings for FacebookAuthprovider can be found at https://developers.facebook.com/apps/
// Name of project is Sign In for Thomas Portfolio
const provider2 = new firebase.auth.FacebookAuthProvider()


/// Sign in event handlers

signInGoogleBtn.onclick = () => auth.signInWithPopup(provider);
signInMetaBtn.onclick = () => auth.signInWithPopup(provider2);

signOutBtn.onclick = () => auth.signOut();

auth.onAuthStateChanged(user => {
    if (user) {
        // signed in
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;
        navbarLoginBtn.hidden = true;
        navbarSignUpBtn.hidden = true;
        signOutBtn.hidden = false;
        editProfileBtn.hidden = false;
        settingsBtn.hidden = false;

        if (!user.displayName) {
            
            userDetails.innerHTML = `<h3>...Loading...<h3>` // We need to wait for the data to update
            setTimeout(() => { userDetails.innerHTML = `<h3> ${user.displayName}</h3> <p>ID: ${user.uid}</p>`; }, 5000); // This implementation is static and does not update when needed
        }

        else {
            userDetails.innerHTML = `<h3> ${user.displayName}</h3> <p> ID: ${user.uid}</p>`;
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
        navbarLoginBtn.hidden = false;
        navbarSignUpBtn.hidden = false;
        signOutBtn.hidden = true;
        editProfileBtn.hidden = true;
        settingsBtn.hidden = true;
        //mainPageContactFormBtn.style.display = "none"; //makes the button invisible and unusable
        //document.getElementById("lockTheContactForm").style['pointer-events'] = 'none';
        //document.getElementById("contactFormLockObj").style['display'] = 'inline'
        //document.getElementById("contactFormLockTxt").style['display'] = 'inline'
        //document.getElementById("my-form").style['opacity'] = '0.2'
        //numOfNotificationsDesktop.innerHTML = "?";
        //numOfNotificationsMobile.innerHTML = "?";


    }
});



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

