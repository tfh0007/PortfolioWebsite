//THIS DOES NOT WORK. TRY AGAIN LATER
const header = document.querySelector("header");
const firstPage = document.querySelector(".main__container");

const firstPageOptions = {};
const firstPageObserver = new IntersectionObserver(function(entries, firstPageOptions) {
entries.forEach(entry => {
    //console.log(entry.target);
    if(!entry.isIntersecting) {
        header.classList.add(".navbar-scrolled");  

    } else {
        header.classList.remove(".navbar-scrolled");
    }

})
}, firstPageOptions);

firstPageObserver.observe(firstPage);
