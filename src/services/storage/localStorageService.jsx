const STORAGE_KEY = "mdlc_images_library";

export function saveImages(images) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
  } catch (error) {
    console.warn("localStorage plein — images non sauvegardées", error);
  }
}

export function loadImages() {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return [];

  try {
    return JSON.parse(data);
  } catch (error) {
    console.error("Erreur lecture localStorage", error);
    return [];
  }
}

export function clearImages() {
  localStorage.removeItem(STORAGE_KEY);
}