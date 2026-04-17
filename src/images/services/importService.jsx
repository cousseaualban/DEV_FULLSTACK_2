export function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;

    reader.readAsText(file);
  });
}

export async function importImagesFromFile(file) {
  const text = await readFileAsText(file);

  const data = JSON.parse(text);

  // peut être une image OU un tableau
  return Array.isArray(data) ? data : [data];
}