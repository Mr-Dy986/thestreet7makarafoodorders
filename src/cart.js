let basket = JSON.parse(localStorage.getItem("data")) || [];
let bill = document.getElementById("bill");
let cartItems = document.getElementById("cartItems");

const itemsSum = () => {
  let cartCounter = document.querySelector(".cartCounter");
  let count = 0;

  basket.forEach(({ item }) => (count += item));
  cartCounter.innerHTML = count;
};
itemsSum();

const generateCartItems = () => {
  if (basket.length === 0) {
    // Generate friendly message and go home button
    bill.innerHTML = `
      <h1>លោកអ្នកមិនទាន់បានកម្មង់ទេ!</h1>
      <a class="goHome" href="index.html">ចុចត្រង់នេះដើម្បីមើលម៉ឺនុយ!</a>
    `;
    cartItems.innerHTML = ``;
  } else {
    // Generate the cart
    cartItems.innerHTML = basket
      .map((basketItem) => {
        let search = shopItems.find(
          (shopItem) => shopItem.id === basketItem.id
        ); // pull item from dummy data

        let total = (search.price * basketItem.item).toFixed(0); // calculate the total

        let cartItem = `
        <div id="${search.id}" class="cartItem green-shadow">
          <img src="${search.img}" alt="chicken-bucket" />
          <div class="cartItem__content">
          <h1>${search.name} ${search.price} ៛</h1>
          <div class="cartItem__content--total">Total: <span>${total} ៛</span></div>
          <div class="cartItem__content--controls">
            <button onclick="handleDecrement(${search.id})" class="btn remove">-</button>
            <span class="quantity">${basketItem.item}</span>
            <button onclick="handleIncrement(${search.id})" class="btn add">+</button>
            </div>
          </div>
          <button class="delete" onclick="deleteItem(${search.id})">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
        `;

        // return the populated HTML template
        return cartItem;
      })
      .join("");
  }
};

generateCartItems();

const deleteItem = (id) => {
  // remove the item from the local storage
  basket = basket.filter((x) => x.id !== id);
  localStorage.setItem("data", JSON.stringify(basket));
  // remove the item from the UI
  let itemToDelete = document.getElementById(id);
  itemToDelete.remove();
  // update the cart counter
  itemsSum();
  totalPrice();
  // reload the page if there are no remaining items
  if (basket.length === 0) location.reload();
};

const handleDecrement = (id) => {
  let search = basket.find((basketItem) => basketItem.id === id);

  if (search === undefined) return;
  search.item--;
  update(id);

  generateCartItems();

  if (search.item === 0) {
    deleteItem(id);
  }

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
  generateCartItems();
};

const update = (id) => {
  let search = basket.find((basketItem) => basketItem.id === id);

  document.getElementById(id).querySelector(".quantity").innerHTML =
    search.item;

  itemsSum();
  totalPrice();
};

const cancelOrder = () => {
  basket = [];
  localStorage.setItem("data", JSON.stringify(basket));
  window.location.replace("index.html");
};

const totalPrice = () => {
  if (basket.length === 0) return;

  let totalPrice = basket.map((basketItem) => {
    let search = shopItems.find((shopItem) => shopItem.id === basketItem.id);
    return search.price * basketItem.item;
  });

  totalPrice = totalPrice.reduce((a, b) => a + b, 0).toFixed(0);

  bill.innerHTML = `
  <h1 id="totalPrice">Total Price: <span>${totalPrice} ៛</span></h1>
  <div>
    <a href="order.html" class="order">កម្មង់</a>
    <a href="index.html" class="addMore">កម្មង់បន្ថែម</a>
    <button onclick="cancelOrder()" class="cancel">ចាកចេញ</button>
  </div>
`;
};

totalPrice();
