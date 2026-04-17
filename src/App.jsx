import Toolbar from "./components/Toolbar";
import addFolder from "./actions/addFolder.js";
import addFile from "./actions/addFile.js";
import { useState, useEffect } from "react";
import Arborescence from "./components/Arborescence/Arborescence";
import MarkdownEditor from "./components/MarkdownEditor";
import Previsualisation from "./components/modals/Previsualisation";


function App() {
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
  return (

    <div>
  
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
      <MarkdownEditor
        selectedFile={selectedFile}
        setItems={setItems}
        setSelectedFile={setSelectedFile}
        setPreviewOpen={setPreviewOpen}
      />

      <Previsualisation
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        text={selectedFile?.content}
      />


    </div>
  );
}

export default App;