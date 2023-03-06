var multipleCardCarousel = document.getElementById("MultiCarousel");
const inner = document.querySelector('#MultiCarousel-inner');
let slideIndex = 1;

if(window.matchMedia("(max-width: 575.98px)").matches){
    var carousel = new bootstrap.Carousel(multipleCardCarousel, {
        interval: 2000,
    });
    multipleCardCarousel.classList.add("slide");
}
else{
        var carousel = new bootstrap.Carousel(multipleCardCarousel, {
            interval: false,
        });
        var carouselWidth = document.getElementById("MultiCarousel-inner").scrollWidth;
        var cardWidth = document.querySelector('.carousel-item').clientWidth;
        var scrollPosition = 0;

        document.getElementById("multi-next-arrow").onclick = function () {
            setTimeout(inner.scrollLeft += cardWidth,600);
        };
        document.getElementById("multi-prev-arrow").onclick = function() {
            setTimeout(inner.scrollLeft -= cardWidth,600);
        };
}
