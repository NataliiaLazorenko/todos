import { useState } from "react";
import PropTypes from "prop-types";

// Створюємо кастомний хук
function useInputValue(defaultValue = "") {
  const [value, setValue] = useState(defaultValue);

  // Із хука повертаємо об'єкт, що містить ключі, які необхідні для input
  return {
    bind: { value, onChange: (event) => setValue(event.target.value) },
    clear: () => setValue(""), // функція для очищення input
    value: () => value, // функція для отримання value
  };
}

function AddTodo({ onCreate }) {
  // const [value, setValue] = useState("");

  const input = useInputValue("");

  function submitHandler(event) {
    event.preventDefault();

    // 1. Використовуємо хуки з react
    // // Метод trim видаляє зайві пробіли
    // if (value.trim()) {
    //   onCreate(value);
    //   setValue("");
    // }

    // 2. Використовуємо кастомний хук
    if (input.value().trim()) {
      onCreate(input.value());
      input.clear(); // очищуємо поле input
    }
  }

  return (
    <form style={{ marginBottom: "1rem" }} onSubmit={submitHandler}>
      {/* 1. Використовуємо хуки з react */}
      {/* <input value={value} onChange={(event) => setValue(event.target.value)} /> */}

      {/* 2. Використовуємо кастомний хук. spread-оператор помістить у input значення value та onChange */}
      <input {...input.bind} />
      <button type="submit">Add todo</button>
    </form>
  );
}

AddTodo.protoTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default AddTodo;
