// maps each section to its color
var colorMap = new Map();
colorMap.set('Blue', 'rgba(255,255,255,0)');
colorMap.set('About', 'red');
colorMap.set('Education', 'purple');
colorMap.set('Skills', 'orange');
colorMap.set('Projects', 'green');

// delays the static positioning of the site upon load
$(window).on('load', function() {
  $('#spinner').animate({opacity: 0}, 500, "swing");
  $('#headerContent').animate({opacity: 1}, 1000, "swing");
  setTimeout(function() {
    $('#AboutLink').animate({opacity: 1}, 500, "swing");
  }, 1600);
  setTimeout(function() {
    $('#EducationLink').animate({opacity: 1}, 500, "swing");
  }, 1700);
  setTimeout(function() {
    $('#SkillsLink').animate({opacity: 1}, 500, "swing");
  }, 1800);
  setTimeout(function() {
    $('#ProjectsLink').animate({opacity: 1}, 500, "swing");
  }, 1830);
  setTimeout(function() {
    $('#nextButton').css({animationPlayState: "running"});
    $('#body').css({position: 'static'});
  }, 1600);
});

var supportsTextClip = CSS.supports("(background-clip: text) or (-webkit-background-clip: text)");
var doesntSupportSticky = !CSS.supports("(position: sticky) or (position: -webkit-sticky)");

// handles scroll-based animations
(function () {
  var handleScroll = function () {
    var t = document.documentElement.scrollTop || document.body.scrollTop;

    if(doesntSupportSticky) {
      stickyTop(t);
    }

    bodyAppear(t);

    if(supportsTextClip) {
      colorChange(t);
    }
  };

  $(document).ready(function() {
    setTimeout(function() {
      window.addEventListener('scroll', handleScroll, false);
    }, 2040);
  });
}());

// handles sticky top for stupid browsers that don't support sticky (i.e. MICROSOFT)
function stickyTop(t) {
  if (t >= $('#headerPosition').offset().top) {
    // stick the div
    document.getElementById('header').classList.add("stick");
  } else {
    // release the div
    document.getElementById('header').classList.remove("stick");
  }
}

//handles appearance of body on scrollTopvar bodyOpacity = (t / 400);
function bodyAppear(t) {
  var bodyOpacity = (t / 400);

  if(bodyOpacity >= 1) {
    bodyOpacity = 1;
  }
  if(bodyOpacity <= 0) {
    bodyOpacity = 0;
  }

  document.getElementById('body').style.opacity = bodyOpacity;
}

// handles color change animation for browers that support it (i.e. NOT MICROSOFT)
function colorChange(t) {
  var color1;
  var color2;

  if (t < $('#About').offset().top) {
    color1 = colorMap.get('Blue');
    color2 = colorMap.get('About');
    t = t / $('#About').offset().top;
  } else if (t < $('#Education').offset().top) {
    color1 = colorMap.get('About');
    color2 = colorMap.get('Education');
    t = (t - $('#About').offset().top) / ($('#Education').offset().top - $('#About').offset().top);
  } else if (t < $('#Skills').offset().top) {
    color1 = colorMap.get('Education');
    color2 = colorMap.get('Skills');
    t = (t - $('#Education').offset().top) / ($('#Skills').offset().top - $('#Education').offset().top);
  } else {
    color1 = colorMap.get('Skills');
    color2 = colorMap.get('Projects');
    t = (t - $('#Skills').offset().top) / ($('#Projects').offset().top - $('#Skills').offset().top);
  }

  t = 100 - 200 * t;

  var background;

  if (t > 0) {
    background = "linear-gradient(" + color1 + " " + t + "%, " + color2 + ")";
  } else {
    background = "linear-gradient(" + color1 + " 0%, " + color2 + " " + (100 + t) + "%)";
  }

  document.getElementById("blue").style.backgroundImage = background + ', url("./images/intro_water.gif")';
  document.getElementById("jo").style.backgroundImage = background;
}

// handles smooth scrolling when clicking on # links
$('a[href^="#"]').on('click', function(event) {

    var target = $(this.getAttribute('href'));

    if( target.length ) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: target.offset().top,
        }, 300);
    }

});

// handles smooth scrolling when in iphone view
function next() {
  var t = window.document.body.scrollTop;
  var target;

  if (t < $('#About').offset().top - 1) {
    target = "#About";
  } else if (t < $('#Education').offset().top - 1) {
    target = "#Education";
  } else if (t < $('#Skills').offset().top - 1) {
    target = "#Skills";
  } else {
    target = "#Projects";
  }

  if( target.length ) {
      event.preventDefault();
      $('html, body').animate({
          scrollTop: $(target).offset().top,
      }, 300);
  }
}
