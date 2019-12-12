$(document).ready(function () {
  
//Carousel
  
    $('.js-carousel').slick(carouselsettings);
    scrollMenu() ;
    priorityMenu();

    //Form validation
    $('#form').parsley(

    );  
});

const carouselsettings = {
    dots: true,
    adaptiveHeight: false,
    arrows: true,
    autoplay: false,
    autoplaySpeed: 5000,
    responsive: [{
      breakpoint: 768,
      settings: {
        adaptiveHeight: false,
        arrows: false
      }
    }]
  };



//change menu appearance on scroll
function scrollMenu() {
    // Change header appearance on scroll
    var $header = $('.header');
  
    $(window).scroll(function () {
  
        if(scrollY <= 0){
            $header.removeClass('header--scrolled');
        }
        if(scrollY > 50){
            $header.addClass('header--scrolled');
        }
    });
};

//Priority navigation menu https://codepen.io/lukejacksonn/pen/BowbWE

function priorityMenu() {
    var $nav = $('.js-prioritynav');
    var $btn = $('.js-prioritynav button');
    var $vlinks = $('.js-prioritynav .menu--main');
    var $hlinks = $('.js-prioritynav .menu--hidden');

    var numOfItems = 0;
    var totalSpace = 0;
    var breakWidths = [];

    // Get initial state
    $vlinks.children().outerWidth(function(i, w) {
        totalSpace += w;
        numOfItems += 1;
        breakWidths.push(totalSpace);
    });

    var availableSpace, numOfVisibleItems, requiredSpace;

    function check() {

        // Get instant state
        availableSpace = $vlinks.width() - 10;
        numOfVisibleItems = $vlinks.children().length;
        requiredSpace = breakWidths[numOfVisibleItems - 1];

        // There is not enought space
        if (requiredSpace > availableSpace) {
            $vlinks.children().last().prependTo($hlinks);
            numOfVisibleItems -= 1;
            check();
        // There is more than enough space
        } else if (availableSpace > breakWidths[numOfVisibleItems]) {
            $hlinks.children().first().appendTo($vlinks);
            numOfVisibleItems += 1;
        }
        // Update the button accordingly
        $btn.attr("count", numOfItems - numOfVisibleItems);
        if (numOfVisibleItems === numOfItems) {
            $btn.addClass('hidden');
        } else $btn.removeClass('hidden');
    }

    // Window listeners
    $(window).resize(function() {
        check();
    });

    $btn.on('click', function() {
        $hlinks.toggleClass('hidden');
    });

    check();
};


// Use responsive images as background images https://aclaes.com/responsive-background-images-with-srcset-and-sizes/
class ResponsiveBackgroundImage {

    constructor(element) {
        this.element = element;
        this.img = element.querySelector('img');
        this.src = '';

        this.img.addEventListener('load', () => {
            this.update();
        });

        if (this.img.complete) {
            this.update();
        }
    }

    update() {
        let src = typeof this.img.currentSrc !== 'undefined' ? this.img.currentSrc : this.img.src;
        if (this.src !== src) {
            this.src = src;
        this.element.style.backgroundImage = 'url("' + this.src + '")';

        }
    }
};

let elements = document.querySelectorAll('[data-responsive-background-image]');
for (let i = 0; i < elements.length; i++) {
    new ResponsiveBackgroundImage(elements[i]);
};