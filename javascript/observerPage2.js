//page1 will point to our .page1container which is the html class page1container
// .page1container is the area where my website first becomes visable
// We want to trigger play project videos when the videos become visible
const page2 = document.querySelector(".page2container");
var counter2 = 1;
const options2 = {

    //root:null, means observing based on viewport
    //threshold: 0, means how much of the content has to be in view. 1 means 100% of the item has to be on the page
    //rootMargin: Using negative means the root margin is later on the page. Have to use pixels here
    rootMargin: "0px",
    threshold: "0.1"

};

const page2observer = new IntersectionObserver(function(entries, obserever) {
entries.forEach(entry => {
    if (counter2 == 1 && entry.isIntersecting) {
        console.log(entry),
        entry.target.classList.toggle("startAnimation");
        counter2++;
        }
    else {
        return;
    }
    
    

});
 }, options2);

 page2observer.observe(page2);