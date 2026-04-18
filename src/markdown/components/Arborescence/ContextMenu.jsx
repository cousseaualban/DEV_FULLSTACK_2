import { renameItem } from "../../utils/renameItem";
import { deleteItem } from "../../utils/deleteItem";

export default function ContextMenu({ contextMenu, setContextMenu, setItems }) {
  if (!contextMenu) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: contextMenu.y,
        left: contextMenu.x,
        background: "white",
        border: "1px solid #ccc",
        padding: "5px",
        zIndex: 1000,
        borderRadius: "6px"
      }}
    >
     
      <div
        style={{ padding: "6px", cursor: "pointer" }}
        onClick={() => {
          const newName = prompt(
            "Nouveau nom :",
            contextMenu.item.name
          );

          if (!newName) return;

          renameItem(setItems, contextMenu.item.id, newName);
          setContextMenu(null);
        }}
      >
        ✏️ Renommer
      </div>


      <div
        style={{ padding: "6px", cursor: "pointer", color: "red" }}
        onClick={() => {
          deleteItem(setItems, contextMenu.item.id);
          setContextMenu(null);
        }}
      >
        🗑 Supprimer
      </div>

   
      <div
        style={{ padding: "6px", cursor: "pointer" }}
        onClick={() => setContextMenu(null)}
      >
        Retour
      </div>
    </div>
  );
}