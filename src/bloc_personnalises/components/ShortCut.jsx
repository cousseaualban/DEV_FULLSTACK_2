import { useState } from "react";

// Fait avec chatgpt car je n'avais aucune idée de comment faire - Sam
function ShortcutInput({ value, onChange }) {
  const [display, setDisplay] = useState(value || "");

  function handleKeyDown(e) {
    e.preventDefault();

    const keys = [];

    if (e.ctrlKey) keys.push("ctrl");
    if (e.shiftKey) keys.push("shift");
    if (e.altKey) keys.push("alt");

    const key = e.key.toLowerCase();

    if (!["control", "shift", "alt"].includes(key)) {
      keys.push(key);
    }

    const combo = keys.join("+");

    setDisplay(combo);
    onChange(combo);
  }

  return (
    <input
      type="text"
      value={display}
      placeholder="Appuie pour entrer un raccourci"
      onKeyDown={handleKeyDown}
      readOnly
      className="border border-black px-2 py-1 rounded w-80"
    />
  );
}

export default ShortcutInput