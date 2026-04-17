import { useState } from "react";
import exportMarkdown from "../actions/exportMarkdown";

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