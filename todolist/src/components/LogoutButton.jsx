import { useUserStore } from "../stores/userStore";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function LogoutButton({ className = "" }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

 return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className={`bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ${className}`}
      >
         🚪 Logout
      </button>

      {showConfirm && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow p-6 w-80 text-center">
            <p className="text-lg font-semibold mb-4">정말 로그아웃하시겠어요?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                확인
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}