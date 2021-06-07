
var bannerStatus8 = 1;
// This will be the time it takes to change images (in miliseconds)
var bannerTimer8 = 7000;


// We want to stop this function when the window is closed
//var StopScript3 = document.getElementById("closeWindowBtn__Project3")
//StopScript3.onclick = stop;

var startbannerLoop8 = setInterval(function() {
    bannerLoop8();
// This specifies how long to wait till the images cycle
}, bannerTimer8);

// We want the pictures to stop changing when our mouse hovers over the image
document.getElementById("main-banner8").onmouseenter = function() {
    clearInterval(startbannerLoop8);
}

document.getElementById("main-banner8").onmouseleave = function() {

    startbannerLoop8 = setInterval(function() {
        bannerLoop8();
    // This specifies how long to wait till the images cycle
    }, bannerTimer8);
}

// We want the previous and next image buttons to actually preform an action
document.getElementById("imgbanbtn8-prev").onclick = function() {
    if (bannerStatus8 === 1) {
        //We use banner status 2 here because that will transition to image 3. Our last image
        bannerStatus8 = 2;
       
    }
    else if (bannerStatus8 === 2) {
        bannerStatus8 = 3;

    }
        
    else if (bannerStatus8 === 3) {
        bannerStatus8 = 1;

    }
    bannerLoop8Backwords();
}

// By triggering banner loop we essentially call for the next image without the trigger delay attached
// like the delay is by default
document.getElementById("imgbanbtn8-next").onclick = function() {
    bannerLoop8();
}


// This function will move the images in the forward direction
function bannerLoop8() {
    // We need three === here otherwise nothing happens
    if(bannerStatus8 === 1) {

        document.getElementById("imgban23").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban22").style.right = "0px"
                document.getElementById("imgban22").style.zIndex = "1000"

                document.getElementById("imgban23").style.right = "-600px"
                document.getElementById("imgban23").style.zIndex = "1500"

                document.getElementById("imgban24").style.right = "600px"
                document.getElementById("imgban24").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 2 to become visible now
                document.getElementById("imgban23").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus8 = 2;

    }

    // We need three === here otherwise nothing happens
    else if(bannerStatus8 === 2) {

        document.getElementById("imgban24").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban23").style.right = "0px"
                document.getElementById("imgban23").style.zIndex = "1000"

                document.getElementById("imgban24").style.right = "-600px"
                document.getElementById("imgban24").style.zIndex = "1500"

                document.getElementById("imgban22").style.right = "600px"
                document.getElementById("imgban22").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban24").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus8 = 3;

    }
    // We need three === here otherwise nothing happens
    else if(bannerStatus8 === 3) {

        document.getElementById("imgban22").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban24").style.right = "0px"
                document.getElementById("imgban24").style.zIndex = "1000"

                document.getElementById("imgban22").style.right = "-600px"
                document.getElementById("imgban22").style.zIndex = "1500"

                document.getElementById("imgban23").style.right = "600px"
                document.getElementById("imgban23").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban22").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus8 = 1;

    }


}



// This function will move the images in the backword direction
function bannerLoop8Backwords() {
    // We need three === here otherwise nothing happens
    if(bannerStatus8 === 1) {

        document.getElementById("imgban24").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban22").style.right = "0px"
                document.getElementById("imgban22").style.zIndex = "1000"

                document.getElementById("imgban23").style.right = "-600px"
                document.getElementById("imgban23").style.zIndex = "1500"

                document.getElementById("imgban24").style.right = "600px"
                document.getElementById("imgban24").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 2 to become visible now
                document.getElementById("imgban24").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus8 = 2;

    }

    // We need three === here otherwise nothing happens
    else if(bannerStatus8 === 2) {

        document.getElementById("imgban22").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban23").style.right = "0px"
                document.getElementById("imgban23").style.zIndex = "1000"

                document.getElementById("imgban24").style.right = "-600px"
                document.getElementById("imgban24").style.zIndex = "1500"

                document.getElementById("imgban22").style.right = "600px"
                document.getElementById("imgban22").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban22").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus8 = 3;

    }
    // We need three === here otherwise nothing happens
    else if(bannerStatus8 === 3) {

        document.getElementById("imgban23").style.opacity = "0"

        setTimeout(function() {

                //Right now we want image 1 to be all the way to the right of our container
                document.getElementById("imgban24").style.right = "0px"
                document.getElementById("imgban24").style.zIndex = "1000"

                document.getElementById("imgban22").style.right = "-600px"
                document.getElementById("imgban22").style.zIndex = "1500"

                document.getElementById("imgban23").style.right = "600px"
                document.getElementById("imgban23").style.zIndex = "500"

            }, 500);

            setTimeout(function() {

                //We want our image 3 to become visible now
                document.getElementById("imgban23").style.opacity = "1"

            }, 1000);
 
        //We are changing the image so our banner status should be upadated
        bannerStatus8 = 1;

    }

}
