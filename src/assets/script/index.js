import {findTimer} from './modules/timer.js';
import {createFooterCatalog, createProduct} from './modules/createElements.js';
import {
    controlArrows,
    controlModalMenu,
    controlPagination,
    controlSearchForm,
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
    getCategories,
    getDiscountProducts,
    getProduct,
    getProductsByCategory,
    getSearchProducts,
} from './modules/serviceAPI.js';
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

    await getCategories(createFooterCatalog, controlModalMenu);

    controlSearchForm();
    await getSearchProducts(renderCards);

    console.log('window.location.pathname:', window.location.pathname);
};


init();
