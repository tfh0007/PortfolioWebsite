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
editProfileBtn.onclick = function() {ActivateEditUserProfileMenu()};



async function ActivateEditUserProfileMenu() {
    console.log("Time to show the edit profile settings");
    document.getElementById('navbar-Profile__container').classList.remove("active");
    var elemDiv = document.createElement('div');
        elemDiv.id = "editProfileScreen";
        elemDiv.className = "editProfileScreen";
        elemDiv.innerHTML = (`
        <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" type="text/css" href="account-profile-bootstrap/css/style.css">
        <section class="py-5 my-5">
		<div class="editUserProfileContainer" id="editUserProfileContainer">
            <button id="editProfileCloseMenuBtn" title="Close Menu" aria-label="Close Menu"><i style="color:black;" class="far fa-times-circle"></i></button>
			<div class="bg-white shadow rounded-lg d-block d-sm-flex">
				<div class="profile-tab-nav border-right">
					<div class="p-4">
						<div class="img-circle text-center mb-3">
							<img src="images/anonymous-user-icon.jpg" alt="Image" class="shadow">
						</div>
						<h4 class="text-center" id="userDisplayNameHeading">${currentUser.displayName} </h4>
					</div>
					<div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
						<a class="nav-link active" id="account-tab" data-toggle="pill" role="tab" aria-controls="account" aria-selected="true">
							<i class="fa fa-home text-center mr-1"></i> 
							Account
						</a>
						<a class="nav-link" id="password-tab" data-toggle="pill" role="tab" aria-controls="password" aria-selected="false">
							<i class="fa fa-key text-center mr-1"></i> 
							Password
						</a>
						<a class="nav-link" id="security-tab" data-toggle="pill" role="tab" aria-controls="security" aria-selected="false">
							<i class="fa fa-user text-center mr-1"></i> 
							Security
						</a>
						<a class="nav-link" id="permissions-tab" data-toggle="pill" role="tab" aria-controls="permissions" aria-selected="false">
                            <i class="fa-solid fa-plug"></i>
							Permissions
						</a>
						<a class="nav-link" id="notification-tab" data-toggle="pill" role="tab" aria-controls="notification" aria-selected="false">
							<i class="fa fa-bell text-center mr-1"></i> 
							Notification
						</a>
					</div>
				</div>
				<div class="tab-content p-4 p-md-5" id="v-pills-tabContent">
					<div class="tab-pane fade show active" id="account" role="tabpanel" aria-labelledby="account-tab">
						<h3 class="mb-4">Account Settings</h3>
						<div class="row">
							<div class="col-md-6">
								<div class="form-group">
									  <label>First Name</label>
									  <input type="text" id="userFirstName" class="form-control" value="${currentUser.displayName.split(' ')[0]}">
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									  <label>Last Name</label>
									  <input type="text" id="userLastName" class="form-control" value="${currentUser.displayName.split(' ')[1]}">
								</div>
							</div>
							<div class="col-md-12">
								<div class="form-group">
									  <label>Email</label>
									  <input type="text" id="userEmail2" class="form-control" value="${currentUser.email}">
								</div>
							</div>
                            <div class="col-md-6">
								<div class="form-group">
									  <label>Phone number</label>
									  <input type="text" id="userPhoneNumber" class="form-control" value="${currentUser.phoneNumber}" readonly>
								</div>
							</div>
                            <div class="col-md-6">
								<div class="form-group">
									  <label>User ID</label>
									  <input type="text" class="form-control" value="${currentUser.uid}" readonly>
								</div>
							</div>
                            <div class="col-md-6">
								<div class="form-group">
									  <label>Email Verified</label>
									  <input type="text" class="form-control" value="${currentUser.emailVerified}" readonly>
								</div>
							</div>
                            <div class="col-md-6">
								<div class="form-group">
									  <label>User Anonymous</label>
									  <input type="text" class="form-control" value="${currentUser.isAnonymous}" readonly>
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									  <label>Provider </label>
									<input type="text" class="form-control" value = "${currentUser.providerId}" readonly>
								</div>
							</div>
                            <div class="col-md-6">
								<div class="form-group">
									  <label>Tenant Id </label>
									<input type="text" class="form-control" value ="${currentUser.tenantId}" readonly>
								</div>
							</div>
						</div>
						<div>
							<button class="btn btn-dark" id="UpdateAccountInfoBtn">Update</button>
							<button class="btn btn-light" id="CancelUpdateAccountInfoBtn">Cancel</button>
						</div>
					</div>
					<div class="tab-pane fade" id="password" role="tabpanel" aria-labelledby="password-tab">
						<h3 class="mb-4">Password Settings</h3>
						<div class="row">
							<div class="col-md-6">
								<div class="form-group">
									  <label>New password</label>
									  <input id="newPasswordInput" type="password" class="form-control">
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									  <label>Confirm new password</label>
									  <input id="newPasswordInput2" type="password" class="form-control">
								</div>
							</div>
						</div>
						<div>
							<button class="btn btn-dark" id="updatePasswordBtn">Update</button>
							<button class="btn btn-light" id="cancelUpdatePasswordBtn">Cancel</button>
						</div>
					</div>
					<div class="tab-pane fade" id="security" role="tabpanel" aria-labelledby="security-tab">
						<h3 class="mb-4">Security Settings</h3>
						<div class="row">
							<div class="col-md-6">
								<div class="form-group">
									  <label>Login</label>
									  <input type="text" class="form-control">
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									  <label>Two-factor auth</label>
									  <input type="text" class="form-control">
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<div class="form-check">
										<input class="form-check-input" type="checkbox" value="" id="recovery">
										<label class="form-check-label" for="recovery">
										Recovery
										</label>
									</div>
								</div>
							</div>
						</div>
						<div>
							<button class="btn btn-dark">Update</button>
							<button class="btn btn-light">Cancel</button>
						</div>
					</div>
					<div class="tab-pane fade" id="permissions" role="tabpanel" aria-labelledby="permissions-tab">
						<h3 class="mb-4">Your Server Permissions</h3>
						<div class="row">
							<div class="col-md-12">
								<div class="form-group">
									<div class="form-check">
                                        <label class="form-check-label" for="GeneralAccess"> General Access </label>
										<input class="form-control" type="text" value="None" id="GeneralAccess" readonly>
									</div>
								</div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <div class="form-check">
                                        <label class="form-check-label" for="ThingsAccess"> Things Access </label>
                                        <input class="form-control" type="text" value="read,write,delete (only for user specific items)" id="ThingsAccess" readonly>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <div class="form-check">
                                        <label class="form-check-label" for="UsersAccess"> Things Access </label>
                                        <input class="form-control" type="text" value="read,write (only for user specific items)" id="UsersAccess" readonly>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <div class="form-check">
                                        <label class="form-check-label" for="UserNotificationsAccess"> User Notifications Access </label>
                                        <input class="form-control" type="text" value="read,write,delete (only for user specific items)" id="UserNotificationsAccess" readonly>
                                    </div>
                                </div>
                            </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <div class="form-check">
                                            <label class="form-check-label" for="GeneralNotificationsAccess"> General Notifications Access </label>
                                            <input class="form-control" type="text" value="read only" id="GeneralNotificationsAccess" readonly>
                                        </div>
                                    </div>
                                </div>
						    </div>
						<div>
							<button class="btn btn-dark">Update</button>
							<button class="btn btn-light">Cancel</button>
						</div>
					</div>
					<div class="tab-pane fade" id="notification" role="tabpanel" aria-labelledby="notification-tab">
						<h3 class="mb-4">Notification Settings</h3>
						<div class="form-group">
							<div class="form-check">
								<input class="form-check-input" type="checkbox" value="" id="notification1">
								<label class="form-check-label" for="notification1">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum accusantium accusamus, neque cupiditate quis
								</label>
							</div>
						</div>
						<div class="form-group">
							<div class="form-check">
								<input class="form-check-input" type="checkbox" value="" id="notification2" >
								<label class="form-check-label" for="notification2">
									hic nesciunt repellat perferendis voluptatum totam porro eligendi.
								</label>
							</div>
						</div>
						<div class="form-group">
							<div class="form-check">
								<input class="form-check-input" type="checkbox" value="" id="notification3" >
								<label class="form-check-label" for="notification3">
									commodi fugiat molestiae tempora corporis. Sed dignissimos suscipit
								</label>
							</div>
						</div>
						<div>
							<button class="btn btn-dark">Update</button>
							<button class="btn btn-light">Cancel</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>   
        
        `)
        document.body.appendChild(elemDiv);

        /* For whatever reason the hrefs do not work as buttons here so we need to make all the buttons manually */
        document.getElementById('account-tab').onclick = () => {
            document.getElementById('account').classList.add('active');
            document.getElementById('account').classList.add('show');
            document.getElementById('account-tab').classList.add('active');

            document.getElementById('password').classList.remove('active');
            document.getElementById('password').classList.remove('show');
            document.getElementById('password-tab').classList.remove('active');

            document.getElementById('security').classList.remove('active');
            document.getElementById('security').classList.remove('show');
            document.getElementById('security-tab').classList.remove('active');

            document.getElementById('permissions').classList.remove('active');
            document.getElementById('permissions').classList.remove('show');
            document.getElementById('permissions-tab').classList.remove('active');

            document.getElementById('notification').classList.remove('active');
            document.getElementById('notification').classList.remove('show');
            document.getElementById('notification-tab').classList.remove('active');
        };

        document.getElementById('password-tab').onclick = () => {
            document.getElementById('password').classList.add('active');
            document.getElementById('password').classList.add('show');
            document.getElementById('password-tab').classList.add('active');

            document.getElementById('account').classList.remove('active');
            document.getElementById('account').classList.remove('show');
            document.getElementById('account-tab').classList.remove('active');

            document.getElementById('security').classList.remove('active');
            document.getElementById('security').classList.remove('show');
            document.getElementById('security-tab').classList.remove('active');

            document.getElementById('permissions').classList.remove('active');
            document.getElementById('permissions').classList.remove('show');
            document.getElementById('permissions-tab').classList.remove('active');

            document.getElementById('notification').classList.remove('active');
            document.getElementById('notification').classList.remove('show');
            document.getElementById('notification-tab').classList.remove('active');
        };

        document.getElementById('security-tab').onclick = () => {
            document.getElementById('security').classList.add('active');
            document.getElementById('security').classList.add('show');
            document.getElementById('security-tab').classList.add('active');

            document.getElementById('account').classList.remove('active');
            document.getElementById('account').classList.remove('show');
            document.getElementById('account-tab').classList.remove('active');

            document.getElementById('password').classList.remove('active');
            document.getElementById('password').classList.remove('show');
            document.getElementById('password-tab').classList.remove('active');

            document.getElementById('permissions').classList.remove('active');
            document.getElementById('permissions').classList.remove('show');
            document.getElementById('permissions-tab').classList.remove('active');

            document.getElementById('notification').classList.remove('active');
            document.getElementById('notification').classList.remove('show');
            document.getElementById('notification-tab').classList.remove('active');
        };

        document.getElementById('permissions-tab').onclick = () => {
            document.getElementById('permissions').classList.add('active');
            document.getElementById('permissions').classList.add('show');
            document.getElementById('permissions-tab').classList.add('active');

            document.getElementById('account').classList.remove('active');
            document.getElementById('account').classList.remove('show');
            document.getElementById('account-tab').classList.remove('active');

            document.getElementById('password').classList.remove('active');
            document.getElementById('password').classList.remove('show');
            document.getElementById('password-tab').classList.remove('active');

            document.getElementById('security').classList.remove('active');
            document.getElementById('security').classList.remove('show');
            document.getElementById('security-tab').classList.remove('active');

            document.getElementById('notification').classList.remove('active');
            document.getElementById('notification').classList.remove('show');
            document.getElementById('notification-tab').classList.remove('active');
        };


        document.getElementById('notification-tab').onclick = () => {
            document.getElementById('notification').classList.add('active');
            document.getElementById('notification').classList.add('show');
            document.getElementById('notification-tab').classList.add('active');

            document.getElementById('account').classList.remove('active');
            document.getElementById('account').classList.remove('show');
            document.getElementById('account-tab').classList.remove('active');

            document.getElementById('password').classList.remove('active');
            document.getElementById('password').classList.remove('show');
            document.getElementById('password-tab').classList.remove('active');

            document.getElementById('security').classList.remove('active');
            document.getElementById('security').classList.remove('show');
            document.getElementById('security-tab').classList.remove('active');

            document.getElementById('permissions').classList.remove('active');
            document.getElementById('permissions').classList.remove('show');
            document.getElementById('permissions-tab').classList.remove('active');
        };

        document.getElementById('editProfileCloseMenuBtn').onclick = () => {
            document.getElementById('editProfileScreen').remove();
        }

        document.getElementById('updatePasswordBtn').onclick = () => {

            
            let passwordInput1 = document.getElementById('newPasswordInput').value;
            let passwordInput2 = document.getElementById('newPasswordInput2').value;
            
            
            if(!passwordInput1.match(/^(?=.*\d)(?=.*[A-Za]).{6,}$/)) {
                const myCustomError = new Error('Password must be at least 6 characters long, contain at least one number, and contain one or more letters');
                myCustomError.code = 'auth/password pattern error';
                document.getElementById('newPasswordInput').style['border'] = "1px solid #fc0303";
                
                GenerateUIErrorMsg(myCustomError);
                return;
            }
            document.getElementById('newPasswordInput').style['border'] = "1px solid #11d131";


            if(passwordInput1 !== passwordInput2) {
                const myCustomError = new Error('Passwords are not the same. User Password could not be changed');
                myCustomError.code = 'auth/password mismatch error';
                document.getElementById('newPasswordInput2').style['border'] = "1px solid #fc0303";
                GenerateUIErrorMsg(myCustomError);
                return;
            }
            document.getElementById('newPasswordInput2').style['border'] = "1px solid #11d131";

            currentUser.updatePassword(passwordInput1)
            .then(() => {
                /* Wait a few seconds before changing the green color of the accepted text fields back to the normal gray color */
                UpdatePasswordInputBoxColor();
                
                GenerateUISuccessMsg("Password Change Confirmed","Your User Password has been update successfully.");

            })
            .catch(function(error) {
                GenerateUIErrorMsg(error);
            })
        };

        document.getElementById('cancelUpdatePasswordBtn').onclick = () => {
            let passwordInput1 = document.getElementById('newPasswordInput');
            let passwordInput2 = document.getElementById('newPasswordInput2');

            passwordInput1.value = "";
            passwordInput2.value = "";
            document.getElementById('newPasswordInput').style['border'] = "1px solid #ced4da";
            document.getElementById('newPasswordInput2').style['border'] = "1px solid #ced4da";
        };

        
        document.getElementById('UpdateAccountInfoBtn').onclick = () => {
            UpdateUserData();
        }

        document.getElementById('CancelUpdateAccountInfoBtn').onclick = () => {
            document.getElementById('userFirstName').value = currentUser.displayName.split(' ')[0];
            document.getElementById('userLastName').value = currentUser.displayName.split(' ')[1];
            document.getElementById('userEmail2').value = currentUser.email;
            document.getElementById('userPhoneNumber').value = currentUser.phoneNumber;
        }


}


