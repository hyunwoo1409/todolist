import { useRef, useState } from "react";

export default function InputWithAdd({ onAdd, label = "", defaultReward = "" }) {
  const [text, setText] = useState("");
  const [reward, setReward] = useState(defaultReward);
  const [error, setError] = useState("");
  const textRef = useRef();
  const rewardRef = useRef();

  const handleAdd = () => {
    const trimmed = text.trim();
    const rewardValue = Number(reward);

    // 텍스트 비어있는 경우
    if (!trimmed) {
      setError("할 일을 입력해주세요!");
      setTimeout(() => setError(""), 2000);
      textRef.current?.focus();
      return;
    }

    // reward가 비어있는 경우
    if (!reward || isNaN(rewardValue) || rewardValue <= 0) {
      setError("보상 금액을 입력해주세요!");
      setTimeout(() => setError(""), 2000);
      rewardRef.current?.focus();
      return;
    }

    onAdd(trimmed, Number(reward)); 
    setText("");
    setReward(defaultReward);
    setError("");
    textRef.current?.focus();
  };

  /* 엔터 키 입력 */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className="mb-4">
      <label className="block mb-1 font-semibold">{label}</label>
      <div className="flex gap-2">
        <input
          ref={textRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-3 py-2 border rounded"
          placeholder="내용을 입력하세요"
        />
        <input
          ref={rewardRef}
          type="text"
          value={reward}
          onChange={(e) => setReward(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-24 px-3 py-2 border rounded"
          placeholder="Money"
        />
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 rounded hover:bg-green-600"
        >
          Add
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}