export function downloadFile(content, filename) {
  const blob = new Blob([content], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}

// Export 1 image
export function exportImage(image) {
  const data = JSON.stringify(image, null, 2);

  downloadFile(data, `${image.name}.img.mdlc`);
}

// Export toutes les images
export function exportImages(images) {
  const data = JSON.stringify(images, null, 2);

  downloadFile(data, `images.imgs.mdlc`);
}