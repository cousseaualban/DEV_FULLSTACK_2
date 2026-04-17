export default function addFile(setItems, selectedFolder) {
    const name = prompt("Nom du fichier :");

  if (!name) return;

  const newFile = {
    id: Date.now(),
    name,
    type: "file",
    parentId: selectedFolder ? selectedFolder.id : null,
    content: ""
  };

  setItems(prev => [...prev, newFile]);
}