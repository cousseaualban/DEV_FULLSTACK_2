export default function importMarkdown(event, setItems, selectedFolder) {
  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {
    const content = e.target.result;

    const newFile = {
      id: Date.now(),
      name: file.name.replace(".md", ""),
      type: "file",
      parentId: selectedFolder ? selectedFolder.id : null,
      content: content
    };

    setItems(prev => [...prev, newFile]);
  };

  reader.readAsText(file);
}