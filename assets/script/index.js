// Считаем время до дедлайна

const getTimeRemaining = (deadline) => {
    const dateStop = new Date(deadline);

    // отображаем время UTC +3
    const stopHours = dateStop.getHours();
    const offsetHours = -(dateStop.getTimezoneOffset() / 60);
    const UTCHours = stopHours - offsetHours;
    dateStop.setHours(UTCHours + 3);

    const dateNow = Date.now();
    const timeLeft = dateStop - dateNow;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    return {
        timeLeft,
        days,
        hours,
        minutes,
        seconds,
    };
};

// Склонение дней, часов, минут, секунд

const declOfNum = (num, words) => words[
    (num % 100 > 4 && num % 100 < 20) ? 2 :
        [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]
];

// Добавляем 0 к одиночным цифрам часа, минут, секунд

const addZero = num => `0${num}`.slice(-2);

// Создаем верстку

const createTimer = (elem) => {
    elem.innerHTML = `
        <p class="timer__title">До конца акции:</p>
        <div class="timer__items">
            <p class="timer__item timer__item_days">
                <span class="timer__count timer__count_days"></span>
                <span class="timer__units timer__units_days"></span>
            </p>
            <p class="timer__item timer__item_hours">
                <span class="timer__count timer__count_hours"></span>
                <span class="timer__units timer__units_hours"></span>
            </p>
            <p class="timer__item timer__item_minutes">
                <span class="timer__count timer__count_minutes"></span>
                <span class="timer__units timer__units_minutes"></span>
            </p>
            <p class="timer__item timer__item_seconds">
                <span class="timer__count timer__count_seconds"></span>
                <span class="timer__units timer__units_seconds"></span>
            </p>
        `;
};

// функционал таймера

const timer = (deadline, elem) => {
    const timerItemDays = document.querySelector('.timer__item_days');
    const timerItemSeconds = document.querySelector('.timer__item_seconds');

    const timerCountDays = document.querySelector('.timer__count_days');
    const timerCountHours = document.querySelector('.timer__count_hours');
    const timerCountMinutes = document.querySelector('.timer__count_minutes');
    const timerCountSeconds = document.querySelector('.timer__count_seconds');

    const timerUnitsDays = document.querySelector('.timer__units_days');
    const timerUnitsHours = document.querySelector('.timer__units_hours');
    const timerUnitsMinutes = document.querySelector('.timer__units_minutes');
    const timerUnitsSeconds = document.querySelector('.timer__units_seconds');

    const startClock = () => {
        const {
            timeLeft,
            days,
            hours,
            minutes,
            seconds,
        } = getTimeRemaining(deadline);

        // отображаем значения таймера на странице

        timerCountDays.textContent = days;
        timerCountHours.textContent = addZero(hours);
        timerCountMinutes.textContent = addZero(minutes);
        timerCountSeconds.textContent = addZero(seconds);

        // отображение подписей таймера в нужном падеже

        timerUnitsDays.textContent = declOfNum(days, ['день', 'дня', 'дней']);
        timerUnitsHours.textContent = declOfNum(
                hours, ['час', 'часа', 'часов']);
        timerUnitsMinutes.textContent = declOfNum(
                minutes, ['минута', 'минуты', 'минут']);
        timerUnitsSeconds.textContent = declOfNum(
                seconds, ['секунда', 'секунды', 'секунд']);

        // вызываем функцию каждую секунду

        const timerId = setTimeout(startClock, 1000);

        // меняем внешний вид счетчика, когда остается меньше 24 часов

        if (days === 0) {
            timerItemDays.style.display = 'none';
            timerItemSeconds.style.display = 'flex';
        } else {
            timerItemSeconds.style.display = 'none';
            timerItemDays.style.display = 'flex';
        }

        // останавливаем счетчик и удаляем таймер со страницы

        if (timeLeft <= 0) {
            clearTimeout(timerId);
            elem.innerHTML = '';
        }
    };
    startClock();
};

// запускаем плагин

const findTimer = () => {
    const dataTimer = document.querySelectorAll('[data-timer-deadline]');

    dataTimer.forEach((elem) => {
        const deadline = elem.dataset.timerDeadline;
        createTimer(elem);
        timer(deadline, elem);
    });
};

findTimer();
