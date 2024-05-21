// Sliding banner WIP
// Unexpected behaviour of scrollIntoView
// Must change for transitions/transformations

const slides = document.getElementsByClassName("slide");

let slideShown = 0;

function cycleSlides() {
  console.log("before", slideShown);
  slides[slideShown].scrollIntoView();

  slideShown++;

  if (slideShown > slides.length - 1) {
    slideShown = 0;
  }
}

// const slidesInterval = setInterval(cycleSlides, 5000);
