document.addEventListener("DOMContentLoaded", () => {
  const slider = new Splide("#main-slider", {
    type: "loop",
    autoplay: true,
    interval: 5000,
    pauseOnHover: true,
    arrows: true,
    pagination: true,
  });
  slider.mount();
});