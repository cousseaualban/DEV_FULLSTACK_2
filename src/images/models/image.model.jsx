export function createImage({
  id,
  name,
  base64,
  createdAt = Date.now(),
}) {
  return {
    id,
    name,
    base64,
    createdAt,
  };
}