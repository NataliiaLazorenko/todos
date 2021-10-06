// TodoItem - класовий компонент, щоб отримати доступ до контексту, використовуємо хук useContext
import { useContext } from "react";
import PropTypes from "prop-types";
import Context from "../context";

const styles = {
  li: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: ".5rem 1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: ".5rem",
  },
  input: {
    marginRight: "1rem",
  },
};

function TodoItem({ todo, index, onChange }) {
  /* В хук useContext передаємо Context, який підключили за допомогою Provider
   * Отримуємо об'єкт зі значенням value, яке передали. Витягуємо значення ключа removeTodo
   * Це функція, яка приймає id і видаляє todo
   */
  const { removeTodo } = useContext(Context);

  const classes = [];

  if (todo.completed) {
    classes.push("done");
  }

  return (
    <li style={styles.li}>
      {/* В атрибут className потрібно передавати рядок, тому застосовуємо метод join */}
      <span className={classes.join(" ")}>
        <input
          type="checkbox"
          checked={todo.completed}
          style={styles.input}
          onChange={() => onChange(todo.id)}
        />
        <strong>{index + 1}</strong>
        &nbsp; {/* символ пробілу */}
        {todo.title}
      </span>
      {/* В onClick не можемо передати виклик функції removeTodo(todo.id), оскільки вона буде відразу викликана, як тільки буде ініціалізована
          Всі todos будуть видалені. Щоб функція відразу не викликалася, можна передати її 2-ма способами:
          1. Як callback: () => removeTodo(todo.id)
          2. За допомогою методу bind повертаємо нову функцію (вона не буде викликатися). До функції прив'язуємо нульовий контекст: removeTodo.bind(null, todo.id)
          2-й метод по пам'яті мабуть більш продуктивний */}
      <button className="rm" onClick={removeTodo.bind(null, todo.id)}>
        &times; {/* &times - символ хрестика */}
      </button>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default TodoItem;
