export const renderBasketItems = (dataLS) => {
    const basketList = document.querySelector('.goods__list');
    if (basketList) basketList.innerHTML = '';

    const basketItems = dataLS.map(item => {
        const basketItem = document.createElement('li');
        basketItem.classList.add('goods__item');
        basketItem.id = item.id;
        basketItem.innerHTML = `
            <div class="goods__item-wrap">
                <div class="goods__checkbox-wrap">
                    <label class="goods__item-checkbox checkbox-label" 
                        aria-label="выбрать товар" tabindex="0">
                        <input class="goods__checkbox-input checkbox-input" 
                            type="checkbox">
                    </label>
                </div>
                <a href="product.html?id=${item.id}" class="goods__link-img">
                    <img class="goods__img" src="https://leaf-serious-chef.glitch.me/${item.image}"
                        alt="${item.title}" width="130px" height="130px" 
                        loading="lazy">
                </a>
            </div>
            <a class="goods__link-title" href="product.html?id=${item.id}">
                ${item.title}
            </a>
            <div class="goods__count count">
                <button class="count__change count__change_minus minus">
                    -
                </button>
                <span class="count__number">${item.count}</span>
                <button class="count__change count__change_plus plus">+</button>
            </div>
            <div class="goods__sum sum">
                <p class="sum__total">
             ${Math.round(item.count * (item.price * (1 - item.discount / 100)))
            .toLocaleString()} ₽
                </p>
                <p class="sum__no-discount">
                    ${Math.round(item.price * item.count).toLocaleString()} ₽
                </p>
                <a class="sum__credit" href="#">В кредит от 5600 ₽</a>
            </div>
            <button class="goods__delete-btn" type="button" 
                aria-label="Удалить товар из корзины">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                    viewBox="0 0 24 24" fill="currentColor">
                    <g>
                        <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 
                            19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z"/>
                    </g>
                    <defs><clippath id="clip0_222_2825"><rect width="24" 
                        height="24" fill="white"/></clippath></defs>
                </svg>
            </button>
        `;
        return basketItem;
    });

    basketList && basketList.append(...basketItems);
};

export const renderDeliveryItems = (data) => {
    const deliveryList = document.querySelector('.delivery__list');
    if (deliveryList) deliveryList.innerHTML = '';

    const deliveryItems = data.map(item => {
        const deliveryItem = document.createElement('li');
        deliveryItem.classList.add('delivery__item');

        deliveryItem.innerHTML = `
            <a class="delivery__item-link" href="product.html?id=${item.id}">
                <img class="delivery__item-img" 
                    src="https://leaf-serious-chef.glitch.me/${item.image}" 
                    alt="${item.title}" width="80" height="80" loading="lazy">
            </a>
        `;
        return deliveryItem;
    });

    deliveryList && deliveryList.append(...deliveryItems);
};

export const countBasketTotal = (dataLS) => {
    const basketCountMain = document.querySelector('.basket__count');
    const countTotal = document.querySelector('.total__header-sum');
    const goodsAmount = document.querySelector('.total__amount');
    const countNoDiscount = document.querySelector('.no-discount-sum');
    const discountSum = document.querySelector('.discount-sum');

    const goodsNumber = dataLS.reduce((sum, el) => sum + el.count, 0);
    const sumTotal = dataLS.reduce(
            (sum, el) => sum + el.count * el.price * (1 - el.discount / 100),
            0);
    const sumNoDiscount = dataLS.reduce(
            (sum, el) => sum + el.count * el.price, 0);
    const sumDiscount = dataLS.reduce(
            (sum, el) => sum + el.count * el.price * el.discount / 100, 0);
    if (basketCountMain) basketCountMain.textContent = goodsNumber;
    if (goodsAmount) goodsAmount.textContent = goodsNumber;
    if (countTotal) {
        countTotal.textContent = Math.round(sumTotal).toLocaleString() + ' ₽';
    }
    if (countNoDiscount) {
        countNoDiscount.textContent =
            Math.round(sumNoDiscount).toLocaleString() + ' ₽';
    }
    if (discountSum) {
        discountSum.textContent =
            Math.round(sumDiscount).toLocaleString() + ' ₽';
    }
};

