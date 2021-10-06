import { useState, useEffect, lazy, Suspense } from "react";
import TodoList from "./Todo/TodoList";
import Context from "./context";
import Loader from "./Loader";
import Modal from "./Modal/Modal";

const AddTodo = lazy(() => import("./Todo/AddTodo"));

// Запит на сервер потрібно зробити тоді, коли буде готове DOM-дерево. Щоб відслудкувати цей момент, використовуємо хук useEffect
function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Передаємо порожній масив залежностей, щоб функція відпрацювала лише один раз
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((response) => response.json())
      .then((todos) => {
        setTimeout(() => {
          setTodos(todos);
          setLoading(false);
        }, 2000);
      });
  }, []);

  /* Функція toggleTodos змінює властивість completed у елемента масиву todos
   * Оскільки масив todos передаємо із компонента App, функцію, яка змінює цей масив, також передаємо із App
   */
  function toggleTodo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }

        return todo;
      })
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function addTodo(title) {
    setTodos(
      todos.concat([
        {
          title,
          id: Date.now(),
          completed: false,
        },
      ])
    );
  }

  return (
    /* Щоб передавати функції крізь інші компоненти, обгортаємо весь шаблон у спеціальний компонент Context.Provider
     * Вказуємо властивість value, в яку передаємо об'єкт. В об'єкт можемо передавати що завгодно (state, функції тощо)
     * Ми передаємо об'єкт з ключем removeTodo і значенням removeTodo (оскільки назви співпадають, використовуємо short hand)
     */
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1>React tutorial</h1>
        <Modal />

        <Suspense fallback={<Loader />}>
          <AddTodo onCreate={addTodo} />
        </Suspense>

        {loading && <Loader />}
        {todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo} />
        ) : loading ? null : (
          <p>No todos!</p>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
