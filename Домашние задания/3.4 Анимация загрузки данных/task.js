const loader = document.getElementById("loader");
const items = document.getElementById("items");

const xhr = new XMLHttpRequest();

xhr.open("GET", "https://students.netoservices.ru/nestjs-backend/slow-get-courses");

xhr.addEventListener("load", () => {
  const data = JSON.parse(xhr.responseText);
  const valutes = data.response.Valute;

  Object.values(valutes).forEach((valute) => {
    items.innerHTML += `
      <div class="item">
        <div class="item__code">
          ${valute.CharCode}
        </div>
        <div class="item__value">
          ${valute.Value}
        </div>
        <div class="item__currency">
          руб.
        </div>
      </div>
    `;
  });

  loader.classList.remove("loader_active");
});

xhr.send();