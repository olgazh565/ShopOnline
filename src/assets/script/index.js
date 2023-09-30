import {findTimer} from './modules/timer.js';
import {
    controlArrows,
    controlModalMenu,
    controlPagination,
} from './modules/controls.js';
import {
    renderArticle,
    renderArticles,
    renderCards,
    renderPagination,
} from './modules/renderElements.js';
import {
    getArticle,
    getArticles,
    getDiscountProducts,
    getProduct,
    getProductsByCategory,
} from './modules/serviceAPI.js';
import {createProduct} from './modules/createElements.js';
import {addToBasket,
    controlCheckbox,
    countBasketTotal,
    renderBasketItems,
    renderDeliveryItems,
    deleteItemBasket,
    editItemBasket,
    getLocalStorage,
    showBasketCountHeader,
} from './modules/basket.js';

const init = async () => {
    findTimer();
    controlModalMenu();
    await getArticles(
            renderArticles,
            renderPagination,
            controlPagination,
            controlArrows,
    );
    await getArticle(renderArticle);

    await getDiscountProducts(renderCards);
    await getProductsByCategory(renderCards);

    const dataLS = getLocalStorage();
    await getProduct(createProduct, addToBasket, renderCards, dataLS);

    showBasketCountHeader(dataLS);
    countBasketTotal(dataLS);
    renderBasketItems(dataLS);
    renderDeliveryItems(dataLS);
    editItemBasket(dataLS);
    deleteItemBasket(dataLS);
    controlCheckbox();

    console.log('window.location.pathname:', window.location.pathname);
};


init();
