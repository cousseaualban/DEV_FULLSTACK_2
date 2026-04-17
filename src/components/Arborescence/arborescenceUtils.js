export function getChildren(items, parentId) {
  return items.filter(i => i.parentId === parentId);
}

export function isDescendant(items, targetId, draggedId) {
  let current = items.find(i => i.id === targetId);

  while (current) {
    if (current.parentId === draggedId) return true;
    current = items.find(i => i.id === current.parentId);
  }

  return false;
}