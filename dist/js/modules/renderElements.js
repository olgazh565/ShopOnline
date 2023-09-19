import {getUserName} from './serviceAPI.js';

export const renderArticles = (data) => {
    const articlesList = document.querySelector('.blog__list');

    const articles = data.map(({id, title}) => {
        const articleItem = document.createElement('li');
        articleItem.classList.add('blog__item');

        articleItem.innerHTML = `
            <a class="blog__link" href="article.html?id=${id}">
                <img class="blog__image" src="../imgs/no-image.jpg"
                    alt="фото" width="195" height="195">
                <div class="blog__info">
                    <p class="blog__title" title="${title}">
                        ${title}
                    </p>
                    <p class="blog__date">22 октября 2021, 12:45</p>
                    <div class="blog__data">
                        <div class="blog__views">
                            <img class="blog__views-icon" 
                            src="../imgs/icons_eye.svg" alt="icon-eye">
                            <span class="blog__views-num">1.2K</span>
                        </div>
                        <div class="blog__comments">
                            <img class="blog__comments-icon" 
                            src="../imgs/chat.svg" alt="comments">
                            <span class="blog__comments-num">0</span>
                        </div>
                    </div>
                </div>
            </a>
        `;

        return articleItem;
    });

    articlesList && articlesList.append(...articles);
};

export const renderPagination = ({pages: pagesTotal, page}) => {
    const paginationGroup = document.querySelector('.blog__pagination');

    let previousPage;
    let currentPage;
    let nextPage;

    switch (page) {
        case 1:
            previousPage = page;
            currentPage = page + 1;
            nextPage = page + 2;
            break;
        case pagesTotal:
            previousPage = page - 2;
            currentPage = page - 1;
            nextPage = page;
            break;
        default:
            previousPage = page - 1;
            currentPage = page;
            nextPage = page + 1;
            break;
    }

    if (paginationGroup) {
        paginationGroup.innerHTML = `
        <a class="pagination__left" href="blog.html?page=${page - 1}">
            <svg width="37" height="37" viewBox="0 0 37 37" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_0_255)">
                    <path d="M32.375 16.9583H10.5296L16.0487 
                    11.4237L13.875 9.25L4.625 18.5L13.875 
                    27.75L16.0487 25.5763L10.5296 20.0417H32.375V16.9583Z"/>
                </g>
                <defs>
                    <clippath id="clip0_0_255">
                        <rect width="37" height="37" fill="white" />
                    </clippath>
                </defs>
            </svg>
        </a>
        <div class="pagination__pages">
            <a class="pagination__page" 
                href="blog.html?page=${previousPage}">
                ${previousPage}
            </a>
            <a class="pagination__page" 
                href="blog.html?page=${currentPage}">
                ${currentPage}
            </a>
            <a class="pagination__page" href="blog.html?page=${nextPage}">
                ${nextPage}
            </a>
        </div>
        <a class="pagination__right" href="blog.html?page=${page + 1}">
            <svg width="37" height="37" viewBox="0 0 37 37" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_0_258)">
                    <path d="M4.625 16.9583H26.4704L20.9513 11.4237L23.125 
                    9.25L32.375 18.5L23.125 27.75L20.9513 25.5763L26.4704
                    20.0417H4.625V16.9583Z"/>
                </g>
                <defs><clippath id="clip0_0_258">
                        <rect width="37" height="37" fill="white" 
                        transform="matrix(-1 0 0 1 37 0)" />
                    </clippath>
                </defs>
            </svg>
        </a>
    `;
    }
};

export const renderArticle = async ({user_id: userId, title, body}) => {
    const {name} = await getUserName(userId);

    const article = document.querySelector('.article__wrapper');
    const breadCrumbsLink = document.querySelector('.breadcrumbs__item_active');

    breadCrumbsLink.textContent = title;

    article.innerHTML = `
        <h1 class="article__title">${title}</h1>
        <div class="article__texts">
            <p class="article__text">${body}</p>
        </div>
    
        <div class="article__footer">
            <a class="article__link" href="blog.html">
                <svg width="24" height="24" viewBox="0 0 24 24" 
                fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_114_331)">
                        <path d="M21 11H6.83L10.41 7.41L9 6L3 12L9
                            18L10.41 16.59L6.83 13H21V11Z"/>
                    </g>
                    <defs><clippath id="clip0_114_331"><rect width="24" 
                    height="24" fill="white"/></clippath></defs>
                </svg>
                <span>К списку статей</span>    
            </a>
    
            <div class="article__info">
                <p class="article__author">${name || ''}</p>
                <p class="article__date">22 октября 2021, 12:45</p>
                <div class="article__statistic">
                    <div class="article__views">
                        <img class="article__views-icon" 
                            src="../imgs/icons_eye.svg" 
                                alt="icon-eye">
                        <span class="article__views-num">1.2K</span>
                    </div>
                    <div class="article__comments">
                        <img class="article__comments-icon" 
                            src="../imgs/chat.svg" alt="comments">
                        <span class="article__comments-num">0</span>
                    </div>
                </div>
            </div>
        </div>
    `;
};

export const renderModal = () => {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    modal.innerHTML = `
        <div class="container modal__container">
            <div class="modal__group modal__group_catalog catalog">
                <h3 class="modal__title">Каталог</h3>
                <ul class="modal__list modal__list_catalog">
                    <li class="modal__item">
                        <a class="modal__link" href="#">Смартфоны</a>
                    </li>
                    <li class="modal__item">
                        <a class="modal__link" href="#">Ноутбуки</a>
                    </li>
                    <li class="modal__item">
                        <a class="modal__link" href="#">Ювелирные изделия</a>
                    </li>
                    <li class="modal__item">
                        <a class="modal__link" href="#">Одежда</a>
                    </li>
                    <li class="modal__item">
                        <a class="modal__link" href="#">Бытовая техника</a>
                    </li>
                    <li class="modal__item">
                        <a class="modal__link" href="#">Бытовая химия</a>
                    </li>
                    <li class="modal__item">
                        <a class="modal__link" href="#">Книги и журналы</a>
                    </li>
                    <li class="modal__item">
                        <a class="modal__link" href="#">Домашний текстиль</a>
                    </li>
                    <li class="modal__item">
                        <a class="modal__link" href="#">Электроника</a>
                    </li>
                    <li class="modal__item">
                        <a class="modal__link" href="#">Косметика</a>
                    </li>
                </ul>
            </div>
            <div class="modal__group modal__group_customers customers">
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
            </div>
            <div class="modal__group modal__group_contacts contacts">
                <h3 class="modal__title">Связаться с нами</h3>
                <ul class="modal__list modal__list_contacts">
                    <li class="modal__item modal__item_contacts">
                        <a class="modal__link modal__link_contacts" 
                            href="#contacts" aria-label="контакты">Контакты</a>
                    </li>
                </ul>                
            </div>
        </div>
    `;

    return modal;
};

