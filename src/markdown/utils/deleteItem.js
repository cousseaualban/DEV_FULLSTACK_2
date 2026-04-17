export function deleteItem(setItems, itemId) {
  setItems(prev =>
    prev.filter(i => i.id !== itemId)
  );
}