// script.js

const products = [
    { name: 'Бандитка Шелли', icon: 'https://shoei1944.github.io/brawlstarsmoment.github.io/img/Shelly-bandita.webp', description: 'Скин включает: - особую модель бойца.', price: 129, type: 'skin', id: 0, style: 'rainbow', goto: 'buy-shelly.html'},
    { name: 'Панда Нита', icon: 'https://shoei1944.github.io/brawlstarsmoment.github.io/img/Nita-panda.webp', description: 'Скин включает: - особую модель бойца.', price: 129, type: 'skin', id: 1, goto: 'buy-panda-nito.html'},
    { name: 'ЗомБорк', icon: 'https://shoei1944.github.io/brawlstarsmoment.github.io/img/Zombrok.webp', description: 'Скин включает: - особую модель бойца.', price: 129, type: 'skin', id: 2, goto: 'buy-zombrok.html'},
    { name: 'ВамПримо', icon: 'https://shoei1944.github.io/brawlstarsmoment.github.io/img/Vam-prmio.webp', description: 'Скин включает: - особую модель бойца.', price: 129, type: 'skin', id: 3, goto: 'buy-vam-primo.html'},
    { name: 'Классический 8-БИТ', icon: 'https://brawlbox.cc/images/8bit-300x226.png.webp', description: 'Скин включает: - особую модель бойца.', price: 129, type: 'skin', id: 4, goto: 'buy-classic-8-bit.html'},
    { name: 'Красный Рико', icon: 'https://shoei1944.github.io/brawlstarsmoment.github.io/img/Red_riko.webp', description: 'Скин включает: - особую модель бойца.', price: 129, type: 'skin', id: 5, goto: 'buy-red-riko.html'},

    { name: '2000 Гемов', icon: 'https://brawlbox.cc/images/2000gemy-300x237.png', description: '', price: 129, type: 'gems', id: 6, goto: 'buy-2000-gems.html'},
    { name: '950 Гемов', icon: 'https://brawlbox.cc/images/360gemy-1-300x237.png', description: '', price: 129, type: 'gems', id: 7, goto: 'buy-950-gems.html'},
    { name: '170 Гемов', icon: 'https://brawlbox.cc/images/360gemy-1-300x237.png', description: '', price: 129, type: 'gems', id: 8, goto: 'buy-170-gems.html'},
  ];

const types = {
  'skin': 'Скин',
  'gems': 'Геммы',
  'coins': 'Монеты',
 };

const allButton = document.querySelector('.btn-all');
const brawlersButton = document.querySelector('.btn-brawlers');
const gemsButton = document.querySelector('.btn-gems');
const setsButton = document.querySelector('.btn-sets');
const specialsButton = document.querySelector('.btn-specials');

// продукты
try {
  const productsList = document.querySelector('.products');

  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.className = 'product-card';
    productElement.innerHTML = `
        <img src="${product.icon}" alt="${product.name}">
        <h3 class="title">${product.name}</h3>
        <p>${types[product.type] || 'Неизвестный тип'}</p>
        <!-- <button class="btn btn-buy buy" data-product-id=${product.id}><a href='/html/buy/${product.goto}'>${product.price}₽</a></button> -->
        <button class="btn" data-product-id=${product.id}><a href='/html/buy/${product.goto}'>${product.price}₽</a></button>

    `;
    try {
    if(product.style == 'rainbow') console.log(`${product.name}`);
    element = productElement.querySelector('.btn-buy');
    if(product.style == 'rainbow') { element.classList.add("rainbow rainbow_text_animated"); }
    }
    catch (ex) {

    }

    productsList.appendChild(productElement);
  });
}
catch (ext){
}

function filterProducts(type) {
  const productsList = document.querySelector('.products');
  productsList.innerHTML = ''; // Очищаем список продуктов

  products.forEach(product => {
    if (type === 'all' || product.type === type) {
      const productElement = document.createElement('div');
      productElement.className = 'product-card';
      productElement.innerHTML = `
        <img src="${product.icon}" alt="${product.name}">
        <h3 class="title">${product.name}</h3>
        <p>${types[product.type] || 'Неизвестный тип'}</p>
        <!-- <button class="btn btn-buy buy" data-product-id=${product.id}><a href='/html/buy/${product.goto}'>${product.price}₽</a></button> -->
        <button class="btn" data-product-id=${product.id}><a href='/html/buy/${product.goto}'>${product.price}₽</a></button>
      `;
      productsList.appendChild(productElement);
    }
  });

  const buyButtons = document.querySelectorAll('.buy');
buyButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productId = parseInt(button.getAttribute('data-product-id'));
    addToTrash(productId);
  });
});
}

