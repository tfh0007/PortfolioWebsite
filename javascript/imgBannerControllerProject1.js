var bannerStatus2 = 1;
// This will be the time it takes to change images (in miliseconds)
var bannerTimer2 = 5000;

var TriggerScript2 = document.getElementById("Learn__More_btn1")
TriggerScript2.onclick = function () {
    bannerLoop2();
}
// We want to stop this function when the window is closed
var StopScript2 = document.getElementById("closeWindowBtn__Project1")
StopScript2.onclick = stop;

var startbannerLoop2 = setInterval(function() {
    bannerLoop2();
// This specifies how long to wait till the images cycle
}, bannerTimer2);

// We want the pictures to stop changing when our mouse hovers over the image
document.getElementById("main-banner2").onmouseenter = function() {
    clearInterval(startbannerLoop2);
}

document.getElementById("main-banner2").onmouseleave = function() {

    startbannerLoop2 = setInterval(function() {
        bannerLoop2();
    // This specifies how long to wait till the images cycle
    }, bannerTimer2);
}

// We want the previous and next image buttons to actually preform an action
document.getElementById("imgbanbtn2-prev").onclick = function() {
    if (bannerStatus2 === 1) {
        //We use banner status 2 here because that will transition to image 3. Our last image
        bannerStatus2 = 2;
       
    }
    else if (bannerStatus2 === 2) {
        bannerStatus2 = 3;

    }
        
    else if (bannerStatus2 === 3) {
        bannerStatus2 = 1;

    }
    bannerLoop2Backwords();
}

// By triggering banner loop we essentially call for the next image without the trigger delay attached
// like the delay is by default
document.getElementById("imgbanbtn2-next").onclick = function() {
    bannerLoop2();
}


// This function will move the images in the forward direction
function bannerLoop2() {
    // We need three === here otherwise nothing happens
    if(bannerStatus2 === 1) {

        document.getElementById("imgban5").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban4").style.right = "0px"
                document.getElementById("imgban4").style.zIndex = "1000"

                document.getElementById("imgban5").style.right = "-600px"
                document.getElementById("imgban5").style.zIndex = "1500"

                document.getElementById("imgban6").style.right = "600px"
                document.getElementById("imgban6").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 2 to become visible now
                document.getElementById("imgban5").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus2 = 2;

    }

    // We need three === here otherwise nothing happens
    else if(bannerStatus2 === 2) {

        document.getElementById("imgban6").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban5").style.right = "0px"
                document.getElementById("imgban5").style.zIndex = "1000"

                document.getElementById("imgban6").style.right = "-600px"
                document.getElementById("imgban6").style.zIndex = "1500"

                document.getElementById("imgban4").style.right = "600px"
                document.getElementById("imgban4").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban6").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus2 = 3;

    }
    // We need three === here otherwise nothing happens
    else if(bannerStatus2 === 3) {

        document.getElementById("imgban4").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban6").style.right = "0px"
                document.getElementById("imgban6").style.zIndex = "1000"

                document.getElementById("imgban4").style.right = "-600px"
                document.getElementById("imgban4").style.zIndex = "1500"

                document.getElementById("imgban5").style.right = "600px"
                document.getElementById("imgban5").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban4").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus2 = 1;

    }


}



// This function will move the images in the backword direction
function bannerLoop2Backwords() {
    // We need three === here otherwise nothing happens
    if(bannerStatus2 === 1) {

        document.getElementById("imgban6").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban4").style.right = "0px"
                document.getElementById("imgban4").style.zIndex = "1000"

                document.getElementById("imgban5").style.right = "-600px"
                document.getElementById("imgban5").style.zIndex = "1500"

                document.getElementById("imgban6").style.right = "600px"
                document.getElementById("imgban6").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 2 to become visible now
                document.getElementById("imgban6").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus2 = 2;

    }

    // We need three === here otherwise nothing happens
    else if(bannerStatus2 === 2) {

        document.getElementById("imgban4").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban5").style.right = "0px"
                document.getElementById("imgban5").style.zIndex = "1000"

                document.getElementById("imgban6").style.right = "-600px"
                document.getElementById("imgban6").style.zIndex = "1500"

                document.getElementById("imgban4").style.right = "600px"
                document.getElementById("imgban4").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban4").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus2 = 3;

    }
    // We need three === here otherwise nothing happens
    else if(bannerStatus2 === 3) {

        document.getElementById("imgban5").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban6").style.right = "0px"
                document.getElementById("imgban6").style.zIndex = "1000"

                document.getElementById("imgban4").style.right = "-600px"
                document.getElementById("imgban4").style.zIndex = "1500"

                document.getElementById("imgban5").style.right = "600px"
                document.getElementById("imgban5").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban5").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus2 = 1;

    }

}
