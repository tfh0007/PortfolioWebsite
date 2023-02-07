
var bannerStatus = 1;
// This will be the time it takes to change images (in miliseconds)
var bannerTimer = 7000;


// We want to stop this function when the window is closed
//var StopScript = document.getElementById("closeWindowBtn__Project2")
//StopScript.onclick = stop;

var startBannerLoop = setInterval(function() {
    bannerLoop();
// This specifies how long to wait till the images cycle
}, bannerTimer);

// We want the pictures to stop changing when our mouse hovers over the image
document.getElementById("main-banner").onmouseenter = function() {
    clearInterval(startBannerLoop);
}

document.getElementById("main-banner").onmouseleave = function() {

    startBannerLoop = setInterval(function() {
        bannerLoop();
    // This specifies how long to wait till the images cycle
    }, bannerTimer);
}

// We want the previous and next image buttons to actually preform an action
document.getElementById("imgbanbtn-prev").onclick = function() {
    if (bannerStatus === 1) {
        //We use banner status 2 here because that will transition to image 3. Our last image
        bannerStatus = 2;
       
    }
    else if (bannerStatus === 2) {
        bannerStatus = 3;

    }
        
    else if (bannerStatus === 3) {
        bannerStatus = 1;

    }
    bannerLoopBackwords();
}

// By triggering banner loop we essentially call for the next image without the trigger delay attached
// like the delay is by default
document.getElementById("imgbanbtn-next").onclick = function() {
    bannerLoop();
}


// This function will move the images in the forward direction
function bannerLoop() {
    // We need three === here otherwise nothing happens
    if(bannerStatus === 1) {

        document.getElementById("imgban2").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban1").style.right = "0px"
                document.getElementById("imgban1").style.zIndex = "1000"

                document.getElementById("imgban2").style.right = "-420px"
                document.getElementById("imgban2").style.zIndex = "1500"

                document.getElementById("imgban3").style.right = "420px"
                document.getElementById("imgban3").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 2 to become visible now
                document.getElementById("imgban2").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus = 2;

    }

    // We need three === here otherwise nothing happens
    else if(bannerStatus === 2) {

        document.getElementById("imgban3").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban2").style.right = "0px"
                document.getElementById("imgban2").style.zIndex = "1000"

                document.getElementById("imgban3").style.right = "-420px"
                document.getElementById("imgban3").style.zIndex = "1500"

                document.getElementById("imgban1").style.right = "420px"
                document.getElementById("imgban1").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban3").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus = 3;

    }
    // We need three === here otherwise nothing happens
    else if(bannerStatus === 3) {

        document.getElementById("imgban1").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban3").style.right = "0px"
                document.getElementById("imgban3").style.zIndex = "1000"

                document.getElementById("imgban1").style.right = "-420px"
                document.getElementById("imgban1").style.zIndex = "1500"

                document.getElementById("imgban2").style.right = "420px"
                document.getElementById("imgban2").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban1").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus = 1;

    }


}



// This function will move the images in the backword direction
function bannerLoopBackwords() {
    // We need three === here otherwise nothing happens
    if(bannerStatus === 1) {

        document.getElementById("imgban3").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban1").style.right = "0px"
                document.getElementById("imgban1").style.zIndex = "1000"

                document.getElementById("imgban2").style.right = "-420px"
                document.getElementById("imgban2").style.zIndex = "1500"

                document.getElementById("imgban3").style.right = "420px"
                document.getElementById("imgban3").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 2 to become visible now
                document.getElementById("imgban3").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus = 2;

    }

    // We need three === here otherwise nothing happens
    else if(bannerStatus === 2) {

        document.getElementById("imgban1").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban2").style.right = "0px"
                document.getElementById("imgban2").style.zIndex = "1000"

                document.getElementById("imgban3").style.right = "-420px"
                document.getElementById("imgban3").style.zIndex = "1500"

                document.getElementById("imgban1").style.right = "420px"
                document.getElementById("imgban1").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban1").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus = 3;

    }
    // We need three === here otherwise nothing happens
    else if(bannerStatus === 3) {

        document.getElementById("imgban2").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban3").style.right = "0px"
                document.getElementById("imgban3").style.zIndex = "1000"

                document.getElementById("imgban1").style.right = "-420px"
                document.getElementById("imgban1").style.zIndex = "1500"

                document.getElementById("imgban2").style.right = "420px"
                document.getElementById("imgban2").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban2").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus = 1;

    }

}
