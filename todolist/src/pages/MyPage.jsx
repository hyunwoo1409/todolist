import { useUserStore } from "../stores/userStore";
import { useWishlistStore } from "../stores/wishlistStore";
import { useTodoStore } from "../stores/todoStore";
import LogoutButton from "../components/LogoutButton";
import ExpandableList from "../components/ExpandableList";
import ConfirmModal from "../components/ConfirmModal";
import { useState } from "react";

export default function MyPage() {
  const { nickname, money } = useUserStore();
  const { items, deleteItem } = useWishlistStore();
  const { todos, deleteTodo } = useTodoStore();
  const { moneyHistory } = useUserStore();

  const purchasedItems = items.filter((item) => item.purchased);
  const completedTodos = todos.filter((todo) => todo.done);

  const [modal, setModal] = useState(null); 

  const handleDeleteConfirm = () => {
    if (modal?.type === "wishlist") {
      deleteItem(modal.id);
    } else if (modal?.type === "todo") {
      deleteTodo(modal.id);
    }
    setModal(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 gap-6">
      <div className="w-[1000px] h-[700px] bg-white shadow-lg rounded-lg flex overflow-hidden">

        {/* 왼쪽 : 마이페이지 */}
        <div className="w-1/2 p-8 overflow-y-auto border-r border-gray-300/50">
          {/* 상단 */}
          <div className="flex justify-between items-center mb-6 border-b pb-2">
            <h1 className="text-2xl font-bold text-purple-700">👨‍💻 MyPage</h1>
            <div className="flex gap-2">
              <a href="/home" className="bg-gray-500 text-white px-3 py-1 rounded">🏠 Home</a>
              <a href="/wishlist" className="bg-blue-500 text-white px-3 py-1 rounded">📝 Wishlist</a>
              <LogoutButton />
            </div>
          </div>

          {/* 사용자 정보 */}
          <div className="bg-gray-100 rounded p-4 mb-6">
            <p><strong>닉네임:</strong> {nickname}</p>
            <p><strong>보유 머니:</strong> {money} 원</p>
          </div>

          {/* 🔥 구매한 위시리스트 */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">🔥 구매한 위시리스트</h2>
            <ExpandableList
              items={purchasedItems}
              maxVisible={3}
              emptyMessage="구매한 항목이 아직 없어요."
              renderItem={(item) => (
                <div className="bg-gray-100 rounded px-4 py-2 shadow flex justify-between items-center">
                  <span>
                    {item.name}{" "}
                    <span className="text-sm text-gray-500">({item.price}원)</span>
                  </span>
                  <button
                    onClick={() => setModal({ type: "wishlist", id: item.id })}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    X
                  </button>
                </div>
              )}
            />
          </div>

          {/* ✅ 완료한 할 일 */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">✅ 완료한 할 일</h2>
            <ExpandableList
              items={completedTodos}
              maxVisible={3}
              emptyMessage="아직 완료한 할 일이 없습니다."
              renderItem={(todo) => (
                <div className="bg-green-100 rounded px-4 py-2 shadow text-green-800 flex justify-between items-center">
                  <span>
                    {todo.text}{" "}
                    <span className="text-sm text-gray-500">(+{todo.reward}원)</span>
                  </span>
                  <button
                    onClick={() => setModal({ type: "todo", id: todo.id })}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    X
                  </button>
                </div>
              )}
            />
          </div>
        </div> {/* 마이페이지 종료 */}

        {/* 오른쪽 - money history */}
        <div className="w-1/2 p-8 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4 text-purple-700">💰 Money History</h2>
          <ExpandableList
            items={[...moneyHistory].reverse()}
            maxVisible={8}
            emptyMessage="머니 사용/획득 내역이 없습니다."
            renderItem={(log) => (
              <div className="bg-white border rounded px-4 py-2 shadow flex justify-between items-center">
                <div>
                  <p className="font-semibold">{log.description}</p>
                  <p className="text-sm text-gray-500">{log.date}</p>
                </div>
                <span
                  className={`text-sm font-bold ${
                    log.amount > 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {log.amount > 0 ? "+" : ""}
                  {log.amount}원
                </span>
              </div>
            )}
          />
        </div>

        
        

        {/* ✅ 공통 확인 모달 */}
        {modal && (
          <ConfirmModal
            message="정말 삭제하시겠습니까?"
            onConfirm={handleDeleteConfirm}
            onCancel={() => setModal(null)}
          />
        )}
      
      </div>
    </div>
  );
}