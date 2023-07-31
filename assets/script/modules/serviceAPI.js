import {API_URL} from './const.js';

export const getArticles = async (
        renderArticles,
        renderPagination,
        controlPagination,
        controlArrows,
) => {
    const params = new URLSearchParams(window.location.search);

    if (params.has('id')) return;

    const pageNum = params.get('page') ? params.get('page') : 1;

    const result = await fetch(`${API_URL}/posts?page=${pageNum}`);
    const {data, meta: {pagination}} = await result.json();

    renderArticles(data);
    renderPagination(pagination);
    controlPagination(pagination);
    controlArrows(pagination);
};

export const getArticle = async (renderArticle) => {
    const params = new URLSearchParams(window.location.search);

    if (!params.toString() || params.has('page')) return;

    const articleId = params.get('id');

    const result = await fetch(`${API_URL}/posts/${articleId}`);
    const {data} = await result.json();

    renderArticle(data);
};

export const getUserName = async (userId) => {
    const result = await fetch(`${API_URL}/users/${userId}`);
    const {data} = await result.json();

    return data;
};
