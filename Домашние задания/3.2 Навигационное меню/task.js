const menuLinks = document.querySelectorAll(".menu__link");

Array.from(menuLinks).forEach((link) => {
  link.onclick = function () {
    const menuItem = link.closest(".menu__item");
    const subMenu = menuItem.querySelector(".menu_sub");

    if (subMenu) {
      subMenu.classList.toggle("menu_active");
      return false;
    }

    return true;
  };
});