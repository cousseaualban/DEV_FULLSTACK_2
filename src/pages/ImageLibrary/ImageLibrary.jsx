import { useDispatch, useSelector } from "react-redux";
import { selectImages } from "../../features/images/utils/selectors";
import ImageUploader from "../../features/images/components/ImageUploader";
import ImageCard from "../../features/images/components/ImageCard";
import { exportImages } from "../../features/images/services/exportService";
import { importImagesFromFile } from "../../features/images/services/importService";
import { addImage } from "../../features/images/imagesSlice";

export default function ImageLibrary() {
  const dispatch = useDispatch();
  const images = useSelector(selectImages);

  const styles = {
    grid: {
      marginTop: 20,
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: 16,
    },
    importButton: {
      display: "inline-block",
      marginLeft: 10,
      marginTop: 10,
      padding: "8px 12px",
      background: "#1976d2",
      color: "white",
      borderRadius: 6,
      cursor: "pointer",
    },
  };

  const handleExportAll = () => {
    exportImages(images);
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const importedImages = await importImagesFromFile(file);

    importedImages.forEach((img) => {
      dispatch(addImage(img));
    });
  };

  console.log(images);

  return (
    <div>
      <h1>Bibliothèque d'images</h1>
      
      <ImageUploader />

      <div style={styles.grid}>
        {images.map((img) => (
          <ImageCard key={img.id} image={img} />
        ))}
      </div>
      <button onClick={handleExportAll}>
        Exporter bibliothèque
      </button>
      <label style={styles.importButton}>
        Importer fichier(s)

        <input
          type="file"
          accept=".img.mdlc,.imgs.mdlc"
          onChange={handleImport}
          hidden
        />
      </label>
    </div>
  );
}