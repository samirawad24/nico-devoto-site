// ============================================================
// Nicolas Devoto — Actor Landing Page
// ============================================================

// ---------- Header scroll state ----------
const header = document.getElementById("siteHeader");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ---------- Scroll reveal ----------
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ---------- Video cards: click to play, one at a time ----------
const videoCards = document.querySelectorAll("[data-video]");

const stopOthers = (current) => {
  videoCards.forEach((card) => {
    const video = card.querySelector("video");
    if (video !== current && !video.paused) {
      video.pause();
      video.muted = true;
      card.querySelector(".media-frame").classList.remove("playing");
    }
  });
};

videoCards.forEach((card) => {
  const frame = card.querySelector(".media-frame");
  const video = card.querySelector("video");
  const playBtn = card.querySelector(".play-btn");

  playBtn.addEventListener("click", () => {
    stopOthers(video);
    video.muted = false;
    video.controls = true;
    frame.classList.add("playing");
    video.play();
  });

  video.addEventListener("pause", () => {
    if (video.seeking) return;
    frame.classList.remove("playing");
    video.controls = false;
  });

  video.addEventListener("ended", () => {
    frame.classList.remove("playing");
    video.controls = false;
    video.currentTime = 0;
  });
});

// ---------- Gallery lightbox ----------
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector(".lightbox-caption");

document.querySelectorAll("[data-lightbox]").forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = item.querySelector("figcaption").textContent;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

const closeLightbox = () => {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox || e.target.closest(".lightbox-close")) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
});

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();