async function UpdateUserData(){
    var updateMessage = "The following have been updated:";
    let profileUpdated = false;
    let emailUpdated = false;
    var newDisplayName = `${document.getElementById('userFirstName').value} ${document.getElementById('userLastName').value}`;
    if(currentUser.displayName !== newDisplayName)
      await currentUser.updateProfile({
      displayName: newDisplayName,
      

    }).then(() => {
        updateMessage += " Profile,";
        profileUpdated = true;
        userDetails.innerHTML = `<h3>...Loading...<h3>` // We need to wait for the data to update
            let userDisplayNameHeading = document.getElementById('userDisplayNameHeading');

            /* We may have deleted the account profile menu so ignore if null id value */
            if(userDisplayNameHeading != null) {
            userDisplayNameHeading.innerHTML = "Loading...";
            }
            /* We may have deleted the account profile menu so ignore if null id value */
            if(userDisplayNameHeading != null) {
                setTimeout(() => {userDisplayNameHeading.innerHTML = currentUser.displayName; },3000);
            }
        
        setTimeout(() => { userDetails.innerHTML = `<h3> ${currentUser.displayName}</h3> <p>ID: ${currentUser.uid}</p>`; }, 3000); // This implementation is static and does not update when needed
        
    }, function(error) {
        GenerateUIErrorMsg(error);
    });




    if(`${document.getElementById('userEmail2').value}` !== currentUser.email) {
        await currentUser.updateEmail(`${document.getElementById('userEmail2').value}`)
        .then(() => {
            emailUpdated = true;
            updateMessage += " Email,";
                
        },function(error) {
            GenerateUIErrorMsg(error);
        })

    }

    if(profileUpdated || emailUpdated) {
        // We need to remove the last comma
        updateMessage = updateMessage.slice(0,-1);
        GenerateUISuccessMsg("Account Updated",updateMessage);
    }
    
}


async function UpdatePasswordInputBoxColor() {

    await delay(5000);
    /* We may have deleted the container that holds this information so do nothing when that is the case */
    try {
        let passwordInput1Doc = document.getElementById('newPasswordInput');
        let passwordInput2Doc = document.getElementById('newPasswordInput2');

        passwordInput1Doc.style['border'] = "1px solid #ced4da";
        passwordInput2Doc.style['border'] = "1px solid #ced4da";
        passwordInput1Doc.value = "";
        passwordInput2Doc.value = "";
    }
    catch {

    }
}



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

function GenerateUISuccessMsg(title,message) {
    
    const DisplaySuccessMsg = document.getElementById('CreateUserSuccess');

    DisplaySuccessMsg.innerHTML = `<h2 id="successMessageHeading"> &nbsp; ${title} &nbsp;</h2> <p> ${message} </p>`;
    document.getElementById("CreateUserSuccess").style.transform = "translateY(0%)";
    setTimeout(() => {  
        document.getElementById("CreateUserSuccess").style.transform = "translateY(-150%)";
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
    

