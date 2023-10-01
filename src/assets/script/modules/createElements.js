export const createModal = (data) => {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContainer = document.createElement('div');
    modalContainer.classList.add('container', 'modal__container');

    const modalCatalogGroup = document.createElement('div');
    modalCatalogGroup.classList.add(
            'modal__group', 'modal__group_catalog');

    const modalCatalogTitle = document.createElement('h3');
    modalCatalogTitle.classList.add('modal__title');
    modalCatalogTitle.textContent = 'Каталог';

    const modalCatalogList = document.createElement('ul');
    modalCatalogList.classList.add('modal__list', 'modal__list_catalog');

    const modalCatalogItems = data.map(item => {
        const modalCatalogItem = document.createElement('li');
        modalCatalogItem.classList.add('modal__item');
        modalCatalogItem.innerHTML = `
            <a class="modal__link" 
                href="catalog.html?category=${item}">${item}
            </a>
        `;
        return modalCatalogItem;
    });
    modalCatalogList.append(...modalCatalogItems);
    modalCatalogGroup.append(modalCatalogTitle, modalCatalogList);

    const modalCustomersGroup = document.createElement('div');
    modalCustomersGroup.classList.add(
            'modal__group', 'modal__group_customers', 'customers');
    modalCustomersGroup.innerHTML = `
        <h3 class="modal__title">Покупателям</h3>
        <ul class="modal__list modal__list_customers">
            <li class="modal__item">
                <a class="modal__link" href="#">Оплата заказа</a>
            </li>
            <li class="modal__item">
                <a class="modal__link" href="#">Условия доставки</a>
            </li>
            <li class="modal__item">
                <a class="modal__link" href="#">
                    Условия возврата заказа
                </a>
            </li>
            <li class="modal__item">
                <a class="modal__link" href="blog.html">Блог</a>
            </li>
        </ul>             
    `;

    const modalContactsGroup = document.createElement('div');
    modalContactsGroup.classList.add(
            'modal__group', 'modal__group_contacts', 'contacts');
    modalContactsGroup.innerHTML = `
        <h3 class="modal__title">Связаться с нами</h3>
        <ul class="modal__list modal__list_contacts">
            <li class="modal__item modal__item_contacts">
                <a class="modal__link modal__link_contacts" 
                    href="#contacts">Контакты</a>
            </li>
        </ul>               
    `;
    modalContainer.append(
            modalCatalogGroup, modalCustomersGroup, modalContactsGroup);
    modal.append(modalContainer);

    return modal;
};

