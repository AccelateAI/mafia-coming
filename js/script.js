(() => {
  const curtain = document.getElementById("curtain");
  const reel = document.getElementById("reel");
  const reelBlur = document.getElementById("reelBlur");

  const REST_INTERVAL_MS = 60000;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  reel.removeAttribute("loop");
  reelBlur.removeAttribute("loop");

  const revealStage = () => {
    curtain.classList.add("is-hidden");
    reel.play().catch(() => {});
    reelBlur.play().catch(() => {});
  };

  window.setTimeout(revealStage, reduceMotion ? 150 : 350);

  reel.addEventListener("ended", () => {
    window.setTimeout(() => {
      reel.currentTime = 0;
      reelBlur.currentTime = 0;
      reel.play().catch(() => {});
      reelBlur.play().catch(() => {});
    }, REST_INTERVAL_MS);
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
