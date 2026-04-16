// ضع هنا الرابط الذي حصلت عليه من الخطوة السابقة
const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbxkhwbBVsBNHosvgqiM4njeX9INH5Xeg4xCdH6FDzN8xjoXxGRaYyGXC1SMm3qtyp8s-g/exec";

async function addProduct() {
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let count = document.getElementById("count").value;
  let old_price = document.getElementById("old_price").value;
  let profit = old_price - price / count;

  if (name === "" || price === "" || count === "" || old_price === "") {
    alert("برجاء ملء كافة الحقول");
    return;

  }

  let product = { name, price, old_price, count, profit };

  // 1. إرسال البيانات إلى Google Sheets
  try {
    // إظهار تنبيه بسيط للمستخدم أثناء التحميل
    console.log("جاري الحفظ في جوجل شيت...");

    fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      mode: "no-cors", // ضرورية لتجنب مشاكل CORS مع تطبيقات جوجل
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });


    alert("تم إضافة المنتج بنجاح في الموقع وجوجل شيت!");
  } catch (error) {
    console.error("خطأ في الاتصال:", error);
    alert("حدث خطأ أثناء الاتصال بقاعدة البيانات");
  }

  if (name === "" || price === "" || count === "" || old_price === "") {
    alert("Please fill all fields");
    return;
  }
  if (editIndex === null) {
    // ➕ ADD
    products.push(product);
  } else {
    // ✏️ UPDATE
    products[editIndex] = product;
    editIndex = null;

    document.getElementById("submitBtn")
  }

  saveToLocalStorage();
  displayProducts();
}


let products = [];
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
        <td>${product.old_price}</td>
        <td class ='count'>${product.count}</td>
        <td>${((product.old_price - product.price) * product.count)}</td>
        <td>
          <button class="delete" onclick="deleteProduct(${index})">Delete</button>
        </td>
        <td><button onclick="prepareEdit(${index})" class="edit-btn"><i class="fas fa-edit"></i></button></td>
    `;
  });

  document.getElementById("tableBody").innerHTML = table;
}





// 🔍 Search Product
function searchProduct() {
  let searchValue = document.getElementById("search").value.toLowerCase();

  let filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchValue),
  );

  displayProducts(filtered);
}


// تحديث دالة الحذف في ملف product.js
function deleteProduct(index) {
  let productName = products[index].name; // الحصول على الاسم قبل الحذف من المصفوفة

  // إرسال طلب الحذف إلى Google Sheets
  fetch(GOOGLE_SHEET_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "delete",
      name: productName
    }),
  })
    .then(() => console.log("تم الحذف من جوجل شيت"))
    .catch(err => console.error("خطأ في الاتصال:", err));

  // الحذف المحلي المكتوب في ملفك الأصلي
  products.splice(index, 1);
  saveToLocalStorage();
  displayProducts();
}




let editIndex = null;
function prepareEdit(index) {
  let product = products[index];

  document.getElementById("name").value = product.name;
  document.getElementById("price").value = product.price;
  document.getElementById("count").value = product.count;
  document.getElementById("old_price").value = product.old_price;

  editIndex = index;

  document.getElementById("submitBtn").innerText = "تحديث المنتج";
}
