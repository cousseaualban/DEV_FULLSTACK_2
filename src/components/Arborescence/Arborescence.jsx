import Item from "./Item";
import ContextMenu from "./ContextMenu";
import { getChildren } from "./arborescenceUtils";

export default function Arborescence({
  items,
  setItems,
  setSelectedFolder,
  selectedFolder,
  contextMenu,
  setContextMenu,
  setSelectedFile,
  selectedItem,    
  setSelectedItem 
  
}) {
  const rootItems = getChildren(items, null);

  return (
    <div
      onDragOver={(e) => e.preventDefault()}

      onDrop={(e) => {
        e.preventDefault();

        const draggedId = Number(e.dataTransfer.getData("dragId"));

        if (!draggedId) return;

        setItems(prev =>
          prev.map(i =>
            i.id === draggedId
              ? { ...i, parentId: null }
              : i
          )
        );
      }}
    >
      {rootItems.map(item => (
        <Item
          key={item.id}
          item={item}
          items={items}
          setItems={setItems}
          setSelectedFolder={setSelectedFolder}
          selectedFolder={selectedFolder}
          setSelectedFile={setSelectedFile}
          setContextMenu={setContextMenu}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      ))}

      <ContextMenu
        contextMenu={contextMenu}
        setContextMenu={setContextMenu}
        setItems={setItems}
      />
    </div>
  );
}