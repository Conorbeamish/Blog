
//Adds and removes class to id
function reveal(id){
    var toReveal = document.getElementById(id);
    toReveal.classList.remove("hidden");
    toReveal.classList.add("reveal");
}
window.onload = reveal("landing-text"),
                reveal("landing");

