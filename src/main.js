let shop = document.getElementById("shop");
let basket = JSON.parse(localStorage.getItem("data")) || [];

const tele = window.Telegram.WebApp;

let generateShopItems = () => {
  return (shop.innerHTML = shopItems
    .map((item) => {
      let search = basket.find((basketItem) => basketItem.id === item.id);
      let count = 0;
      if (search !== undefined) count = search.item;

      return `
      <div class="item shadow" id="${item.id}">
        <img src="${item.img}" alt="${item.name} image" />
        <div class="item__content">
          <h3>${item.name} <span>${item.price} ៛</span></h3>
          <div class="item__content--controls">
            <button onclick="handleDecrement(${item.id})" class="btn remove">-</button>
            <span class="quantity">${count}</span>
            <button onclick="handleIncrement(${item.id})" class="btn add">+</button>
          </div>
        </div>
      </div>
      `;
    })
    .join(""));
};

generateShopItems();

const handleDecrement = (id) => {
  let search = basket.find((basketItem) => basketItem.id === id);
  if (search === undefined) return;
  if (search.item === 0) return;
  search.item--;

  update(id);

  basket = basket.filter((basketItem) => basketItem.item !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
};

const handleIncrement = (id) => {
  let search = basket.find((basketItem) => basketItem.id === id);

  if (search === undefined) {
    basket.push({ id, item: 1 });
  } else {
    search.item++;
  }

  localStorage.setItem("data", JSON.stringify(basket));

  update(id);
};

const update = (id) => {
  let search = basket.find((basketItem) => basketItem.id === id);

  document.getElementById(id).querySelector(".quantity").innerHTML =
    search.item;

  itemsSum();
};

const itemsSum = () => {
  let cartCounter = document.querySelector(".cartCounter");

  let count = 0;
  basket.forEach(({ item }) => (count += item));

  cartCounter.innerHTML = count;
};

itemsSum(); // Run this function at least once to update the cart counter on refresh.
