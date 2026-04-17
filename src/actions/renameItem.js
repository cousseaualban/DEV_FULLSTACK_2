export function renameItem(setItems, itemId, newName) {
  setItems(prev =>
    prev.map(i =>
      i.id === itemId
        ? { ...i, name: newName }
        : i
    )
  );
}