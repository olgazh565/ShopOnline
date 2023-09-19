import {findTimer} from './modules/timer.js';
import {
    controlArrows,
    controlModalMenu,
    controlPagination,
} from './modules/controls.js';
import {
    renderArticle,
    renderArticles,
    renderPagination,
} from './modules/renderElements.js';
import {getArticle, getArticles} from './modules/serviceAPI.js';

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
};

init();