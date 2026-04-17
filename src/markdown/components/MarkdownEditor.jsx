import { useEffect, useRef, useState } from "react";
import exportMarkdown from "../utils/exportMarkdown";
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

    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd =
        start + text.length;
    }, 0);
  }

  return (
    <div className="flex flex-col gap-5 h-full overflow-hidden">
      <div className="flex justify-between flex-shrink-0">
        <div className="text-xl">{selectedFile.name}.md</div>
        <div className="flex gap-2">
          <button className="bg-white hover:bg-gray-200 border py-2 px-4 rounded" onClick={() => setPreviewOpen(true)}>
              Prévisualiser
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 border border-purple-500 text-white py-2 px-4 rounded" onClick={() => exportMarkdown(selectedFile)}>
              Exporter
          </button>
        </div>
      </div>

      <textarea
        ref={textareaRef}
        value={selectedFile.content || ""}
        className="flex-1 overflow-auto rounded border border-black px-2 py-1"
        onChange={handleChange}
      />
    </div>
  );
}