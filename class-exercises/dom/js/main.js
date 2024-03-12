
console.log("hello hello");

let pageTitle = document.querySelector("#page-title");

// JS timout changes h1 title after 3 seconds
setTimeout(function(){
    pageTitle.style.color = "pink";
    //console.log("timeout worked!");
}   , 3000)

//click event on header changes background color
document.querySelector("header").onclick = function() {
    //console.log("clicked header");
    document.querySelector("body").style.backgroundColor = "grey";
}