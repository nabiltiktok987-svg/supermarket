// استبدل هذا الرابط بالرابط الذي نسخته من الخطوة السابقة
const scriptURL = 'https://script.google.com/macros/s/AKfycbwsfg5ElOnj7eLfol5CF66jcPrlPUpc6LIezP2sNwroJzmNiYqh94KMRk3EcFcZ1uHNgg/exec';
function addToCart() {
  const name = document.getElementById("prodName").value;
  const price = parseFloat(document.getElementById("prodPrice").value);
  const qty = parseInt(document.getElementById("prodQty").value);

  if (name && price > 0 && qty > 0) {
    const item = {
      id: Date.now(),
      name: name,
      price: price,
      qty: qty,
      total: price * qty
    };

    // إرسال البيانات إلى Google Sheets
    fetch(scriptURL, {
      method: 'POST',
      mode: 'no-cors', // لتجنب مشاكل الـ CORS
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
      .then(() => console.log("تم حفظ البيانات في Google Sheets"))
      .catch(error => console.error('خطأ!', error.message));

    // الكود القديم الخاص بك للإضافة محلياً
    cart.push(item);
    saveAndRender();

    document.getElementById("prodName").value = "";
    document.getElementById("prodPrice").value = "";
    document.getElementById("prodQty").value = "1";
  } else {
    alert("من فضلك أدخل بيانات صحيحة");
  }
  fetchOrdersFromSheet()
  renderCart()
}



// دالة لجلب البيانات من جوجل شيت وعرضها
function fetchOrdersFromSheet() {
  const tableBody = document.getElementById("tableBody1"); // تأكد أن هذا هو ID الجدول الخاص بالسجلات
  tableBody.innerHTML = "<tr><td colspan='4'>جاري تحميل البيانات...</td></tr>";
  fetch(scriptURL)
    .then(response => response.json())
    .then(data => {
      tableBody.innerHTML = ""; // مسح رسالة التحميل
      const today = new Date(); // Creates current date object
      data.reverse().forEach(item => { // reverse لعرض الأحدث أولاً
        const name = document.getElementById("prodName").value;
        const productName = typeof item.name === 'object' ? JSON.stringify(item.name) : item.name;
        const row = `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.qty}</td>
                        <td>${parseFloat(item.total).toFixed(2)}</td>
                        <td>${today.toDateString()}</td>
                    </tr>
                `;
        tableBody.innerHTML += row;
      });
    })
    .catch(error => {
      console.error('Error:', error);
      tableBody.innerHTML = "<tr><td colspan='4'>خطأ في تحميل البيانات</td></tr>";
    });
}

// استدعاء الدالة عند تحميل الصفحة لرؤية الفواتير القديمة
window.onload = fetchOrdersFromSheet();

let cart = JSON.parse(localStorage.getItem("myCart")) || [];

function renderCart() {
  const body = document.getElementById("billBody");
  body.innerHTML = "";
  let grandTotal = 0;

  cart.forEach((item) => {
    grandTotal += item.total;
    body.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.qty}</td>
                <td>${item.total.toFixed(2)}</td>
                <td><button onclick="removeItem(${item.id})" style="background:none; color:red; width:auto;">❌</button></td>
            </tr>
        `;
  });

  document.getElementById("grandTotal").innerText = grandTotal.toFixed(2);
}


function saveAndRender() {
  localStorage.setItem("myCart", JSON.stringify(cart));
  renderCart();
}

renderCart()

function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);
  saveAndRender();
}

function clearCart() {
  if (confirm("هل تريد مسح الفاتورة بالكامل؟")) {
    cart = [];
    saveAndRender();
  }
}









