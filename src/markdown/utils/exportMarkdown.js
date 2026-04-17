export default function exportMarkdown(file) {
  if (!file) return;

  const blob = new Blob([file.content || ""], {
    type: "text/markdown;charset=utf-8"
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${file.name || "file"}.md`;

  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}