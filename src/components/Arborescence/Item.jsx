import { getChildren, isDescendant } from "./arborescenceUtils";

export default function Item({
  item,
  items,
  setItems,
  setSelectedFolder,
  setSelectedFile,
  selectedItem,
  setSelectedItem,
  setContextMenu
}) {
  const children = getChildren(items, item.id);

  const isSelected = selectedItem?.id === item.id;

  return (
    <div style={{ marginLeft: 20 }}>

      <div
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData("dragId", item.id);
          e.dataTransfer.setData("dragType", item.type);
        }}

        onDragOver={(e) => e.preventDefault()}

        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();

          const draggedId = Number(e.dataTransfer.getData("dragId"));

          if (!draggedId) return;
          if (draggedId === item.id) return;
          if (item.type === "file") return;
          if (isDescendant(items, item.id, draggedId)) return;

          setItems(prev =>
            prev.map(i =>
              i.id === draggedId
                ? { ...i, parentId: item.id }
                : i
            )
          );
        }}

        onClick={() => {
  
          if (selectedItem?.id === item.id) {
            setSelectedItem(null);
            setSelectedFolder(null);
            setSelectedFile(null);
            return;
          }
          setSelectedItem(item);

          if (item.type === "file") {
            setSelectedFile(item);
            setSelectedFolder(null);
          }

          if (item.type === "folder") {
            setSelectedFolder(item);
            setSelectedFile(null);
          }
        }}

        onDoubleClick={() => {
          if (item.type === "file") {
            setSelectedFile(item);
          }
        }}

        onContextMenu={(e) => {
          e.preventDefault();

          setContextMenu({
            x: e.clientX,
            y: e.clientY,
            item
          });
        }}

        style={{
          cursor: "pointer",
          width: "fit-content",
          padding: "6px",
          borderRadius: "4px",
          backgroundColor: isSelected ? "#f0f0f0" : "transparent"
        }}
      >
        {item.type === "folder" ? "📁" : "📄"} {item.name}
      </div>

      {children.map(child => (
        <Item
          key={child.id}
          item={child}
          items={items}
          setItems={setItems}
          setSelectedFolder={setSelectedFolder}
          setSelectedFile={setSelectedFile}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          setContextMenu={setContextMenu}
        />
      ))}
    </div>
  );
}