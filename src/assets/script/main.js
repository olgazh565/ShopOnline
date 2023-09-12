import {controlArrows, controlPagination} from './modules/controls.js';
import {
    renderArticle,
    renderArticles,
    renderPagination,
} from './modules/renderElements.js';
import {getArticle, getArticles} from './modules/serviceAPI.js';

getArticles(renderArticles, renderPagination, controlPagination, controlArrows);
getArticle(renderArticle);
