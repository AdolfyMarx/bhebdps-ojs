const links = document.querySelectorAll(".has-tooltip");

links.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const activeTooltip = document.querySelector(".tooltip_active");

    if (activeTooltip) {
      activeTooltip.remove();
    }

    const tooltip = document.createElement("div");
    tooltip.className = "tooltip tooltip_active";
    tooltip.textContent = link.getAttribute("title");

    document.body.appendChild(tooltip);

    const linkCoords = link.getBoundingClientRect();

    tooltip.style.left = `${linkCoords.left}px`;
    tooltip.style.top = `${linkCoords.bottom}px`;
  });
});