// корзина
try {
const trashList = document.querySelector('.trash');

const savedTrash = localStorage.getItem('trashItems');
console.log(savedTrash);
if (savedTrash) {
  
  const trash = JSON.parse(savedTrash);

  trash.forEach(item => {
    const trashElement = document.createElement('div');
    trashElement.className = 'trash-card';
    trashElement.innerHTML = `
        <img src="${item.icon}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p class="price-title">${item.price} рублей</p>
        <p>${types[item.type] || 'Неизвестный тип'}</p>
        <a href="/buy/${item.id}"><button class="btn linked" data-product-id="${item.id}">Купить</button></a>
        <button class="btn del" data-product-id="${item.id}">Удалить</button>
    `;
    trashList.appendChild(trashElement);
  });
} 
}
catch (ext){
}

function deleteFromTrash(productId) {
  const trash = JSON.parse(localStorage.getItem('trashItems')) || [];
  const index = trash.findIndex(item => item.id === productId);
  
  if (index!== -1) {
    trash.splice(index, 1);
    
    localStorage.setItem('trashItems', JSON.stringify(trash));
    console.log(`Продукт с ID ${productId} удален из корзины`);
    alert(`Продукт с ID ${productId} удален из корзины`)
    
    updateTrashList();
  } else {
    console.log(`Продукт с ID ${productId} не найден в корзине`);
  }
}

function updateTrashList() {
  const trashList = document.querySelector('.trash');
  trashList.innerHTML = '';
  
  const savedTrash = localStorage.getItem('trashItems');
  if (savedTrash) {
    const trash = JSON.parse(savedTrash);
    
    trash.forEach(item => {
      const trashElement = document.createElement('div');
      trashElement.className = 'trash-card';
      trashElement.innerHTML = `
          <img src="${item.icon}" alt="${item.name}">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <p class="price-title">${item.price} рублей</p>
          <p>${types[item.type] || 'Неизвестный тип'}</p>
          <a href="/buy/${item.id}"><button class="btn linked" data-product-id="${item.id}">Купить</button></a>
          <button class="btn del" data-product-id="${item.id}">Удалить</button>
      `;
      trashList.appendChild(trashElement);
    });
    
  }

const delButtons = document.querySelectorAll('.del');
delButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productId = parseInt(button.getAttribute('data-product-id'));
    deleteFromTrash(productId);
  });
});

}

function addToTrash(productName) {
  const trash = JSON.parse(localStorage.getItem('trashItems')) || [];
  const product = products.find(item => item.id === productName);
  
  if (product) {
    trash.push({
      icon: product.icon,
      name: product.name,
      description: product.description,
      price: product.price,
      type: product.type,
      id: product.id
    });
    
    localStorage.setItem('trashItems', JSON.stringify(trash));
    console.log(`${product.name} добавлен в корзину`);
    alert(`${product.name} добавлен в корзину`);
  } else {
    console.log(`Продукт с именем ${productName} не найден`);
  }
}

const buyButtons = document.querySelectorAll('.buy');
buyButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productId = parseInt(button.getAttribute('data-product-id'));
    addToTrash(productId);
  });
});

const delButtons = document.querySelectorAll('.del');
delButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productId = parseInt(button.getAttribute('data-product-id'));
    deleteFromTrash(productId);
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const allButton = document.querySelector('.btn-all');
  const brawlersButton = document.querySelector('.btn-brawlers');
  const gemsButton = document.querySelector('.btn-gems');
  const setsButton = document.querySelector('.btn-sets');
  const specialsButton = document.querySelector('.btn-specials');

  allButton.addEventListener('click', () => filterProducts('all'));
  brawlersButton.addEventListener('click', () => filterProducts('skin')); 
  gemsButton.addEventListener('click', () => filterProducts('gems'));
  setsButton.addEventListener('click', () => filterProducts('sets'));
  specialsButton.addEventListener('click', () => filterProducts('specials'))
});



const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');
