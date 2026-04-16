import { useDispatch } from "react-redux";
import { addImage } from "../imagesSlice";
import { createImageFromBase64 } from "../services/imageFactory";
import { fileToBase64 } from "../../../services/base64Converter";

export default function ImageUploader() {
  const dispatch = useDispatch();

  async function handleFile(file) {
    if (!file) return;

    const base64 = await fileToBase64(file);

    const image = createImageFromBase64(base64, file.name);

    dispatch(addImage(image));
  }

  function handleInputChange(e) {
    const file = e.target.files[0];
    handleFile(file);
  }

  function handleDrop(e) {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    handleFile(file);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

    return (
    <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
        border: "2px dashed gray",
        padding: "20px",
        marginBottom: "10px",
        }}
    >
        <p>Glisse une image ici ou utilise le bouton</p>

        <input type="file" accept="image/*" onChange={handleInputChange} />
    </div>
    );
}