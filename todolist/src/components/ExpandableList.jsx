import { useState } from "react";

export default function ExpandableList({
  items = [],
  maxVisible = 3,
  renderItem,
  emptyMessage = "항목이 없습니다.",
}) {
  const [showAll, setShowAll] = useState(false);

  const visibleItems = showAll ? items : items.slice(0, maxVisible);

  if (items.length === 0) {
    return <p className="text-gray-500">{emptyMessage}</p>;
  }

  return (
    <>
      <ul className="space-y-2">
        {visibleItems.map((item, idx) => (
          <li key={item.id ?? idx}>{renderItem(item)}</li>
        ))}
      </ul>

      {items.length > maxVisible && (
        <div className="text-center mt-2">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-500 hover:underline text-sm"
          >
            {showAll ? "접기 ▲" : "더 보기 ▼"}
          </button>
        </div>
      )}
    </>
  );
}