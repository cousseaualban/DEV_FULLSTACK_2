import Toolbar from "./components/Toolbar";
import addFolder from "./actions/addFolder.js";
import addFile from "./actions/addFile.js";
import { useState } from "react";
import Arborescence from "./components/Arborescence/Arborescence";

function App() {
  const [items, setItems] = useState([]);

  const [selectedFolder, setSelectedFolder] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const [selectedItem, setSelectedItem] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);

  return (

    <div>
  
      <Toolbar 
        onAddFolder={() => addFolder({ setItems, selectedFolder })}
        onAddFile={() => addFile(setItems, selectedFolder)}
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

    </div>
  );
}

export default App;