
var bannerStatus5 = 1;
// This will be the time it takes to change images (in miliseconds)
var bannerTimer5 = 7000;


// We want to stop this function when the window is closed
//var StopScript3 = document.getElementById("closeWindowBtn__Project3")
//StopScript3.onclick = stop;

var startbannerLoop5 = setInterval(function() {
    bannerLoop5();
// This specifies how long to wait till the images cycle
}, bannerTimer5);

// We want the pictures to stop changing when our mouse hovers over the image
document.getElementById("main-banner5").onmouseenter = function() {
    clearInterval(startbannerLoop5);
}

document.getElementById("main-banner5").onmouseleave = function() {

    startbannerLoop5 = setInterval(function() {
        bannerLoop5();
    // This specifies how long to wait till the images cycle
    }, bannerTimer5);
}

// We want the previous and next image buttons to actually preform an action
document.getElementById("imgbanbtn5-prev").onclick = function() {
    if (bannerStatus5 === 1) {
        //We use banner status 2 here because that will transition to image 3. Our last image
        bannerStatus5 = 2;
       
    }
    else if (bannerStatus5 === 2) {
        bannerStatus5 = 3;

    }
        
    else if (bannerStatus5 === 3) {
        bannerStatus5 = 1;

    }
    bannerLoop5Backwords();
}

// By triggering banner loop we essentially call for the next image without the trigger delay attached
// like the delay is by default
document.getElementById("imgbanbtn5-next").onclick = function() {
    bannerLoop5();
}


// This function will move the images in the forward direction
function bannerLoop5() {
    // We need three === here otherwise nothing happens
    if(bannerStatus5 === 1) {

        document.getElementById("imgban14").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban13").style.right = "0px"
                document.getElementById("imgban13").style.zIndex = "1000"

                document.getElementById("imgban14").style.right = "-600px"
                document.getElementById("imgban14").style.zIndex = "1500"

                document.getElementById("imgban15").style.right = "600px"
                document.getElementById("imgban15").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 2 to become visible now
                document.getElementById("imgban14").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus5 = 2;

    }

    // We need three === here otherwise nothing happens
    else if(bannerStatus5 === 2) {

        document.getElementById("imgban15").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban14").style.right = "0px"
                document.getElementById("imgban14").style.zIndex = "1000"

                document.getElementById("imgban15").style.right = "-600px"
                document.getElementById("imgban15").style.zIndex = "1500"

                document.getElementById("imgban13").style.right = "600px"
                document.getElementById("imgban13").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban15").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus5 = 3;

    }
    // We need three === here otherwise nothing happens
    else if(bannerStatus5 === 3) {

        document.getElementById("imgban13").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban15").style.right = "0px"
                document.getElementById("imgban15").style.zIndex = "1000"

                document.getElementById("imgban13").style.right = "-600px"
                document.getElementById("imgban13").style.zIndex = "1500"

                document.getElementById("imgban14").style.right = "600px"
                document.getElementById("imgban14").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban13").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus5 = 1;

    }


}



// This function will move the images in the backword direction
function bannerLoop5Backwords() {
    // We need three === here otherwise nothing happens
    if(bannerStatus5 === 1) {

        document.getElementById("imgban15").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban13").style.right = "0px"
                document.getElementById("imgban13").style.zIndex = "1000"

                document.getElementById("imgban14").style.right = "-600px"
                document.getElementById("imgban14").style.zIndex = "1500"

                document.getElementById("imgban15").style.right = "600px"
                document.getElementById("imgban15").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 2 to become visible now
                document.getElementById("imgban15").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus5 = 2;

    }

    // We need three === here otherwise nothing happens
    else if(bannerStatus5 === 2) {

        document.getElementById("imgban13").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban14").style.right = "0px"
                document.getElementById("imgban14").style.zIndex = "1000"

                document.getElementById("imgban15").style.right = "-600px"
                document.getElementById("imgban15").style.zIndex = "1500"

                document.getElementById("imgban13").style.right = "600px"
                document.getElementById("imgban13").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban13").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus5 = 3;

    }
    // We need three === here otherwise nothing happens
    else if(bannerStatus5 === 3) {

        document.getElementById("imgban14").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban15").style.right = "0px"
                document.getElementById("imgban15").style.zIndex = "1000"

                document.getElementById("imgban13").style.right = "-600px"
                document.getElementById("imgban13").style.zIndex = "1500"

                document.getElementById("imgban14").style.right = "600px"
                document.getElementById("imgban14").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban14").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus5 = 1;

    }

}
