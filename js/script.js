(() => {
  const curtain = document.getElementById("curtain");
  const reel = document.getElementById("reel");

  const REST_INTERVAL_MS = 60000;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  reel.removeAttribute("loop");

  // Picking the clip via <source media="…"> isn't reliable: Safari (desktop
  // and iOS) never honors the media attribute on <video> sources, it just
  // skips that source entirely and falls through to the next one, so mobile
  // Safari always ended up on the 16:9 clip. Selecting the src in JS works
  // the same way in every browser.
  const MOBILE_SRC = "assets/video/mafia-vogue-legacy-916.mp4";
  const DESKTOP_SRC = "assets/video/mafia-vogue-legacy-169.mp4";
  const mobileClip = window.matchMedia("(max-aspect-ratio: 16/9) and (max-width: 1024px)");
  let isMobileClip = mobileClip.matches;

  reel.src = isMobileClip ? MOBILE_SRC : DESKTOP_SRC;

  const revealStage = () => {
    curtain.classList.add("is-hidden");
    reel.play().catch(() => {});
  };

  window.setTimeout(revealStage, reduceMotion ? 150 : 350);

  reel.addEventListener("click", () => {
    reel.muted = !reel.muted;
  });

  reel.addEventListener("ended", () => {
    window.setTimeout(() => {
      reel.currentTime = 0;
      reel.play().catch(() => {});
    }, REST_INTERVAL_MS);
  });

  // A resize/rotation that crosses the mobile/desktop breakpoint (matching
  // the CSS in style.css) swaps in the other clip.
  let resizeTimer;

  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      if (mobileClip.matches !== isMobileClip) {
        isMobileClip = mobileClip.matches;
        const wasPlaying = !reel.paused;
        reel.src = isMobileClip ? MOBILE_SRC : DESKTOP_SRC;
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
