export default function addFolder({ setItems, selectedFolder }) {

    const name = window.prompt("Nom du dossier");
    if (!name) return;

    const newFolder = {
        id: Date.now(),
        name,
        type: "folder",
        parentId: selectedFolder ? selectedFolder.id : null 
    };

    setItems(prevItems => [...prevItems, newFolder]);
}