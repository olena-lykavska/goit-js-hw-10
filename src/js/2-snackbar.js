// Імпортуємо бібліотеку iziToast і її стилі
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// Отримуємо елементи форми
const form = document.querySelector(".form");

// Додаємо обробник події на submit форми
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Запобігаємо стандартній поведінці форми

  // Отримуємо значення з полів форми
  const delayInput = form.elements.delay.value; // Затримка в мілісекундах
  const state = form.elements.state.value; // Стан промісу ("fulfilled" або "rejected")
  const delay = parseInt(delayInput, 10); // Перетворюємо затримку на число

  // Створюємо проміс
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      // В залежності від вибраного стану викликаємо resolve або reject
      if (state === "fulfilled") {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay); // Виконуємо затримку
  });

  // Обробляємо результат промісу
  promise
    .then((delay) => {
      // Якщо проміс виконався успішно
      iziToast.success({
        title: "Success", // Заголовок сповіщення
        message: `✅ Fulfilled promise in ${delay}ms`, // Повідомлення
      });
    })
    .catch((delay) => {
      // Якщо проміс був відхилений
      iziToast.error({
        title: "Error", // Заголовок сповіщення
        message: `❌ Rejected promise in ${delay}ms`, // Повідомлення
      });
    });
});
