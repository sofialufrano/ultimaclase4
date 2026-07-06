const syncResponsiveLayout = () => {
  const isMobileLayout =
    window.innerWidth < 1280 ||
    window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  document.body.classList.toggle("is-mobile-layout", isMobileLayout);
  document.body.classList.toggle("is-desktop-layout", !isMobileLayout);
};

syncResponsiveLayout();
window.addEventListener("resize", syncResponsiveLayout);
window.addEventListener("orientationchange", syncResponsiveLayout);

const animatedScreens = document.querySelectorAll(
  ".desktop-screen-1, .desktop-screen-2, .desktop-screen-3, .desktop-screen-4, .desktop-screen-5, .desktop-screen-6, .desktop-screen-7, .desktop-screen-8, .desktop-screen-9"
);

if (animatedScreens.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
    },
    {
      threshold: 0.45
    }
  );

  animatedScreens.forEach((screen) => {
    observer.observe(screen);
  });
}

const desktopSix = document.querySelector(".desktop-screen-6");

if (desktopSix) {
  const slides = desktopSix.querySelectorAll(".desktop-6-slide");
  const previousButton = desktopSix.querySelector(".desktop-6-control-prev");
  const nextButton = desktopSix.querySelector(".desktop-6-control-next");
  let currentSlide = 0;

  const showSlide = (slideIndex, direction) => {
    currentSlide = (slideIndex + slides.length) % slides.length;
    desktopSix.classList.add("desktop-6-interacted");
    desktopSix.classList.remove("desktop-6-next", "desktop-6-prev");
    desktopSix.classList.add(direction);

    slides.forEach((slide, index) => {
      slide.classList.toggle("is-active", index === currentSlide);
    });
  };

  previousButton.addEventListener("click", () => {
    showSlide(currentSlide - 1, "desktop-6-prev");
  });

  nextButton.addEventListener("click", () => {
    showSlide(currentSlide + 1, "desktop-6-next");
  });
}

const desktopNine = document.querySelector(".desktop-screen-9");

if (desktopNine) {
  const slides = desktopNine.querySelectorAll(".desktop-9-slide");
  const previousButton = desktopNine.querySelector(".desktop-9-control-prev");
  const nextButton = desktopNine.querySelector(".desktop-9-control-next");
  let currentSlide = 0;

  const showSlide = (slideIndex, direction) => {
    currentSlide = (slideIndex + slides.length) % slides.length;
    desktopNine.classList.add("desktop-9-interacted");
    desktopNine.classList.remove("desktop-9-next", "desktop-9-prev");
    desktopNine.classList.add(direction);

    slides.forEach((slide, index) => {
      slide.classList.toggle("is-active", index === currentSlide);
    });
  };

  previousButton.addEventListener("click", () => {
    showSlide(currentSlide - 1, "desktop-9-prev");
  });

  nextButton.addEventListener("click", () => {
    showSlide(currentSlide + 1, "desktop-9-next");
  });
}

const headerLinks = [
  [".header-word-inicio", ".desktop-screen-1"],
  [".header-word-nosotros", ".desktop-screen-3"],
  [".header-word-funcion", ".desktop-screen-5"],
  [".header-word-caja", ".desktop-screen-4"],
  [".header-word-app", ".desktop-screen-9"]
];

headerLinks.forEach(([buttonSelector, screenSelector]) => {
  const button = document.querySelector(buttonSelector);
  const screen = document.querySelector(screenSelector);

  if (button && screen) {
    button.addEventListener("click", () => {
      screen.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  }
});

const mobileHeader = document.querySelector(".mobile-fixed-header");
const mobileMenuButton = document.querySelector(".mobile-menu-button");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu a, .mobile-header-logo");

if (mobileHeader && mobileMenuButton) {
  mobileMenuButton.addEventListener("click", () => {
    const isOpen = mobileHeader.classList.toggle("is-open");
    mobileMenuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = targetId ? document.querySelector(targetId) : null;

    if (target) {
      event.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    if (mobileHeader && mobileMenuButton) {
      mobileHeader.classList.remove("is-open");
      mobileMenuButton.setAttribute("aria-expanded", "false");
    }
  });
});

const mobileCarouselSlides = {
  moments: [
    "mobile-page-6.svg",
    "desktoppage6-slide-2.svg",
    "desktoppage6-slide-3.svg",
    "desktoppage6-slide-4.svg"
  ],
  app: [
    "mobile-page-9.svg",
    "desktoppage9-slide-2.svg",
    "desktoppage9-slide-3.svg"
  ]
};

document.querySelectorAll("[data-mobile-carousel]").forEach((carousel) => {
  const carouselName = carousel.dataset.mobileCarousel;
  const slides = mobileCarouselSlides[carouselName] || [];
  const image = carousel.querySelector(".mobile-carousel-image");
  const previousButton = carousel.querySelector(".mobile-carousel-prev");
  const nextButton = carousel.querySelector(".mobile-carousel-next");
  let currentSlide = 0;

  if (!image || slides.length === 0) {
    return;
  }

  const showMobileSlide = (slideIndex, direction) => {
    currentSlide = (slideIndex + slides.length) % slides.length;
    image.classList.add(direction === "next" ? "is-sliding-next" : "is-sliding-prev");

    window.setTimeout(() => {
      image.src = slides[currentSlide];
      image.classList.toggle("mobile-page-full-slide", currentSlide !== 0);
      image.classList.remove("is-sliding-next", "is-sliding-prev");
    }, 170);
  };

  if (previousButton) {
    previousButton.addEventListener("click", () => {
      showMobileSlide(currentSlide - 1, "prev");
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      showMobileSlide(currentSlide + 1, "next");
    });
  }
});
