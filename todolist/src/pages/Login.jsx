import { useState } from "react";
import { useNavigate } from "react-router";
import { useUserStore } from "../stores/userStore";

export default function Login() {
  const [inputName, setInputName] = useState("");
  const login = useUserStore((state) => state.login);
  const navigate = useNavigate();
  
  const handleLogin = () => {
    const name = inputName.trim();
    if (!name) return alert("닉네임을 입력하세요");
    login(name);
    navigate("/home"); 
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-100">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">🎮 LifeUp!</h1>
      <div className="w-full max-w-xs bg-white p-6 rounded shadow">
        <label className="block text-gray-700 mb-2">닉네임 입력</label>
        <input
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="ex) 초코맛 쿠루루"
          className="w-full px-4 py-2 border rounded mb-4 text-center focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          로그인
        </button>
      </div>
    </div>
  );
}