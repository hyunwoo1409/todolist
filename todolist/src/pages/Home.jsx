import { useTodoStore } from "../stores/todoStore";
import { useUserStore } from "../stores/userStore";
import InputWithAdd from "../components/InputWithAdd"; 
import LogoutButton from "../components/LogoutButton";
import ExpandableList from "../components/ExpandableList";
import { Link } from "react-router-dom";

export default function Home() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodoStore();
  const { nickname, money} = useUserStore();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-3xl p-6 bg-white shadow rounded">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h1 className="text-2xl font-bold">
            👨‍💻{nickname}'s <span className="inline-block">Todolist</span>
          </h1>

          {/* 상단 버튼 */}
          <div className="flex gap-2">
            <Link to="/wishlist" className="bg-blue-500 text-white px-3 py-1 rounded">📝 Wishlist</Link>
            <Link to="/mypage" className="bg-purple-500 text-white px-3 py-1 rounded">👨‍💻 MyPage</Link>
            <LogoutButton />
          </div>
        </div>

        <p className="text-gray-600 mb-4">📈 Money: {money}원</p>

        {/* 할 일 추가 components */}
        <InputWithAdd
          onAdd={(text, reward) => addTodo(text, reward)}
          label="할 일 추가"
        />

        {/* todolist */}
        <ExpandableList
          items={todos}
          maxVisible={8}
          emptyMessage="할 일이 없습니다."
          renderItem={(todo) => (
            <div
              className={`flex justify-between items-center p-2 rounded border transition ${
                todo.done ? "line-through bg-gray-200" : "bg-white hover:bg-gray-50"
              }`}
            >
              <span className="cursor-pointer flex-1" onClick={() => toggleTodo(todo.id)}>
                {todo.text}{" "}
                <span className="text-sm text-green-600">💰{todo.reward}</span>
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
}