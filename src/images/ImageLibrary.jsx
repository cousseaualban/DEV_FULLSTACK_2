import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectImages } from "./utils/selectors";
import ImageUploader from "./components/ImageUploader";
import ImageCard from "./components/ImageCard";
import { exportImages } from "./services/exportService";
import { importImagesFromFile } from "./services/importService";
import { addImage } from "../store/slices/imagesSlice";

export default function ImageLibrary() {
  const navigation = useNavigate()
  const dispatch = useDispatch();
  const images = useSelector(selectImages);

  const styles = {
    grid: {
      marginTop: 20,
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: 16,
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

      <div className="flex gap-2 pl-2">
        <button className="bg-white hover:bg-gray-200 border py-2 px-4 rounded" onClick={handleExportAll}>
          Exporter bibliothèque
        </button>
        <label className="bg-purple-600 hover:bg-purple-700 border border-purple-500 text-white py-2 px-4 rounded">
          Importer fichier(s)

          <input
            type="file"
            accept=".img.mdlc,.imgs.mdlc"
            onChange={handleImport}
            hidden
          />
        </label>
      </div>

      <div className="grid m-2 gap-4 [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]">
        {images.map((img) => (
          <ImageCard key={img.id} image={img} />
        ))}
      </div>
    </div>
  );
}