
var bannerStatus4 = 1;
// This will be the time it takes to change images (in miliseconds)
var bannerTimer4 = 7000;


// We want to stop this function when the window is closed
//var StopScript3 = document.getElementById("closeWindowBtn__Project3")
//StopScript3.onclick = stop;

var startbannerLoop4 = setInterval(function() {
    bannerLoop4();
// This specifies how long to wait till the images cycle
}, bannerTimer4);

// We want the pictures to stop changing when our mouse hovers over the image
document.getElementById("main-banner4").onmouseenter = function() {
    clearInterval(startbannerLoop4);
}

document.getElementById("main-banner4").onmouseleave = function() {

    startbannerLoop4 = setInterval(function() {
        bannerLoop4();
    // This specifies how long to wait till the images cycle
    }, bannerTimer4);
}

// We want the previous and next image buttons to actually preform an action
document.getElementById("imgbanbtn4-prev").onclick = function() {
    if (bannerStatus4 === 1) {
        //We use banner status 2 here because that will transition to image 3. Our last image
        bannerStatus4 = 2;
       
    }
    else if (bannerStatus4 === 2) {
        bannerStatus4 = 3;

    }
        
    else if (bannerStatus4 === 3) {
        bannerStatus4 = 1;

    }
    bannerLoop4Backwords();
}

// By triggering banner loop we essentially call for the next image without the trigger delay attached
// like the delay is by default
document.getElementById("imgbanbtn4-next").onclick = function() {
    bannerLoop4();
}


// This function will move the images in the forward direction
function bannerLoop4() {
    // We need three === here otherwise nothing happens
    if(bannerStatus4 === 1) {

        document.getElementById("imgban11").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban10").style.right = "0px"
                document.getElementById("imgban10").style.zIndex = "1000"

                document.getElementById("imgban11").style.right = "-600px"
                document.getElementById("imgban11").style.zIndex = "1500"

                document.getElementById("imgban12").style.right = "600px"
                document.getElementById("imgban12").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 2 to become visible now
                document.getElementById("imgban11").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus4 = 2;

    }

    // We need three === here otherwise nothing happens
    else if(bannerStatus4 === 2) {

        document.getElementById("imgban12").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban11").style.right = "0px"
                document.getElementById("imgban11").style.zIndex = "1000"

                document.getElementById("imgban12").style.right = "-600px"
                document.getElementById("imgban12").style.zIndex = "1500"

                document.getElementById("imgban10").style.right = "600px"
                document.getElementById("imgban10").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban12").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus4 = 3;

    }
    // We need three === here otherwise nothing happens
    else if(bannerStatus4 === 3) {

        document.getElementById("imgban10").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban12").style.right = "0px"
                document.getElementById("imgban12").style.zIndex = "1000"

                document.getElementById("imgban10").style.right = "-600px"
                document.getElementById("imgban10").style.zIndex = "1500"

                document.getElementById("imgban11").style.right = "600px"
                document.getElementById("imgban11").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban10").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus4 = 1;

    }


}



// This function will move the images in the backword direction
function bannerLoop4Backwords() {
    // We need three === here otherwise nothing happens
    if(bannerStatus4 === 1) {

        document.getElementById("imgban12").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban10").style.right = "0px"
                document.getElementById("imgban10").style.zIndex = "1000"

                document.getElementById("imgban11").style.right = "-600px"
                document.getElementById("imgban11").style.zIndex = "1500"

                document.getElementById("imgban12").style.right = "600px"
                document.getElementById("imgban12").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 2 to become visible now
                document.getElementById("imgban12").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus4 = 2;

    }

    // We need three === here otherwise nothing happens
    else if(bannerStatus4 === 2) {

        document.getElementById("imgban10").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban11").style.right = "0px"
                document.getElementById("imgban11").style.zIndex = "1000"

                document.getElementById("imgban12").style.right = "-600px"
                document.getElementById("imgban12").style.zIndex = "1500"

                document.getElementById("imgban10").style.right = "600px"
                document.getElementById("imgban10").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban10").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus4 = 3;

    }
    // We need three === here otherwise nothing happens
    else if(bannerStatus4 === 3) {

        document.getElementById("imgban11").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban12").style.right = "0px"
                document.getElementById("imgban12").style.zIndex = "1000"

                document.getElementById("imgban10").style.right = "-600px"
                document.getElementById("imgban10").style.zIndex = "1500"

                document.getElementById("imgban11").style.right = "600px"
                document.getElementById("imgban11").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban11").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus4 = 1;

    }

}
