var bannerTimer = 6000;


function haltFunction() {
    console.log("start banner loop value: " + null);
    clearInterval(null);
    console.log("All image banners have been stopped");
}

function imgBannerController(imgBannerName,imgBannerBtnPrev,imgBannerBtnNext,img1,img2,img3) {
    //console.log("We got into the imgbanner controller code");
    var bannerStatus = 1;
    var startBannerLoop;
    // This will be the time it takes to change images (in miliseconds)
    
    

    // We want to stop this function when the window is closed
    //var StopScript = document.getElementById("closeWindowBtn__Project2")
    //StopScript.onclick = stop;

    startBannerLoop = setInterval(function() {
        bannerLoop();
    // This specifies how long to wait till the images cycle
    }, bannerTimer);

    // We want the pictures to stop changing when our mouse hovers over the image
    document.getElementById(imgBannerName).onmouseenter = function() {
        //console.log("Pausing image banner: " + imgBannerName);
        document.getElementById(imgBannerName).classList.add('focus');
        clearInterval(startBannerLoop);
    }

    document.getElementById(imgBannerName).onmouseleave = function() {
        //console.log("Resuming image banner: " + imgBannerName);
        document.getElementById(imgBannerName).classList.remove('focus');
        startBannerLoop = setInterval(function() {
            bannerLoop();
        // This specifies how long to wait till the images cycle
        }, bannerTimer);
    }

    

    // We want the previous and next image buttons to actually preform an action
    document.getElementById(imgBannerBtnPrev).onclick = function() {
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
    document.getElementById(imgBannerBtnNext).onclick = function() {
        bannerLoop();
    }


    // This function will move the images in the forward direction
    function bannerLoop() {
        // We need three === here otherwise nothing happens
        if(bannerStatus === 1) {

            document.getElementById(img2).style.opacity = "0"

            setTimeout(function() {

                    //Right now we want image 1 to be all the way to the right of our container
                    document.getElementById(img1).style.right = "0px"
                    document.getElementById(img1).style.zIndex = "1000"

                    document.getElementById(img2).style.right = "-100%"
                    document.getElementById(img2).style.zIndex = "1500"

                    document.getElementById(img3).style.right = "100%"
                    document.getElementById(img3).style.zIndex = "500"

                }, 500);

                setTimeout(function() {

                    //We want our image 2 to become visible now
                    document.getElementById(img2).style.opacity = "1"

                }, 1000);
    
            //We are changing the image so our banner status should be upadated
            bannerStatus = 2;

        }

        // We need three === here otherwise nothing happens
        else if(bannerStatus === 2) {

            document.getElementById(img3).style.opacity = "0"

            setTimeout(function() {

                    //Right now we want image 1 to be all the way to the right of our container
                    document.getElementById(img2).style.right = "0px"
                    document.getElementById(img2).style.zIndex = "1000"

                    document.getElementById(img3).style.right = "-100%"
                    document.getElementById(img3).style.zIndex = "1500"

                    document.getElementById(img1).style.right = "100%"
                    document.getElementById(img1).style.zIndex = "500"

                }, 500);

                setTimeout(function() {

                    //We want our image 3 to become visible now
                    document.getElementById(img3).style.opacity = "1"

                }, 1000);
    
            //We are changing the image so our banner status should be upadated
            bannerStatus = 3;

        }
        // We need three === here otherwise nothing happens
        else if(bannerStatus === 3) {

            document.getElementById(img1).style.opacity = "0"

            setTimeout(function() {

                    //Right now we want image 1 to be all the way to the right of our container
                    document.getElementById(img3).style.right = "0px"
                    document.getElementById(img3).style.zIndex = "1000"

                    document.getElementById(img1).style.right = "-100%"
                    document.getElementById(img1).style.zIndex = "1500"

                    document.getElementById(img2).style.right = "100%"
                    document.getElementById(img2).style.zIndex = "500"

                }, 500);

                setTimeout(function() {

                    //We want our image 3 to become visible now
                    document.getElementById(img1).style.opacity = "1"

                }, 1000);
    
            //We are changing the image so our banner status should be upadated
            bannerStatus = 1;

        }

        //console.warn("Image banner still active: " + imgBannerName);
    }



    // This function will move the images in the backword direction
    function bannerLoopBackwords() {
        // We need three === here otherwise nothing happens
        if(bannerStatus === 1) {

            document.getElementById(img3).style.opacity = "0"

            setTimeout(function() {

                    //Right now we want image 1 to be all the way to the right of our container
                    document.getElementById(img1).style.right = "0px"
                    document.getElementById(img1).style.zIndex = "1000"

                    document.getElementById(img2).style.right = "-100%"
                    document.getElementById(img2).style.zIndex = "1500"

                    document.getElementById(img3).style.right = "100%"
                    document.getElementById(img3).style.zIndex = "500"

                }, 500);

                setTimeout(function() {

                    //We want our image 2 to become visible now
                    document.getElementById(img3).style.opacity = "1"

                }, 1000);
    
            //We are changing the image so our banner status should be upadated
            bannerStatus = 2;

        }

        // We need three === here otherwise nothing happens
        else if(bannerStatus === 2) {

            document.getElementById(img1).style.opacity = "0"

            setTimeout(function() {

                    //Right now we want image 1 to be all the way to the right of our container
                    document.getElementById(img2).style.right = "0px"
                    document.getElementById(img2).style.zIndex = "1000"

                    document.getElementById(img3).style.right = "-100%"
                    document.getElementById(img3).style.zIndex = "1500"

                    document.getElementById(img1).style.right = "100%"
                    document.getElementById(img1).style.zIndex = "500"

                }, 500);

                setTimeout(function() {

                    //We want our image 3 to become visible now
                    document.getElementById(img1).style.opacity = "1"

                }, 1000);
    
            //We are changing the image so our banner status should be upadated
            bannerStatus = 3;

        }
        // We need three === here otherwise nothing happens
        else if(bannerStatus === 3) {

            document.getElementById(img2).style.opacity = "0"

            setTimeout(function() {

                    //Right now we want image 1 to be all the way to the right of our container
                    document.getElementById(img3).style.right = "0px"
                    document.getElementById(img3).style.zIndex = "1000"

                    document.getElementById(img1).style.right = "-100%"
                    document.getElementById(img1).style.zIndex = "1500"

                    document.getElementById(img2).style.right = "100%"
                    document.getElementById(img2).style.zIndex = "500"

                }, 500);

                setTimeout(function() {

                    //We want our image 3 to become visible now
                    document.getElementById(img2).style.opacity = "1"

                }, 1000);
    
            //We are changing the image so our banner status should be upadated
            bannerStatus = 1;

        }

    }
}
