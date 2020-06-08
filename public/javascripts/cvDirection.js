function listener() {
    if(myPhoto.classList.contains('my-photo-small')) {
        myPhoto.classList.remove('my-photo-small');
        myPhoto.classList.add('my-photo-big');
        triangle.classList.remove('triangle-animate1');
        triangle.classList.add('triangle-animate');
    } else if(myPhoto.classList.contains('my-photo-big')) {
        myPhoto.classList.remove('my-photo-big');
        myPhoto.classList.add('my-photo-small');
        triangle.classList.remove('triangle-animate');
        triangle.classList.add('triangle-animate1');
    }
    
}

var listener1 = function(e) {
    if(e.target.tagName == 'IMG' || e.target.tagName == 'polygon') {
        listener();
    }
}

document.addEventListener('click', listener1);

var windowHeight = document.documentElement.clientHeight;
var windowWidth = document.documentElement.clientWidth;
window.onload = function() {
    var divs = document.querySelectorAll('div');
    for(var key of divs) {
        key.style.left = windowWidth / 2 - key.clientWidth / 2 + 'px';
    }
};