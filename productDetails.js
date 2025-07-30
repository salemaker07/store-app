(async () => {
    const detailEl  = document.getElementById('product-detail');
    const spinner   = document.getElementById('spinner');
    const errorMsg  = document.getElementById('error');
    const params    = new URLSearchParams(location.search);
    const id       = params.get('id');
  
    if (!id) {
      spinner.classList.add('hidden');
      errorMsg.textContent = 'No product ID provided.';
      errorMsg.classList.remove('hidden');
      return;
    }
  
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!res.ok) throw new Error('Network response was not ok');
      const p = await res.json();
  
      spinner.classList.add('hidden');
      detailEl.classList.remove('hidden');
      detailEl.innerHTML = `
        <img 
          src="${p.image}" 
          alt="${p.title}" 
          class="product-detail__img"  
          loading = "lazy"
        />
        <div class="product-detail__info">
          <h2 class="product-detail__title">${p.title}</h2>
          <p class="product-detail__price">Price: $${p.price.toFixed(2)}</p>
          <p class="product-detail__desc">${p.description}</p>
          <p><strong>Category:</strong> ${p.category}</p>
          <p><strong>Rate:</strong> ${p.rating.rate}/5</p>
          <p><strong>Ratings:</strong> ${p.rating.count}</p>
          <button class="back-btn" onclick="history.back()">← Back</button>
        </div>
      `;
    } catch (err) {
      console.error(err);
      spinner.classList.add('hidden');
      errorMsg.classList.remove('hidden');
    }
  })();
  