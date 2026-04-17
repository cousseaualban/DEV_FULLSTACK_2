import importMarkdown from "../actions/importMarkdown";

export default function Toolbar({onAddFolder, onAddFile, setItems, selectedFolder }){

    return(
        <div>
            <button onClick={onAddFolder}>Add Folder</button>
            <button onClick={onAddFile}>Add File</button>

            <input
                type="file"
                accept=".md"
                style={{ display: "none" }}
                id="import-md"
                onChange={(e) => importMarkdown(e, setItems, selectedFolder)}
            />

            <label htmlFor="import-md" style={{ cursor: "pointer" }}>
                📥 Import .md
            </label>
        </div>
    );

}