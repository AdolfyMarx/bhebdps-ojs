const rotators = document.querySelectorAll(".rotator");

rotators.forEach((rotator) => {
  const cases = rotator.querySelectorAll(".rotator__case");

  setInterval(() => {
    const activeCase = rotator.querySelector(".rotator__case_active");
    let nextCase = activeCase.nextElementSibling;

    activeCase.classList.remove("rotator__case_active");

    if (!nextCase) {
      nextCase = cases[0];
    }

    nextCase.classList.add("rotator__case_active");
  }, 1000);
});