
var bannerStatus9 = 1;
// This will be the time it takes to change images (in miliseconds)
var bannerTimer9 = 10000;


// We want to stop this function when the window is closed
//var StopScript3 = document.getElementById("closeWindowBtn__Project3")
//StopScript3.onclick = stop;

var startbannerLoop9 = setInterval(function() {
    bannerLoop9();
// This specifies how long to wait till the images cycle
}, bannerTimer9);

// We want the pictures to stop changing when our mouse hovers over the image
document.getElementById("main-banner9").onmouseenter = function() {
    clearInterval(startbannerLoop9);
}

document.getElementById("main-banner9").onmouseleave = function() {

    startbannerLoop9 = setInterval(function() {
        bannerLoop9();
    // This specifies how long to wait till the images cycle
    }, bannerTimer9);
}

// We want the previous and next image buttons to actually preform an action
document.getElementById("imgbanbtn9-prev").onclick = function() {
    if (bannerStatus9 === 1) {
        //We use banner status 2 here because that will transition to image 3. Our last image
        bannerStatus9 = 2;
       
    }
    else if (bannerStatus9 === 2) {
        bannerStatus9 = 3;

    }
        
    else if (bannerStatus9 === 3) {
        bannerStatus9 = 1;

    }
    bannerLoop9Backwords();
}

// By triggering banner loop we essentially call for the next image without the trigger delay attached
// like the delay is by default
document.getElementById("imgbanbtn9-next").onclick = function() {
    bannerLoop9();
}


// This function will move the images in the forward direction
function bannerLoop9() {
    // We need three === here otherwise nothing happens
    if(bannerStatus9 === 1) {

        document.getElementById("imgban26").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban25").style.right = "0px"
                document.getElementById("imgban25").style.zIndex = "1000"

                document.getElementById("imgban26").style.right = "-600px"
                document.getElementById("imgban26").style.zIndex = "1500"

                document.getElementById("imgban27").style.right = "600px"
                document.getElementById("imgban27").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 2 to become visible now
                document.getElementById("imgban26").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus9 = 2;

    }

    // We need three === here otherwise nothing happens
    else if(bannerStatus9 === 2) {

        document.getElementById("imgban27").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban26").style.right = "0px"
                document.getElementById("imgban26").style.zIndex = "1000"

                document.getElementById("imgban27").style.right = "-600px"
                document.getElementById("imgban27").style.zIndex = "1500"

                document.getElementById("imgban25").style.right = "600px"
                document.getElementById("imgban25").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban27").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus9 = 3;

    }
    // We need three === here otherwise nothing happens
    else if(bannerStatus9 === 3) {

        document.getElementById("imgban25").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban27").style.right = "0px"
                document.getElementById("imgban27").style.zIndex = "1000"

                document.getElementById("imgban25").style.right = "-600px"
                document.getElementById("imgban25").style.zIndex = "1500"

                document.getElementById("imgban26").style.right = "600px"
                document.getElementById("imgban26").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban25").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus9 = 1;

    }


}



// This function will move the images in the backword direction
function bannerLoop9Backwords() {
    // We need three === here otherwise nothing happens
    if(bannerStatus9 === 1) {

        document.getElementById("imgban27").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban25").style.right = "0px"
                document.getElementById("imgban25").style.zIndex = "1000"

                document.getElementById("imgban26").style.right = "-600px"
                document.getElementById("imgban26").style.zIndex = "1500"

                document.getElementById("imgban27").style.right = "600px"
                document.getElementById("imgban27").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 2 to become visible now
                document.getElementById("imgban27").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus9 = 2;

    }

    // We need three === here otherwise nothing happens
    else if(bannerStatus9 === 2) {

        document.getElementById("imgban25").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban26").style.right = "0px"
                document.getElementById("imgban26").style.zIndex = "1000"

                document.getElementById("imgban27").style.right = "-600px"
                document.getElementById("imgban27").style.zIndex = "1500"

                document.getElementById("imgban25").style.right = "600px"
                document.getElementById("imgban25").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban25").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus9 = 3;

    }
    // We need three === here otherwise nothing happens
    else if(bannerStatus9 === 3) {

        document.getElementById("imgban26").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban27").style.right = "0px"
                document.getElementById("imgban27").style.zIndex = "1000"

                document.getElementById("imgban25").style.right = "-600px"
                document.getElementById("imgban25").style.zIndex = "1500"

                document.getElementById("imgban26").style.right = "600px"
                document.getElementById("imgban26").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban26").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus9 = 1;

    }

}
