import { useEffect, useState } from "react";
import addFile from "./utils/addFile";
import addFolder from "./utils/addFolder";
import Toolbar from "./components/Toolbar";
import Arborescence from "./components/Arborescence/Arborescence";
import MarkdownEditor from "./components/MarkdownEditor";
import Previsualisation from "../components/modals/previsualisation";

function Markdown() {
    const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("items");
        return saved ? JSON.parse(saved) : [];
    });

    const [selectedFolder, setSelectedFolder] = useState(null);

    const [selectedFile, setSelectedFile] = useState(null);

    const [selectedItem, setSelectedItem] = useState(null);
    const [contextMenu, setContextMenu] = useState(null);

    const [previewOpen, setPreviewOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items));
    }, [items]);

    return(
    <div className="p-2 h-full overflow-hidden flex flex-col gap-2">
        <Toolbar
            onAddFolder={() => addFolder({ setItems, selectedFolder })}
            onAddFile={() => addFile(setItems, selectedFolder)}
            setItems={setItems}
            selectedFolder={selectedFolder}
        />

        <Arborescence
            items={items}
            setItems={setItems}

            selectedFolder={selectedFolder}
            setSelectedFolder={setSelectedFolder}

            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}

            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}

            contextMenu={contextMenu}
            setContextMenu={setContextMenu}
        />
        <div className="flex-1 overflow-hidden">
            <MarkdownEditor
                selectedFile={selectedFile}
                setItems={setItems}
                setSelectedFile={setSelectedFile}
                setPreviewOpen={setPreviewOpen}
            />
        </div>

        <Previsualisation
            open={previewOpen}
            onClose={() => setPreviewOpen(false)}
            text={selectedFile?.content}
            title="Prévisualisation du fichier"
        />
      </div>
    )
}

export default Markdown;