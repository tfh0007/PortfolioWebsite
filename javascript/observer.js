//Projects will point to our .Projects which is the html class Projects
// .Projects is the area where my projects are viewable
// We want to trigger play project videos when the videos become visible
const Projects = document.querySelector(".Projects");

const options = {

    //root:null, means observing based on viewport
    //threshold: 0, means how much of the content has to be in view. 1 means 100% of the item has to be on the page
    //rootMargin: Using negative means the root margin is later on the page. Have to use pixels here
    threashold: 0.2,
    rootMargin: "-200px"

};

const Projectsobserver = new IntersectionObserver(function(entries, obserever) {
entries.forEach(entry => {
    console.log(entry),
    entry.target.classList.toggle("playVideo");

});
 }, options);

 Projectsobserver.observe(Projects);
