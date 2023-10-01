import {API_URL, API_URL_CRM} from './const.js';

export const getArticles = async (
        renderArticles,
        renderPagination,
        controlPagination,
        controlArrows,
) => {
    const params = new URLSearchParams(window.location.search);

    if (params.has('id')) return;
    if (!window.location.pathname.includes('/blog.html')) return;

    const pageNum = params.get('page') ? params.get('page') : 1;

    try {
        const result = await fetch(`${API_URL}/posts?page=${pageNum}`);
        const {data, meta: {pagination}} = await result.json();
        console.log('data: ', data);

        renderArticles(data);
        renderPagination(pagination);
        controlPagination(pagination);
        controlArrows(pagination);
    } catch (err) {
        console.log(err);
    }
};

export const getArticle = async (renderArticle) => {
    const params = new URLSearchParams(window.location.search);
    const urlPathname = window.location.pathname;

    if (!params.toString() || !urlPathname.includes('/article.html')) return;

    const articleId = params.get('id');

    try {
        const result = await fetch(`${API_URL}/posts/${articleId}`);
        const {data} = await result.json();
        console.log('data: ', data);

        renderArticle(data);
    } catch (err) {
        console.log(err);
    }
};

export const getUserName = async (userId) => {
    try {
        const result = await fetch(`${API_URL}/users/${userId}`);
        const {data} = await result.json();

        return data;
    } catch (err) {
        console.log(err);
    }
};

export const getDiscountProducts = async (renderCards) => {
    const urlPathname = window.location.pathname;

    if (window.location.href.endsWith('/') ||
        (urlPathname.includes('/index.html')) ||
        (urlPathname.includes('/basket.html'))) {
        try {
            const result = await fetch(`${API_URL_CRM}/api/goods/discount`);
            const data = await result.json();

            renderCards(data.slice(0, 8));
        } catch (err) {
            console.log(err);
        }
    }
};

export const getProduct = async (
        createProduct,
        addToBasket,
        renderCards,
        dataLS,
) => {
    const params = new URLSearchParams(window.location.search);
    const urlPathname = window.location.pathname;

    if (!params.toString() || !urlPathname.includes('/product.html')) return;

    const productId = params.get('id');

    try {
        const result = await fetch(`${API_URL_CRM}/api/goods/${productId}`);
        const data = await result.json();
        console.log('data: ', data);

        const response = await fetch(`
            ${API_URL_CRM}/api/goods/category/${data.category}
        `);
        const goods = await response.json();
        console.log('goods: ', goods);

        createProduct(data);
        addToBasket(data, dataLS);
        renderCards(goods, data.category);
    } catch (err) {
        console.log(err);
    }
};

export const getProductsByCategory = async (renderCards) => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');

    if (!params.toString() || !category) return;

    try {
        const result = await fetch(`
            ${API_URL_CRM}/api/goods/category/${category}
        `);
        const data = await result.json();
        console.log('data: ', data);

        renderCards(data, category, '');
    } catch (err) {
        console.log(err);
    }
};

export const getCategories = async (createFooterCatalog, controlModalMenu) => {
    try {
        const result = await fetch(`${API_URL_CRM}/api/category`);
        const data = await result.json();
        const reversedData = data.reverse();

        createFooterCatalog(reversedData);
        controlModalMenu(reversedData);
    } catch (err) {
        console.log(err);
    }
};

export const getSearchProducts = async (renderCards) => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search');

    if (!params.toString() || !search) return;

    try {
        const result = await fetch(`${API_URL_CRM}/api/goods?search=${search}`);
        const data = await result.json();
        console.log('data: ', data);

        renderCards(data, '', search);
    } catch (err) {
        console.log(err);
    }
};
