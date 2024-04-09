// script.js

document.addEventListener("DOMContentLoaded", function() {
    // Отображаем загрузчик с процентами
    var loaderWrapper = document.querySelector(".loader-wrapper");
    loaderWrapper.style.display = "flex"; // Отображаем элемент
    var loaderText = document.querySelector("#loaderText");
    var percentage = 0;

    // Симулируем процесс загрузки с интервалом
    var loadingInterval = setInterval(function() {
        percentage += Math.random() * 5; // Увеличиваем процент случайным образом
        if (percentage >= 100) {
            clearInterval(loadingInterval); // Останавливаем интервал, когда достигнут 100%
            loaderWrapper.style.display = "none"; // Скрываем загрузчик
        }
        loaderText.textContent =+ Math.round(percentage) + "%"; // Обновляем текст загрузки
    }, 100); // Интервал обновления загрузки (в миллисекундах)
});
