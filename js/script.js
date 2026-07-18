(() => {
  const curtain = document.getElementById("curtain");
  const reel = document.getElementById("reel");

  const REST_INTERVAL_MS = 60000;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  reel.removeAttribute("loop");

  const revealStage = () => {
    curtain.classList.add("is-hidden");
    reel.play().catch(() => {});
  };

  window.setTimeout(revealStage, reduceMotion ? 150 : 350);

  reel.addEventListener("ended", () => {
    window.setTimeout(() => {
      reel.currentTime = 0;
      reel.play().catch(() => {});
    }, REST_INTERVAL_MS);
  });

  // <source media="…"> is only re-evaluated when the video reloads, so a
  // resize/rotation that crosses the mobile/desktop breakpoint (matching
  // the CSS in style.css) needs an explicit reload to swap the 9:16/16:9 clip.
  const mobileClip = window.matchMedia("(max-aspect-ratio: 16/9) and (max-width: 1024px)");
  let isMobileClip = mobileClip.matches;
  let resizeTimer;

  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      if (mobileClip.matches !== isMobileClip) {
        isMobileClip = mobileClip.matches;
        const wasPlaying = !reel.paused;
        reel.load();
        if (wasPlaying) reel.play().catch(() => {});
      }
    }, 200);
  });

  const threadEgg = document.querySelector(".thread-egg");
  let threadRetractTimer;

  threadEgg.addEventListener("click", () => {
    threadEgg.classList.add("is-active");
    window.clearTimeout(threadRetractTimer);
    threadRetractTimer = window.setTimeout(() => {
      threadEgg.classList.remove("is-active");
    }, 2400);
  });
})();
