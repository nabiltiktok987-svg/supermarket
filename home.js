let products = [];

let no_pro = document.querySelector(".no_pro");
no_pro.innerHTML = JSON.parse(localStorage.getItem("products")).length;

// 🔄 Load data from LocalStorage when page opens
if (localStorage.getItem("products")) {
  products = JSON.parse(localStorage.getItem("products"));
  displayProducts();
}

// 💾 Save to LocalStorage
function saveToLocalStorage() {
  localStorage.setItem("products", JSON.stringify(products));
}

// 📋 Display Products
function displayProducts(list = products) {
  let table = "";

  list.forEach((product, index) => {
    table += `
      <tr>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td class ='count'>${product.count}</td>
      </tr>
    `;
  });

  document.getElementById("tableBody1").innerHTML = table;
}




// 🔍 Search Product
function searchProduct() {
  let searchValue = document.getElementById("search").value.toLowerCase();

  let filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchValue),
  );

  displayProducts(filtered);
}

let grand = document.getElementById("grandTotal");
const price = parseFloat(document.getElementById("prodPrice").value);
const qty = parseInt(document.getElementById("prodQty").value);

const item = {
  price: price,
  qty: qty,
  total: price * qty,
}

grand += item.total;

let sells = document.querySelector('.nab');


sells.innerHTML = `nabil`
