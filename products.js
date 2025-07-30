let allProducts = [];       // will hold the full list
const container = document.getElementById('product-container');
const spinner   = document.getElementById('spinner');
const errorMsg  = document.getElementById('error');
const searchIn  = document.getElementById('search-input');

async function fetchAndShow() {
  try {
    spinner.classList.remove('hidden');
    const res = await fetch('https://fakestoreapi.com/products');
    allProducts = await res.json();
    renderProducts(allProducts);
  } catch (e) {
    errorMsg.classList.remove('hidden');
  } finally {
    spinner.classList.add('hidden');
  }
}

function renderProducts(list) {
  container.innerHTML = '';
  if (!list.length) {
    container.innerHTML = '<p class="error-message">No products found.</p>';
    return;
  }
  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}" class="product-card__img"/>
      <div class="product-card__info">
        <h2 class="product-card__name">${p.title}</h2>
        <p class="product-card__price">$${p.price}</p>
        <button class="product-card__btn" onclick="location.href='product.html?id=${p.id}'">
          View
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

// listen for input and filter

searchIn.addEventListener('input', e => {
  const q = e.target.value.trim().toLowerCase();
  const filtered = allProducts.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  );
  renderProducts(filtered);
});

// kick things off
fetchAndShow();
