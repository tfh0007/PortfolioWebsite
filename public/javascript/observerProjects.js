

const project1 = document.querySelector(".Project__container1");
var project1Counter = 1;
const project2 = document.querySelector(".Project__container2");
var project2Counter = 1;
const project3 = document.querySelector(".Project__container3");
var project3Counter = 1;
const options3 = {

    //root:null, means observing based on viewport
    //threshold: 0, means how much of the content has to be in view. 1 means 100% of the item has to be on the page
    //rootMargin: Using negative means the root margin is later on the page. Have to use pixels here
    rootMarginY: "-300px"

};

const project1Observer = new IntersectionObserver(function(entries, obserever) {
entries.forEach(entry => {
    if (entry.isIntersecting && project1Counter < 2) {
        //console.log(entry),
        entry.target.classList.toggle("startAnimation");
        project1Counter ++;
        
        }
    else {
        return;
    }
    
    

});
 }, options3);

 const project2Observer = new IntersectionObserver(function(entries, obserever) {
    entries.forEach(entry => {
        if (entry.isIntersecting && project2Counter < 2) {
            //console.log(entry),
            entry.target.classList.toggle("startAnimation");
            project2Counter ++;
            }
        else {
            return;
        }
        
        
    
    });
     }, options3);

     const project3Observer = new IntersectionObserver(function(entries, obserever) {
entries.forEach(entry => {
    if (entry.isIntersecting && project3Counter < 2) {
        //console.log(entry),
        entry.target.classList.toggle("startAnimation");
        project3Counter ++;
        
        }
    else {
        return;
    }
    
    

});
 }, options3);


 project1Observer.observe(project1);
 project2Observer.observe(project2);
 project3Observer.observe(project3);
