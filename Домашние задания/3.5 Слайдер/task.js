const slides = Array.from(document.querySelectorAll(".slider__item"));
const prev = document.querySelector(".slider__arrow_prev");
const next = document.querySelector(".slider__arrow_next");
const dots = Array.from(document.querySelectorAll(".slider__dot"));

let activeSlide = 0;

function showSlide(index) {
  slides[activeSlide].classList.remove("slider__item_active");

  if (dots.length > 0) {
    dots[activeSlide].classList.remove("slider__dot_active");
  }

  activeSlide = index;

  slides[activeSlide].classList.add("slider__item_active");

  if (dots.length > 0) {
    dots[activeSlide].classList.add("slider__dot_active");
  }
}

prev.addEventListener("click", () => {
  const index = activeSlide === 0 ? slides.length - 1 : activeSlide - 1;
  showSlide(index);
});

next.addEventListener("click", () => {
  const index = activeSlide === slides.length - 1 ? 0 : activeSlide + 1;
  showSlide(index);
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
  });
});
