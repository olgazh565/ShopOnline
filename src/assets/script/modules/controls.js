export const controlPagination = ({page}) => {
    const paginationLinks = document.querySelectorAll('.pagination__page');

    paginationLinks.forEach((link) => {
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