export const showBasketCountHeader = (dataLS) => {
    const basketCount = document.querySelector('.user__basket-count');

    const sum = dataLS.reduce((sum, el) => sum + el.count, 0);
    basketCount.textContent = sum;
};

export const controlCheckbox = () => {
    const checkboxMain = document.querySelector('.controls__checkbox-input');
    const checkboxs = document.querySelectorAll('.goods__checkbox-input');

    checkboxMain && checkboxMain.addEventListener('change', () => {
        if (checkboxMain.checked) {
            checkboxs.forEach(checkbox => checkbox.checked = true);
        } else {
            checkboxs.forEach(checkbox => checkbox.checked = false);
        }
    });
};

export const getLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem('basket')) || [];
    return data;
};

export const setLocalStorage = (item, dataLS) => {
    const index = dataLS.findIndex(el => el.id === item.id);

    if (index === -1) {
        item.count = 1;
        dataLS.push(item);
    } else {
        dataLS[index].count += 1;
    }

    localStorage.setItem('basket', JSON.stringify(dataLS));
};

export const addToBasket = (item, dataLS) => {
    const addBtn = document.querySelector('.button__add-cart');

    addBtn.addEventListener('click', () => {
        setLocalStorage(item, dataLS);
        showBasketCountHeader(dataLS);
    });
};

export const editItemBasket = (dataLS) => {
    document.addEventListener('click', ({target}) => {
        const btn = target.closest('.count__change');
        if (!btn) return;

        const id = btn.closest('.goods__item').id;
        const btnParent = btn.closest('.goods__count');
        const countValue = btnParent.children[1];
        const sums = btnParent.nextElementSibling.children;
        const sumTotal = sums[0];
        const sumNoDiscount = sums[1];
        const index = dataLS.findIndex(el => el.id === id);

        if (btn.classList.contains('minus')) {
            if (dataLS[index].count === 1) {
                dataLS.splice(index, 1);
                renderBasketItems(dataLS);
                renderDeliveryItems(dataLS);
                controlCheckbox();
            } else {
                dataLS[index].count -= 1;
            }
        } else {
            dataLS[index].count += 1;
        }

        localStorage.setItem('basket', JSON.stringify(dataLS));

        countValue.textContent = dataLS[index]?.count;
        sumTotal.textContent = (dataLS[index]?.count * dataLS[index]?.price *
            (1 - dataLS[index]?.discount / 100)).toLocaleString() + ' ₽';
        sumNoDiscount.textContent = (dataLS[index]?.count *
            dataLS[index]?.price).toLocaleString() + ' ₽';

        countBasketTotal(dataLS);
        showBasketCountHeader(dataLS);
    });
};

const deleteItem = (el, dataLS) => {
    const id = el.closest('.goods__item').id;
    const index = dataLS.findIndex(el => el.id === id);
    dataLS.splice(index, 1);
    localStorage.setItem('basket', JSON.stringify(dataLS));

    renderBasketItems(dataLS);
    renderDeliveryItems(dataLS);
    countBasketTotal(dataLS);
    showBasketCountHeader(dataLS);
    controlCheckbox();
};

export const deleteItemBasket = (dataLS) => {
    const deleteBtn = document.querySelector('.controls__delete-all');
    const checkboxes = document.querySelectorAll('.goods__checkbox-input');

    deleteBtn && deleteBtn.addEventListener('click', () => {
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                deleteItem(checkbox, dataLS);
            }
        });
    });

    document.addEventListener('click', ({target}) => {
        const btn = target.closest('.goods__delete-btn');
        if (!btn) return;
        deleteItem(btn, dataLS);
    });
};

