import { useDispatch } from "react-redux";
import { deleteImage, renameImage } from "../imagesSlice";
import { exportImage } from "../services/exportService";

export default function ImageCard({ image }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteImage(image.id));
  };

  const handleExport = () => {
    exportImage(image);
  };


  const handleRename = () => {
    const newName = prompt("Nouveau nom ?", image.name);

    if (!newName) return;

    dispatch(
      renameImage({
        id: image.id,
        name: newName,
      })
    );
  };

  return (
    <div style={styles.card}>
      <img src={image.base64} alt={image.name} style={styles.image} />

      <p>{image.name}</p>

      <div>
        <button onClick={handleRename}>✏️</button>
        <button onClick={handleDelete}>🗑️</button>
        <button onClick={handleExport}>⬇️</button>
        <button>📎 Utiliser</button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: 10,
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: 120,
    objectFit: "cover",
  },
};