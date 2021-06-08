
var bannerStatus7 = 1;
// This will be the time it takes to change images (in miliseconds)
var bannerTimer7 = 12000;


// We want to stop this function when the window is closed
//var StopScript3 = document.getElementById("closeWindowBtn__Project3")
//StopScript3.onclick = stop;

var startbannerLoop7 = setInterval(function() {
    bannerLoop7();
// This specifies how long to wait till the images cycle
}, bannerTimer7);

// We want the pictures to stop changing when our mouse hovers over the image
document.getElementById("main-banner7").onmouseenter = function() {
    clearInterval(startbannerLoop7);
}

document.getElementById("main-banner7").onmouseleave = function() {

    startbannerLoop7 = setInterval(function() {
        bannerLoop7();
    // This specifies how long to wait till the images cycle
    }, bannerTimer7);
}

// We want the previous and next image buttons to actually preform an action
document.getElementById("imgbanbtn7-prev").onclick = function() {
    if (bannerStatus7 === 1) {
        //We use banner status 2 here because that will transition to image 3. Our last image
        bannerStatus7 = 2;
       
    }
    else if (bannerStatus7 === 2) {
        bannerStatus7 = 3;

    }
        
    else if (bannerStatus7 === 3) {
        bannerStatus7 = 1;

    }
    bannerLoop7Backwords();
}

// By triggering banner loop we essentially call for the next image without the trigger delay attached
// like the delay is by default
document.getElementById("imgbanbtn7-next").onclick = function() {
    bannerLoop7();
}


// This function will move the images in the forward direction
function bannerLoop7() {
    // We need three === here otherwise nothing happens
    if(bannerStatus7 === 1) {

        document.getElementById("imgban20").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban19").style.right = "0px"
                document.getElementById("imgban19").style.zIndex = "1000"

                document.getElementById("imgban20").style.right = "-600px"
                document.getElementById("imgban20").style.zIndex = "1500"

                document.getElementById("imgban21").style.right = "600px"
                document.getElementById("imgban21").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 2 to become visible now
                document.getElementById("imgban20").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus7 = 2;

    }

    // We need three === here otherwise nothing happens
    else if(bannerStatus7 === 2) {

        document.getElementById("imgban21").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban20").style.right = "0px"
                document.getElementById("imgban20").style.zIndex = "1000"

                document.getElementById("imgban21").style.right = "-600px"
                document.getElementById("imgban21").style.zIndex = "1500"

                document.getElementById("imgban19").style.right = "600px"
                document.getElementById("imgban19").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban21").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus7 = 3;

    }
    // We need three === here otherwise nothing happens
    else if(bannerStatus7 === 3) {

        document.getElementById("imgban19").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban21").style.right = "0px"
                document.getElementById("imgban21").style.zIndex = "1000"

                document.getElementById("imgban19").style.right = "-600px"
                document.getElementById("imgban19").style.zIndex = "1500"

                document.getElementById("imgban20").style.right = "600px"
                document.getElementById("imgban20").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban19").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus7 = 1;

    }


}



// This function will move the images in the backword direction
function bannerLoop7Backwords() {
    // We need three === here otherwise nothing happens
    if(bannerStatus7 === 1) {

        document.getElementById("imgban21").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban19").style.right = "0px"
                document.getElementById("imgban19").style.zIndex = "1000"

                document.getElementById("imgban20").style.right = "-600px"
                document.getElementById("imgban20").style.zIndex = "1500"

                document.getElementById("imgban21").style.right = "600px"
                document.getElementById("imgban21").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 2 to become visible now
                document.getElementById("imgban21").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus7 = 2;

    }

    // We need three === here otherwise nothing happens
    else if(bannerStatus7 === 2) {

        document.getElementById("imgban19").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban20").style.right = "0px"
                document.getElementById("imgban20").style.zIndex = "1000"

                document.getElementById("imgban21").style.right = "-600px"
                document.getElementById("imgban21").style.zIndex = "1500"

                document.getElementById("imgban19").style.right = "600px"
                document.getElementById("imgban19").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban19").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus7 = 3;

    }
    // We need three === here otherwise nothing happens
    else if(bannerStatus7 === 3) {

        document.getElementById("imgban20").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban21").style.right = "0px"
                document.getElementById("imgban21").style.zIndex = "1000"

                document.getElementById("imgban19").style.right = "-600px"
                document.getElementById("imgban19").style.zIndex = "1500"

                document.getElementById("imgban20").style.right = "600px"
                document.getElementById("imgban20").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban20").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus7 = 1;

    }

}
