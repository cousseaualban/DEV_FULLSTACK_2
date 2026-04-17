import { createImage } from "../models/image.model";

export function createImageFromBase64(base64, name) {
  return createImage({
    id: crypto.randomUUID(),
    name,
    base64,
  });
}