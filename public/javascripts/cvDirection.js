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

function getOS() {
    var userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = null;
  
    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'Windows';
    } else if (/Android/.test(userAgent)) {
      os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
      os = 'Linux';
    }
  
    return os;
  }

  if(getOS() == 'iOS' || getOS() == 'Android') {
    window.onload = function() {
        var divs = document.querySelectorAll('div');
        for(var key of divs) {
            key.classList.remove('links-on-projects', 'about-me', 'partnership');
            key.style.width = windowWidth + 'px';
            key.classList.add('div-mobile-style');
        }

        var img = document.querySelector('img');
        img.classList.remove('my-photo-small');
        img.style.width = windowWidth + 'px';
        img.style.height = windowHeight + 'px';
        img.classList.add('img-mobile-style');

        var svg = document.querySelector('svg');
        svg.remove();

    };
  }