var bannerStatus3 = 1;
// This will be the time it takes to change images (in miliseconds)
var bannerTimer3 = 7000;


// We want to stop this function when the window is closed
var StopScript3 = document.getElementById("closeWindowBtn__Project3")
StopScript3.onclick = stop;

var startbannerLoop3 = setInterval(function() {
    bannerLoop3();
// This specifies how long to wait till the images cycle
}, bannerTimer3);

// We want the pictures to stop changing when our mouse hovers over the image
document.getElementById("main-banner3").onmouseenter = function() {
    clearInterval(startbannerLoop3);
}

document.getElementById("main-banner3").onmouseleave = function() {

    startbannerLoop3 = setInterval(function() {
        bannerLoop3();
    // This specifies how long to wait till the images cycle
    }, bannerTimer3);
}

// We want the previous and next image buttons to actually preform an action
document.getElementById("imgbanbtn3-prev").onclick = function() {
    if (bannerStatus3 === 1) {
        //We use banner status 2 here because that will transition to image 3. Our last image
        bannerStatus3 = 2;
       
    }
    else if (bannerStatus3 === 2) {
        bannerStatus3 = 3;

    }
        
    else if (bannerStatus3 === 3) {
        bannerStatus3 = 1;

    }
    bannerLoop3Backwords();
}

// By triggering banner loop we essentially call for the next image without the trigger delay attached
// like the delay is by default
document.getElementById("imgbanbtn3-next").onclick = function() {
    bannerLoop3();
}


// This function will move the images in the forward direction
function bannerLoop3() {
    // We need three === here otherwise nothing happens
    if(bannerStatus3 === 1) {

        document.getElementById("imgban8").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban7").style.right = "0px"
                document.getElementById("imgban7").style.zIndex = "1000"

                document.getElementById("imgban8").style.right = "-600px"
                document.getElementById("imgban8").style.zIndex = "1500"

                document.getElementById("imgban9").style.right = "600px"
                document.getElementById("imgban9").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 2 to become visible now
                document.getElementById("imgban8").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus3 = 2;

    }

    // We need three === here otherwise nothing happens
    else if(bannerStatus3 === 2) {

        document.getElementById("imgban9").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban8").style.right = "0px"
                document.getElementById("imgban8").style.zIndex = "1000"

                document.getElementById("imgban9").style.right = "-600px"
                document.getElementById("imgban9").style.zIndex = "1500"

                document.getElementById("imgban7").style.right = "600px"
                document.getElementById("imgban7").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban9").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus3 = 3;

    }
    // We need three === here otherwise nothing happens
    else if(bannerStatus3 === 3) {

        document.getElementById("imgban7").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban9").style.right = "0px"
                document.getElementById("imgban9").style.zIndex = "1000"

                document.getElementById("imgban7").style.right = "-600px"
                document.getElementById("imgban7").style.zIndex = "1500"

                document.getElementById("imgban8").style.right = "600px"
                document.getElementById("imgban8").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban7").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus3 = 1;

    }


}



// This function will move the images in the backword direction
function bannerLoop3Backwords() {
    // We need three === here otherwise nothing happens
    if(bannerStatus3 === 1) {

        document.getElementById("imgban9").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban7").style.right = "0px"
                document.getElementById("imgban7").style.zIndex = "1000"

                document.getElementById("imgban8").style.right = "-600px"
                document.getElementById("imgban8").style.zIndex = "1500"

                document.getElementById("imgban9").style.right = "600px"
                document.getElementById("imgban9").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 2 to become visible now
                document.getElementById("imgban9").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus3 = 2;

    }

    // We need three === here otherwise nothing happens
    else if(bannerStatus3 === 2) {

        document.getElementById("imgban7").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban8").style.right = "0px"
                document.getElementById("imgban8").style.zIndex = "1000"

                document.getElementById("imgban9").style.right = "-600px"
                document.getElementById("imgban9").style.zIndex = "1500"

                document.getElementById("imgban7").style.right = "600px"
                document.getElementById("imgban7").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban7").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus3 = 3;

    }
    // We need three === here otherwise nothing happens
    else if(bannerStatus3 === 3) {

        document.getElementById("imgban8").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban9").style.right = "0px"
                document.getElementById("imgban9").style.zIndex = "1000"

                document.getElementById("imgban7").style.right = "-600px"
                document.getElementById("imgban7").style.zIndex = "1500"

                document.getElementById("imgban8").style.right = "600px"
                document.getElementById("imgban8").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban8").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus3 = 1;

    }

}
