document.addEventListener('DOMContentLoaded', () => {
  const scroller = document.querySelector('.lang-cards');
  if (!scroller) return;

  const scrollSpeed = 1;
  setInterval(() => {
    scroller.scrollLeft += scrollSpeed;
    if (scroller.scrollLeft >= scroller.scrollWidth - scroller.clientWidth) {
      scroller.scrollLeft = 0;
    }
  }, 20);
});
