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