export const createCard = (item) => {
    const card = document.createElement('li');
    card.classList.add('cards__item');
    card.id = item.id;

    card.innerHTML = `
        <a class="cards__link" href="product.html?id=${item.id}">
            <div class="cards__img">
                <picture>
                    <img src="${item.image === 'image/notimage.jpg' ?
                    './imgs/no-foto.jpg' : `https://leaf-serious-chef.glitch.me/${item.image}`}"
                    alt="${item.title}" width="420" height="295" loading="lazy">
                </picture>
                ${item.discount ?
                    `<span class="cards__sticker" aria-label="скидка">
                    -${item.discount}%
                    </span>}` : `<span></span>`}                 
            </div>
            <div class="cards__prices">
                <p class="cards__price-current" aria-label="цена со скидкой">
                    ${(item.price * (1 - item.discount / 100)).toFixed(0)} ₽
                </p>
                <p class="cards__price-full" aria-label="цена без скидки">
                    ${item.price} ₽
                </p>
            </div>
            <p class="cards__item-name">${item.title}</p>
        </a>
    `;

    return card;
};

export const createProduct = (item) => {
    const product = document.querySelector('.product__wrapper');
    const breadcrumbsLink =
        document.querySelector('.breadcrumbs__link_product');
    const breadcrumbsTitle =
        document.querySelector('.breadcrumbs__item_product');
    breadcrumbsLink.href = `catalog.html?category=${item.category}`;
    breadcrumbsLink.textContent = item.category;
    breadcrumbsTitle.textContent = item.title;

    product.innerHTML = `
        <h1 class="product__title">${item.title}</h1>
    
        <div class="product__wrap">
            <div class="product__main">
                <picture>
                    <img class="product__img" 
                        src="${item.image === 'image/notimage.jpg' ?
                        './imgs/no-foto.jpg' : `https://leaf-serious-chef.glitch.me/${item.image}`}"
                        alt="${item.title}" width="757" height="427" 
                        loading="lazy">
                </picture>
                ${item.discount ? `<span class="product__discount" 
                    aria-label="скидка">
                    -${item.discount}% </span>` : `<span></span>`}     
            </div>
            <div class="product__description description">
                <p class="description__heading">Описание:</p>
                <p class="description__text">${item.description}</p>
            </div>   
            <div class="product__details">
                <div class="product__price price">
                    <p class="price__current">
                        ${Math.round((item.price * (1 - item.discount / 100)))
            .toLocaleString()} ₽
                    </p>
                    ${item.discount ? `<p class="price__old">
                        ${Number(item.price).toLocaleString('ru')} ₽
                    </p>` : `<p></p>`}
                </div>
                <a href="#" class="product__credit">В кредит от 5600 ₽</a>
                <div class="product__button button">
                    <button class="button__add-cart" type="button">
                        Добавить в корзину
                    </button>
                    <button class="button__add-favorite" type="button" 
                        aria-label="Добавить в избранное">
                        <svg width="33" height="33" viewBox="0 0 33 33" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_901_1437)">
                                <path d="M22.6875 4.125C20.295 4.125 17.9987 5.23875 16.5 6.99875C15.0012 5.23875 12.705 4.125 10.3125 4.125C6.0775 4.125 2.75 7.4525 2.75 11.6875C2.75 16.885 7.425 21.12 14.5062 27.555L16.5 29.3563L18.4937 27.5413C25.575 21.12 30.25 16.885 30.25 11.6875C30.25 7.4525 26.9225 4.125 22.6875 4.125ZM16.6375 25.5062L16.5 25.6437L16.3625 25.5062C9.8175 19.58 5.5 15.6613 5.5 11.6875C5.5 8.9375 7.5625 6.875 10.3125 6.875C12.43 6.875 14.4925 8.23625 15.2212 10.12H17.7925C18.5075 8.23625 20.57 6.875 22.6875 6.875C25.4375 6.875 27.5 8.9375 27.5 11.6875C27.5 15.6613 23.1825 19.58 16.6375 25.5062Z"/>
                            </g>
                            <defs><clippath id="clip0_901_1437">
                                <rect width="33" height="33" fill="white"/>
                                </clippath></defs>
                        </svg>
                    </button>
                </div>
                <ul class="product__info info">
                    <li class="info__item">
                        <p class="info__heading">Доставка</p>
                        <p class="info__text">1-3 января</p>
                    </li>
                    <li class="info__item">
                        <p class="info__heading">Продавец</p>
                        <p class="info__text">ShopOnline</p>
                    </li>
                </ul>
                <a class="product__notification notification" href="#">
                    <svg class="notification__icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 13.586V10C19 6.783 16.815 4.073 13.855 3.258C13.562 2.52 12.846 2 12 2C11.154 2 10.438 2.52 10.145 3.258C7.185 4.074 5 6.783 5 10V13.586L3.293 15.293C3.19996 15.3857 3.12617 15.4959 3.07589 15.6172C3.0256 15.7386 2.99981 15.8687 3 16V18C3 18.2652 3.10536 18.5196 3.29289 18.7071C3.48043 18.8946 3.73478 19 4 19H20C20.2652 19 20.5196 18.8946 20.7071 18.7071C20.8946 18.5196 21 18.2652 21 18V16C21.0002 15.8687 20.9744 15.7386 20.9241 15.6172C20.8738 15.4959 20.8 15.3857 20.707 15.293L19 13.586ZM19 17H5V16.414L6.707 14.707C6.80004 14.6143 6.87383 14.5041 6.92412 14.3828C6.9744 14.2614 7.00019 14.1313 7 14V10C7 7.243 9.243 5 12 5C14.757 5 17 7.243 17 10V14C17 14.266 17.105 14.52 17.293 14.707L19 16.414V17ZM12 22C12.6193 22.0008 13.2235 21.8086 13.7285 21.4502C14.2335 21.0917 14.6143 20.5849 14.818 20H9.182C9.38566 20.5849 9.76648 21.0917 10.2715 21.4502C10.7765 21.8086 11.3807 22.0008 12 22Z"/>
                    </svg>
                    <span class="notification__caption">
                        Узнать о снижении цены
                    </span>    
                </a>
            </div>
        </div>    
    `;
};

export const createFooterCatalog = (data) => {
    const footerCatalog = document.querySelector('.footer__list_catalog');
    footerCatalog.innerHTML = '';

    const footerCatalogItems = data.map(item => {
        const footerCatalogItem = document.createElement('li');
        footerCatalogItem.classList.add('footer__item');

        footerCatalogItem.innerHTML = `
            <a class="footer__link" href="catalog.html?category=${item}">
                ${item}
            </a>
        `;
        return footerCatalogItem;
    });

    footerCatalog.append(...footerCatalogItems);
};
