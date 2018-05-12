var marginY = 0;
var destination = 0;
//Hvor store bidder skal den scrolle ad gangen
var speed = 20;
//var scroller = null;
// Hvor lang tid skal det tage
var duration = 1000;
var scrollTimeout = null;

function scrollTo(elementTo, top) {
	//Stop manuel scrolling!
	disableScroll()
	//Hvis den allerede scroller, stop. Nu skal den scrolle et nyt sted hen
	clearTimeout(scrollTimeout);
    //Der hvor der skal scrolles hen
    //Minus 69, det er menuens højde.
    //Hvis menuen bare skal overlappe paragraferne, kan man bare fjerne -69.
    var to = document.getElementById(elementTo).offsetTop - 69;
    if(to < 0){
        to = 0;
    }
	//Aktuelle lokation på siden
	var start = window.pageYOffset;
	//Forskel på aktuelle lokation på siden, og lokationen som skal scrolles til.
	var change = to - start;
	//Hvor langt i scroll-effekten er jeg lige nu, starter selvfølgelig på 0.
	var currentTime = 0;
	//En funktion til at animere scroll-effekten
    function animateScroll(){   
		//Itererer currentTime med speed 
		currentTime += speed;
		//Finder næste sted den skal scrolle til, og scroller derefter
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
		window.scroll(0, val);  
		//Hvis den ikke er scrollet til destinationen endnu, lav et timeout som kører animateScroll igen
        if(currentTime < duration) {
            scrollTimeout = setTimeout(animateScroll, speed);
        }else{
			//Start manuel scrolling!
			enableScroll();
		}
	}
	//Start scroll-effekten
    animateScroll();
}

//Matematisk funktion til at lave en "easing" effekt
Math.easeInOutQuad = function (t, b, c, d) {
	t /= d/2;
	  if (t < 1) return c/2*t*t + b;
	  t--;
	  return -c/2 * (t*(t-2) - 1) + b;
  };


//Alt kode herunder, indtil andet er defineret, er kode til at stoppe brugeren fra at scrolle manuelt.
//Koden er kopieret fra Stackoverflow.com
//Du/I bestemmer selv om scrolling skal stoppes mens animationen kører, jeg syntes bare det så grimt ud,
//at det hakkede sådan
// ----------------------------------------------------------------------
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
}
// ---------------------------------------------------------------
//Her stopper koden til at stoppe brugeren fra at scrolle.	

var mobilemenustate = false;
// Look for .hamburger
var hamburger = document.querySelector(".hamburger");
// On click
hamburger.addEventListener("click", function() {
  // Toggle class "is-active"
  hamburger.classList.toggle("is-active");
  document.querySelector("#mobiledropdown").classList.toggle("active");
});

//Slideshow koder

    $(document).ready(function(){
      $(".iAmTest").nerveSlider({
        sliderWidth: "100%",
        sliderHeight: "90%",
        sliderFullscreen: false,
        sliderAutoPlay: true,
        waitForLoad: false,
        slideTransition: "fade", // kan være enten "slide" eller "fade"
        slideTransitionDirection: "left",
        slideTransitionSpeed: 1000,
        slideTransitionDelay: 5000,
        showCaptions: true,
        simultaneousCaptions: false,
        showTimer: false,
        showPause: false,
        showArrows: false,
        showDots: false,
        showLoadingOverlay: false,
        sliderTheme: "light",
        slidesDraggable: true,
        allowKeyboardEvents: true,
        });
      setTimeout(function(){
        $("#overskrift").transition({opacity:1, x:20}, 1000);
        setTimeout(function(){
          $("#kortintro").transition({opacity:1, x:15}, 1000);
        },800)
      },300)

      var elements = $(".txt-rotate");
      for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
      }
      $('.sectionheader').after('<span class="sexy_line"></span>')
      $('.sectionsubheader').after('<span class="short_sexy_line"></span>')
    });



var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 150 - Math.random() * 50;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};
