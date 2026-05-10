let animationId = null;
let scrollerData = null;

function startScroll() {
  const scroller = document.querySelector(".lang-cards");
  if (!scroller || animationId !== null) return;

  // Dupliziere Karten für nahtlosen Loop
  const cards = Array.from(scroller.querySelectorAll(".language-card"));
  if (cards.length === 0) return;

  cards.forEach((card) => {
    scroller.appendChild(card.cloneNode(true));
  });

  const scrollSpeed = 1.5;
  let isScrolling = true;
  const cardWidth = cards[0].offsetWidth + 16;
  const totalOriginalWidth = cardWidth * cards.length;
  const maxScroll = totalOriginalWidth - scroller.clientWidth;

  const scroll = () => {
    if (isScrolling) {
      scroller.scrollLeft += scrollSpeed;
      // Reset wenn rechter Platz = linker Platz
      if (scroller.scrollLeft >= maxScroll) {
        scroller.scrollLeft = 0;
      }
    }
    animationId = requestAnimationFrame(scroll);
  };

  scroller.addEventListener("mouseenter", () => {
    isScrolling = false;
  });

  scroller.addEventListener("mouseleave", () => {
    isScrolling = true;
  });

  animationId = requestAnimationFrame(scroll);
  scrollerData = { scroller, totalOriginalWidth };
}

function stopScroll() {
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  if (scrollerData && scrollerData.scroller) {
    scrollerData.scroller.scrollLeft = 0;
  }
}

function handleResize() {
  if (window.innerWidth < 1500) {
    if (animationId === null) {
      startScroll();
    }
  } else {
    stopScroll();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth < 1500) {
    startScroll();
  }
  window.addEventListener("resize", handleResize);
});
