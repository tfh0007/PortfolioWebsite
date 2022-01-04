
var bannerStatus12 = 1;
// This will be the time it takes to change images (in miliseconds)
var bannerTimer12 = 8000;


// We want to stop this function when the window is closed
//var StopScript3 = document.getElementById("closeWindowBtn__Project3")
//StopScript3.onclick = stop;

var startbannerLoop12 = setInterval(function() {
    bannerLoop12();
// This specifies how long to wait till the images cycle
}, bannerTimer12);

// We want the pictures to stop changing when our mouse hovers over the image
document.getElementById("main-banner12").onmouseenter = function() {
    clearInterval(startbannerLoop12);
}

document.getElementById("main-banner12").onmouseleave = function() {

    startbannerLoop12 = setInterval(function() {
        bannerLoop12();
    // This specifies how long to wait till the images cycle
    }, bannerTimer12);
}

// We want the previous and next image buttons to actually preform an action
document.getElementById("imgbanbtn12-prev").onclick = function() {
    if (bannerStatus12 === 1) {
        //We use banner status 2 here because that will transition to image 3. Our last image
        bannerStatus12 = 2;
       
    }
    else if (bannerStatus12 === 2) {
        bannerStatus12 = 3;

    }
        
    else if (bannerStatus12 === 3) {
        bannerStatus12 = 1;

    }
    bannerLoop12Backwords();
}

// By triggering banner loop we essentially call for the next image without the trigger delay attached
// like the delay is by default
document.getElementById("imgbanbtn12-next").onclick = function() {
    bannerLoop12();
}


// This function will move the images in the forward direction
function bannerLoop12() {
    // We need three === here otherwise nothing happens
    if(bannerStatus12 === 1) {

        document.getElementById("imgban33").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban32").style.right = "0px"
                document.getElementById("imgban32").style.zIndex = "1000"

                document.getElementById("imgban33").style.right = "-600px"
                document.getElementById("imgban33").style.zIndex = "1500"

                document.getElementById("imgban34").style.right = "600px"
                document.getElementById("imgban34").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 2 to become visible now
                document.getElementById("imgban33").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus12 = 2;

    }

    // We need three === here otherwise nothing happens
    else if(bannerStatus12 === 2) {

        document.getElementById("imgban34").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban33").style.right = "0px"
                document.getElementById("imgban33").style.zIndex = "1000"

                document.getElementById("imgban34").style.right = "-600px"
                document.getElementById("imgban34").style.zIndex = "1500"

                document.getElementById("imgban32").style.right = "600px"
                document.getElementById("imgban32").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban34").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus12 = 3;

    }
    // We need three === here otherwise nothing happens
    else if(bannerStatus12 === 3) {

        document.getElementById("imgban32").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban34").style.right = "0px"
                document.getElementById("imgban34").style.zIndex = "1000"

                document.getElementById("imgban32").style.right = "-600px"
                document.getElementById("imgban32").style.zIndex = "1500"

                document.getElementById("imgban33").style.right = "600px"
                document.getElementById("imgban33").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban32").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus12 = 1;

    }


}



// This function will move the images in the backword direction
function bannerLoop12Backwords() {
    // We need three === here otherwise nothing happens
    if(bannerStatus12 === 1) {

        document.getElementById("imgban34").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban32").style.right = "0px"
                document.getElementById("imgban32").style.zIndex = "1000"

                document.getElementById("imgban33").style.right = "-600px"
                document.getElementById("imgban33").style.zIndex = "1500"

                document.getElementById("imgban34").style.right = "600px"
                document.getElementById("imgban34").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 2 to become visible now
                document.getElementById("imgban34").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus12 = 2;

    }

    // We need three === here otherwise nothing happens
    else if(bannerStatus12 === 2) {

        document.getElementById("imgban32").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban33").style.right = "0px"
                document.getElementById("imgban33").style.zIndex = "1000"

                document.getElementById("imgban34").style.right = "-600px"
                document.getElementById("imgban34").style.zIndex = "1500"

                document.getElementById("imgban32").style.right = "600px"
                document.getElementById("imgban32").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban32").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus12 = 3;

    }
    // We need three === here otherwise nothing happens
    else if(bannerStatus12 === 3) {

        document.getElementById("imgban33").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban34").style.right = "0px"
                document.getElementById("imgban34").style.zIndex = "1000"

                document.getElementById("imgban32").style.right = "-600px"
                document.getElementById("imgban32").style.zIndex = "1500"

                document.getElementById("imgban33").style.right = "600px"
                document.getElementById("imgban33").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban33").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus12 = 1;

    }

}
