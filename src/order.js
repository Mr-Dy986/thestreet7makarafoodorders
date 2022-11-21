let basket = JSON.parse(localStorage.getItem("data")) || [];
let heatBill = document.getElementById("heatBill");

const itemsSum = () => {
  let cartCounter = document.querySelector(".cartCounter");
  let count = 0;

  basket.forEach(({ item }) => (count += item));
  cartCounter.innerHTML = count;
};

itemsSum();

const generateHeatBill = () => {
  // generate item rows
  let items = basket
    .map((basketItem) => {
      let search = shopItems.find((item) => item.id === basketItem.id);
      let itemTotalPrice = basketItem.item * search.price;
      return `<tr><td>${search.name}</td><td>x${basketItem.item
        }</td><td>${itemTotalPrice.toFixed(0)} ៛</td></tr>`;
    })
    .join("");

  // calculate teh total bill price
  let totalPrice = basket
    .map((basketItem) => {
      let search = shopItems.find((item) => item.id === basketItem.id);
      return search.price * basketItem.item;
    })
    .reduce((a, b) => a + b, 0)
    .toFixed(0);

  // get the current date
  let date = new Date().toISOString().slice(0, 10);

  // create the complete UI of the bill
  heatBill.innerHTML = `
        <h1>ផ្លូវ-The Street</h1>
        <p>ផ្លូវ៧មករា ភូមិវត្តដំណាក់ សង្កាត់សាលាកំរើក</br>
          ក្រុងសៀមរាប </br>
          លេខទូរស័ព្ទ 010 526642</p>
        
        <div class="date">Date: ${date}</div>
        <table>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
    
          ${items}
          
          <tr>
            <th>Total Price</th>
            <th></th>
            <th>${totalPrice} ៛</th>
          </tr>
        </table>
        <p class="heatBillFooter">សូមអរគុណ!</p>
  `;
};

generateHeatBill();

const orderAgain = () => {
  FB.ui({
    method: 'send',
    link: 'http://www.nytimes.com/interactive/2015/04/15/travel/europe-favorite-streets.html',
  });
  localStorage.setItem("data", JSON.stringify([]));
  return window.location.replace("index.html");
};
