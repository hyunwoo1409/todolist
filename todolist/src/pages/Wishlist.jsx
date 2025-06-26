import { useWishlistStore } from "../stores/wishlistStore";
import { useUserStore } from "../stores/userStore";
import InputWithAdd from "../components/InputWithAdd"; 

export default function Wishlist() {
  const { items, addItem, markAsPurchased, cancelPurchase, deleteItem } = useWishlistStore();
  const { money, gainMoney } = useUserStore();

  const handleBuy = (item) => {
  if (!item.purchased) {
      if (money < item.price) {
        alert("💸 돈이 부족해요! 퀘스트를 완료하고 모아보세요.");
        return;
      }
      gainMoney(-item.price);
      markAsPurchased(item.id);
    } else {
      gainMoney(item.price); 
      cancelPurchase(item.id);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-purple-700">📝 Wishlist</h1>

        <div className="flex gap-2">
          <a href="/home" className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">
            🏠 Home
          </a>
          <a href="/mypage" className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
            👨‍💻 MyPage
          </a>
        </div>
      </div>

      <p className="mb-4 text-gray-700">
        Money : <span className="font-semibold">{money}원</span>
      </p>

      <InputWithAdd
        onAdd={(name, price) => addItem(name, price)}
        label="하고 싶은 일 / 사고 싶은 것"
        defaultReward=""
      />

      {items.length === 0 ? (
        <p className="text-gray-500">위시리스트가 비어있습니다.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className={`rounded shadow p-4 flex flex-col justify-between ${
                item.purchased ? "bg-green-100" : "bg-white"
              }`}
            >
              <div>
                <h2 className="text-lg font-bold">{item.name}</h2>
                <p className="text-gray-600 mb-2">목표: {item.price}원</p>
              </div>

              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => handleBuy(item)}
                  className={`flex-1 px-4 py-2 rounded text-white ${
                    item.purchased
                      ? "bg-purple-500 hover:bg-purple-600"
                      : money >= item.price
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                  disabled={!item.purchased && money < item.price}
                >
                  {item.purchased ? "구매 취소" : money >= item.price ? "구매" : "돈 부족"}
                </button>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="px-3 py-2 text-red-500 hover:text-red-700"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}