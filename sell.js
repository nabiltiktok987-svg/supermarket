let products = [];
let item = document.getElementById("tableBody1");
const limitedProducts = products.slice(0, 3);
item.innerHTML = `1`;

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
        <td id="pro_td" onclick = 'product()'>${product.name} ${product.price}</td>
      </tr>
    `;
  });

  document.getElementById("tableBody1").innerHTML = table;
}

// function product() {
//   // 1. الحصول على العنصر باستخدام ID
//   let pro_td = document.getElementById("pro_td");

//   // 3. إظهار النص في نافذة اخرى
//   let name = document.querySelector(".name");
//   let product = { name };
//   let text = pro_td.innerText;
//   products.push(product);

//   console.log(text);
// }

function product(list = products) {
  let table1 = "";
  list.forEach((product, index) => {
    table1.innerHTML += `
        <div class="product_data">
          <div class="name">${product.name}</div>
          <div class="price">${product.price}</div>
        </div>
    `;
  });

  document.querySelector(".product_data").innerHTML = table1;
}
