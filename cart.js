// Darshna Creations - Free Shopping Cart

let cart = JSON.parse(localStorage.getItem("darshnaCart")) || [];

function saveCart() {
  localStorage.setItem("darshnaCart", JSON.stringify(cart));
}

function addToCart(name, price, quantity = 1) {
  const existingProduct = cart.find(item => item.name === name);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({
      name: name,
      price: Number(price),
      quantity: quantity
    });
  }

  saveCart();

  alert(name + " added to cart 🛒");

  updateCartCount();
}

function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);

  saveCart();

  displayCart();
  updateCartCount();
}

function changeQuantity(name, change) {
  const product = cart.find(item => item.name === name);

  if (!product) return;

  product.quantity += change;

  if (product.quantity <= 0) {
    removeFromCart(name);
    return;
  }

  saveCart();

  displayCart();
  updateCartCount();
}

function getCartTotal() {
  return cart.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );
}

function updateCartCount() {
  const countElement = document.getElementById("cart-count");

  if (!countElement) return;

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  countElement.textContent = totalItems;
}

function displayCart() {
  const cartContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("cart-total");

  if (!cartContainer) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty 🛒</p>";

    if (totalElement) {
      totalElement.textContent = "₹0";
    }

    return;
  }

  cartContainer.innerHTML = "";

  cart.forEach(item => {
    const itemDiv = document.createElement("div");

    itemDiv.className = "cart-item";

    itemDiv.innerHTML = `
      <h3>${item.name}</h3>

      <p>Price: ₹${item.price}</p>

      <button onclick="changeQuantity('${item.name}', -1)">−</button>

      <strong> ${item.quantity} </strong>

      <button onclick="changeQuantity('${item.name}', 1)">+</button>

      <p>
        Subtotal: ₹${item.price * item.quantity}
      </p>

      <button onclick="removeFromCart('${item.name}')">
        Remove
      </button>

      <hr>
    `;

    cartContainer.appendChild(itemDiv);
  });

  if (totalElement) {
    totalElement.textContent = "₹" + getCartTotal();
  }
}

function orderOnWhatsApp() {
  if (cart.length === 0) {
    alert("Your cart is empty 🛒");
    return;
  }

  let message = "Hello Darshna Creations! 🌸%0A%0AI would like to order:%0A%0A";

  cart.forEach(item => {
    message +=
      item.name +
      " × " +
      item.quantity +
      " = ₹" +
      (item.price * item.quantity) +
      "%0A";
  });

  message +=
    "%0ATotal: ₹" +
    getCartTotal() +
    "%0A%0AThank you!";

  const whatsappNumber = "917083941883";

  const whatsappURL =
    "https://wa.me/" +
    whatsappNumber +
    "?text=" +
    message;

  window.open(whatsappURL, "_blank");
}

updateCartCount();
