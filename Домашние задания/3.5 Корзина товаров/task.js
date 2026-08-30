const products = document.querySelectorAll(".product");
const cartProducts = document.querySelector(".cart__products");

products.forEach((product) => {
  const quantityValue = product.querySelector(".product__quantity-value");
  const decButton = product.querySelector(".product__quantity-control_dec");
  const incButton = product.querySelector(".product__quantity-control_inc");
  const addButton = product.querySelector(".product__add");

  decButton.addEventListener("click", () => {
    const value = Number(quantityValue.textContent);

    if (value > 1) {
      quantityValue.textContent = value - 1;
    }
  });

  incButton.addEventListener("click", () => {
    quantityValue.textContent = Number(quantityValue.textContent) + 1;
  });

  addButton.addEventListener("click", () => {
    const productId = product.dataset.id;
    const productImage = product.querySelector(".product__image").src;
    const quantity = Number(quantityValue.textContent);
    const cartProduct = cartProducts.querySelector(
      `.cart__product[data-id="${productId}"]`
    );

    if (cartProduct) {
      const cartProductCount = cartProduct.querySelector(
        ".cart__product-count"
      );

      cartProductCount.textContent =
        Number(cartProductCount.textContent) + quantity;

      return;
    }

    cartProducts.insertAdjacentHTML(
      "beforeend",
      `
        <div class="cart__product" data-id="${productId}">
          <img class="cart__product-image" src="${productImage}">
          <div class="cart__product-count">${quantity}</div>
        </div>
      `
    );
  });
});
