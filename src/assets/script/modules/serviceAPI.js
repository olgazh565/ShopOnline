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

    try {
        const result = await fetch(`${API_URL}/posts?page=${pageNum}`);
        console.log('result: ', result);
        const {data, meta: {pagination}} = await result.json();

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

    if (!params.toString() || params.has('page')) return;

    const articleId = params.get('id');

    try {
        const result = await fetch(`${API_URL}/posts/${articleId}`);
        const {data} = await result.json();

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
