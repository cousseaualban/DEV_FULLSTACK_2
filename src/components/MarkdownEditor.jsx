import { useEffect, useRef, useState } from "react";
import exportMarkdown from "../actions/exportMarkdown";
import { useSelector } from "react-redux";

export default function MarkdownEditor({
  selectedFile,
  setItems,
  setSelectedFile,
  setPreviewOpen   
}) {
  if (!selectedFile) return null;

  const handleChange = (e) => {
    const newContent = e.target.value;

    setItems(prev =>
      prev.map(i =>
        i.id === selectedFile.id
          ? { ...i, content: newContent }
          : i
      )
    );

    setSelectedFile(prev => ({
      ...prev,
      content: newContent
    }));
  };

  const textareaRef = useRef();

  const blocs = useSelector((store) => store.blocs.list);

  useEffect(() => {
    function handleKeyDown(e) {
      const keys = [];

      if (e.ctrlKey) keys.push("ctrl");
      if (e.shiftKey) keys.push("shift");
      if (e.altKey) keys.push("alt");

      keys.push(e.key.toLowerCase());

      const combo = keys.join("+");

      const bloc = blocs.find(b => b.shortcut === combo);

      if (bloc && textareaRef.current) {
        e.preventDefault();
        insertTextAtCursor(textareaRef.current, bloc.content);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [blocs]);

  function insertTextAtCursor(textarea, text) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const newValue =
      textarea.value.substring(0, start) +
      text +
      textarea.value.substring(end);

    // 🔥 update React state
    setItems(prev =>
      prev.map(i =>
        i.id === selectedFile.id
          ? { ...i, content: newValue }
          : i
      )
    );

    setSelectedFile(prev => ({
      ...prev,
      content: newValue
    }));

    // reposition curseur après render
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd =
        start + text.length;
    }, 0);
  }

  return (
    <div style={{ marginTop: "20px" }}>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>📄 {selectedFile.name}.md</h3>
        <button onClick={() => exportMarkdown(selectedFile)}>
            📤 Exporter .md
        </button>
        <button onClick={() => setPreviewOpen(true)}>
            Prévisualiser
        </button>
        
      </div>

      <textarea
        ref={textareaRef}
        style={{
          width: "98%",
          height: "300px",
          marginTop: "10px",
          padding: "10px"
        }}
        value={selectedFile.content || ""}
        onChange={handleChange}
      />
    </div>
  );
}