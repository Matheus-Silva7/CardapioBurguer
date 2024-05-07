const menu = document.getElementById("menu");
const cartModal = document.getElementById("cart-modal");
const cartBtn = document.getElementById("cart-btn");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarb = document.getElementById("address-warn");

let cart = [];

//abrir modal do carrinho
cartBtn.addEventListener("click", () => {
  cartModal.style.display = "flex";
  updateCartModel();
});

//se eu clicar fora do modal ele fecha
cartModal.addEventListener("click", (event) => {
  if (event.target === cartModal) {
    cartModal.style.display = "none";
  }
});

closeModalBtn.addEventListener("click", () => {
  cartModal.style.display = "none";
});

menu.addEventListener("click", (event) => {
  //console.log(event)
  //se eu clicar em um item que tem essa class ou em um item que o parente tenha a classe, chama
  let parentButton = event.target.closest(".add-to-card-btn");
  if (parentButton) {
    const name = parentButton.getAttribute("data-name");
    const price = parseFloat(parentButton.getAttribute("data-price"));

    //adicionar no carrinho
    addToCart(name, price);
  }
});

//funcao para add no carrinho

function addToCart(name, price) {
  // alert("o item é " + name);
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
    return;
  } else {
    cart.push({
      name,
      price,
      quantity: 1,
    });
  }

  updateCartModel();
}

//atualiza carrinho modal
function updateCartModel() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add(
      "flex",
      "justify-between",
      "mb-4",
      "flex-col"
    );
    cartItemElement.innerHTML = `
    <div class="flex items-center justify-between">
      <div>
        <p class="font-medium">${item.name}</p>
        <p>Qtd: ${item.quantity}</p>
        <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
      </div>
      <button class="remove-btn" data-name"${item.name}>Remover</button>
    </div
    `;
    cartItemsContainer.appendChild(cartItemElement);
    total = +item.price * item.quantity;
  });
  cartTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  cartCounter.innerHTML = cart.length;
}

//função para remover o item do carrinho
cartItemsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-btn")) {
    const name = event.target.getAttribute("data-name");

    removeitemCard(name);
  }
});

function removeitemCard(name) {
  //acho a posição que ele esta na lista
  const index = cart.findIndex((item) => (item.name === name));

  if (index !== -1) {
    const item = cart[index];

    if (item.quantity > 1) {
      item.quantity -= 1;
      updateCartModel();
      return;
    }

    //pega a posição do item e remove 1
    cart.splice(index, 1);
    updateCartModel()
  }
}
