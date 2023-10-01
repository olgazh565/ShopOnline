import {createModal} from './createElements.js';

// управление пагинацией
export const controlPagination = ({page}) => {
    const paginationLinks = document.querySelectorAll('.pagination__page');

    paginationLinks && paginationLinks.forEach((link) => {
        if (+link.innerText === page) {
            link.classList.add('is-active');
        } else {
            link.classList.remove('is-active');
        }
    });
};

const disableArrow = (arrow) => {
    arrow.classList.add('is-disabled');
    arrow.addEventListener('click', (e) => {
        e.preventDefault();
    });
};

const enableArrow = (arrow) => {
    arrow.classList.remove('is-disabled');
};

// управление стрелками пагинации
export const controlArrows = ({pages: pagesTotal, page}) => {
    const arrowLeft = document.querySelector('.pagination__left');
    const arrowRight = document.querySelector('.pagination__right');

    if (arrowLeft) {
        if (page === 1) {
            disableArrow(arrowLeft);
        } else {
            enableArrow(arrowLeft);
        }
    }
    if (arrowRight) {
        if (page === pagesTotal) {
            disableArrow(arrowRight);
        } else {
            enableArrow(arrowRight);
        }
    }
};

// Управление кнопкой меню
export const controlModalMenu = (data) => {
    const menuBtn = document.querySelector('.header__menu-button');
    const modalMenu = createModal(data);

    menuBtn.addEventListener('click', () => {
        document.body.append(modalMenu);
        modalMenu.classList.toggle('show-modal');

        menuBtn.style.backgroundImage =
            modalMenu.classList.contains('show-modal') ?
            'url(./imgs/menu-close.svg)' : 'url(./imgs/menu-open.svg)';
    });

    modalMenu.addEventListener('click', ({target}) => {
        if (target.closest('.modal__link')) {
            modalMenu.classList.remove('show-modal');
            menuBtn.style.backgroundImage = 'url(./imgs/menu-open.svg)';
        }
    });
};

// Управление поиском
export const controlSearchForm = () => {
    const form = document.querySelector('.header__search');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const search = form.search.value.trim();
        if (!search) return;

        window.location.assign(`catalog.html?search=${search}`);
    });
};
