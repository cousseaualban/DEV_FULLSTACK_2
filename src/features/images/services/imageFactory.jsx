import { createImage } from "../models/image.model";
import { generateId } from "../utils/generateId";

export function createImageFromBase64(base64, name) {
  return createImage({
    id: generateId(),
    name,
    base64,
  });
}