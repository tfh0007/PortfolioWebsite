
var bannerStatus6 = 1;
// This will be the time it takes to change images (in miliseconds)
var bannerTimer6 = 7000;


// We want to stop this function when the window is closed
//var StopScript3 = document.getElementById("closeWindowBtn__Project3")
//StopScript3.onclick = stop;

var startbannerLoop6 = setInterval(function() {
    bannerLoop6();
// This specifies how long to wait till the images cycle
}, bannerTimer6);

// We want the pictures to stop changing when our mouse hovers over the image
document.getElementById("main-banner6").onmouseenter = function() {
    clearInterval(startbannerLoop6);
}

document.getElementById("main-banner6").onmouseleave = function() {

    startbannerLoop6 = setInterval(function() {
        bannerLoop6();
    // This specifies how long to wait till the images cycle
    }, bannerTimer6);
}

// We want the previous and next image buttons to actually preform an action
document.getElementById("imgbanbtn6-prev").onclick = function() {
    if (bannerStatus6 === 1) {
        //We use banner status 2 here because that will transition to image 3. Our last image
        bannerStatus6 = 2;
       
    }
    else if (bannerStatus6 === 2) {
        bannerStatus6 = 3;

    }
        
    else if (bannerStatus6 === 3) {
        bannerStatus6 = 1;

    }
    bannerLoop6Backwords();
}

// By triggering banner loop we essentially call for the next image without the trigger delay attached
// like the delay is by default
document.getElementById("imgbanbtn6-next").onclick = function() {
    bannerLoop6();
}


// This function will move the images in the forward direction
function bannerLoop6() {
    // We need three === here otherwise nothing happens
    if(bannerStatus6 === 1) {

        document.getElementById("imgban17").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban16").style.right = "0px"
                document.getElementById("imgban16").style.zIndex = "1000"

                document.getElementById("imgban17").style.right = "-600px"
                document.getElementById("imgban17").style.zIndex = "1500"

                document.getElementById("imgban18").style.right = "600px"
                document.getElementById("imgban18").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 2 to become visible now
                document.getElementById("imgban17").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus6 = 2;

    }

    // We need three === here otherwise nothing happens
    else if(bannerStatus6 === 2) {

        document.getElementById("imgban18").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban17").style.right = "0px"
                document.getElementById("imgban17").style.zIndex = "1000"

                document.getElementById("imgban18").style.right = "-600px"
                document.getElementById("imgban18").style.zIndex = "1500"

                document.getElementById("imgban16").style.right = "600px"
                document.getElementById("imgban16").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban18").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus6 = 3;

    }
    // We need three === here otherwise nothing happens
    else if(bannerStatus6 === 3) {

        document.getElementById("imgban16").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban18").style.right = "0px"
                document.getElementById("imgban18").style.zIndex = "1000"

                document.getElementById("imgban16").style.right = "-600px"
                document.getElementById("imgban16").style.zIndex = "1500"

                document.getElementById("imgban17").style.right = "600px"
                document.getElementById("imgban17").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban16").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus6 = 1;

    }


}



// This function will move the images in the backword direction
function bannerLoop6Backwords() {
    // We need three === here otherwise nothing happens
    if(bannerStatus6 === 1) {

        document.getElementById("imgban18").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban16").style.right = "0px"
                document.getElementById("imgban16").style.zIndex = "1000"

                document.getElementById("imgban17").style.right = "-600px"
                document.getElementById("imgban17").style.zIndex = "1500"

                document.getElementById("imgban18").style.right = "600px"
                document.getElementById("imgban18").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 2 to become visible now
                document.getElementById("imgban18").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus6 = 2;

    }

    // We need three === here otherwise nothing happens
    else if(bannerStatus6 === 2) {

        document.getElementById("imgban16").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban17").style.right = "0px"
                document.getElementById("imgban17").style.zIndex = "1000"

                document.getElementById("imgban18").style.right = "-600px"
                document.getElementById("imgban18").style.zIndex = "1500"

                document.getElementById("imgban16").style.right = "600px"
                document.getElementById("imgban16").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban16").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus6 = 3;

    }
    // We need three === here otherwise nothing happens
    else if(bannerStatus6 === 3) {

        document.getElementById("imgban17").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban18").style.right = "0px"
                document.getElementById("imgban18").style.zIndex = "1000"

                document.getElementById("imgban16").style.right = "-600px"
                document.getElementById("imgban16").style.zIndex = "1500"

                document.getElementById("imgban17").style.right = "600px"
                document.getElementById("imgban17").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban17").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus6 = 1;

    }

}
