const getAllProjectRows = document.querySelectorAll(".projectRow");
const projectImage = document.querySelector(".projectImage");
const projectList = document.querySelector(".projectList");
const cardsContainer = document.querySelector(".hero");
gsap.registerPlugin(ScrollTrigger, SplitText, TextPlugin, ScrollSmoother);

const smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1.2, // adjust feel — higher = more lag/smoothness
  effects: true, // enables data-speed / data-lag attributes
  normalizeScroll: true, // prevents address-bar jump on mobile
});

document.fonts.ready.then(() => {
  let split = SplitText.create(".heroText", {
    type: "words,chars,lines",
    linesClass: "chars",
  });
  gsap.from(split.chars, {
    y: "60",
    opacity: 0,
    duration: 1,
    stagger: 0.15,
  });
});

const words = ["Desiger", "Developer"];
let index = 0;

const swapWord = () => {
  const el = ".changing .word";

  gsap.to(el, {
    yPercent: -120,
    opacity: 0,
    duration: 1,
    ease: "power2.in",
    onComplete: () => {
      index = (index + 1) % words.length;
      document.querySelector(".word").textContent = words[index];

      gsap.fromTo(
        el,
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          onComplete: () => {
            gsap.delayedCall(2, swapWord); // pause, then repeat
          },
        },
      );
    },
  });
};

document.fonts.ready.then(() => {
  const words = gsap.utils.toArray(".quoteWord");
  gsap.to(words, {
    color: "#0e0e0e",
    stagger: 1,
    duration: 1,
    scrollTrigger: {
      trigger: ".quote",
      start: "top 20%",
      end: "20% 10%",
      scrub: 1,
      // markers: true,
    },
  });
});
//Hero Card Animation
const heroCards = () => {
  const cards = gsap.utils.toArray(".card");
  console.log(cards);
  gsap.set(cards, {
    scale: 0.15,
    opacity: 1,
    rotate: 0,
    filter: "blur(12px)",
  });

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  cards.forEach((card, i) => {
    tl.to(
      card,
      {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 2,
      },
      i * 0.5,
    ).to(
      card,
      {
        rotate: -10,
        duration: 0.6,
        ease: "back.out(1.7)",
      },
      i * 0.5 + 0.6,
    );
  });

  // Fan Spread
  const spread = [
    { x: 120, y: 0, rotate: 30 },
    { x: 80, y: 0, rotate: 20 },
    { x: 40, y: 0, rotate: 10 },
    { x: 0, y: 0, rotate: 0 },
  ];
  cardsContainer.addEventListener("mouseenter", () => {
    cards.forEach((card, i) => {
      gsap.to(card, {
        x: spread[i].x,
        y: spread[i].y,
        rotate: spread[i].rotate,
        duration: 0.5,
        ease: "power3.out",
      });
    });
  });

  cardsContainer.addEventListener("mouseleave", () => {
    cards.forEach((card) => {
      gsap.to(card, {
        x: 0,
        y: 0,
        rotate: -10,
        duration: 0.5,
        ease: "power3.inOut",
      });
    });
  });
};

// Featured Projects
const featuredProjects = () => {
  projectList.addEventListener("mouseenter", () => {
    projectImage.style.display = "block";
  });

  projectList.addEventListener("mouseleave", () => {
    projectImage.style.display = "none";
  });

  getAllProjectRows.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      let dataImageParam = item.getAttribute("data-image");
      projectImage.style.backgroundImage = `url(${dataImageParam})`;
      console.log(dataImageParam);
    });
  });
};

// Moving Marquee
const marqueeFunction = () => {
  gsap.to(".marqueeContainer", {
    xPercent: -30,
    duration: 20,
    scrollTrigger: {
      trigger: ".quote",
      start: "30% 0%",
      end: "bottom 0",
      scrub: 1,
      // markers: true,
    },
  });
};

const scaleImage = () => {
  gsap.from("#aboutImg", {
    scale: 0,
    duration: 1,
    scrollTrigger: {
      trigger: ".about",
      scrub: 1,
      // markers: true,
    },
  });
};
gsap.to(".flipChar", {
  rotateZ: 360, // flips it upside down
  duration: 1,
  ease: "power3.inOut",
  repeat: -1,
  repeatDelay: 5,
  yoyo: true,
});

const interactions = () => {
  const star = document.querySelector("#star");

  star.addEventListener("mouseenter", () => {
    gsap.to(star, {
      rotation: 90,
      duration: 0.5,
      ease: "power2.out",
    });
  });

  star.addEventListener("mouseleave", () => {
    gsap.to(star, {
      rotation: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  });
};

const split = SplitText.create(".tagline", { type: "chars" });

gsap.from(split.chars, {
  yPercent: -500,
  stagger: {
    each: 0.05,
    from: "start",
  },
  duration: 1,
  ease: "power4.out",
  repeat: -1,
  yoyo: true,
  repeatDelay: 5,
});
const dateEle = document.querySelector(".date");
const currentDate = new Date().toLocaleDateString("en-GB");
console.log(currentDate);
dateEle.append(`${currentDate}`);

const circle = document.querySelector("#circle");

gsap.from("#circle", {
  yPercent: -150,
  xPercent: -120,
  scrollTrigger: {
    trigeer: ".quote",
    start: "top 50%",
    pin: true,
    scrub: 2,
    // markers: true,
  },
});

const toggleMenu = () => {
  const mobileNav = document.querySelector(".mobileNav");
  const body = document.querySelector("body");
  mobileNav.classList.toggle("translateY");
  body.classList.toggle("hiddenBody");
};

//Calls
heroCards();
scaleImage();
swapWord();
featuredProjects();
marqueeFunction();
interactions();
