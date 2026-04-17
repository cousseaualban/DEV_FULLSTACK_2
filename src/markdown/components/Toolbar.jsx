import importMarkdown from "../utils/importMarkdown";

export default function Toolbar({onAddFolder, onAddFile, setItems, selectedFolder }){

    return(
        <div className="flex justify-between mb-3">
            <div className="flex gap-2">
                <button className="bg-white hover:bg-gray-200 border py-2 px-4 rounded" onClick={onAddFolder}>Add Folder</button>
                <button className="bg-white hover:bg-gray-200 border py-2 px-4 rounded" onClick={onAddFile}>Add File</button>
            </div>
            <input
                type="file"
                accept=".md"
                hidden
                id="import-md"
                onChange={(e) => importMarkdown(e, setItems, selectedFolder)}
            />

            <label htmlFor="import-md" className="bg-purple-600 hover:bg-purple-700 border border-purple-500 text-white py-2 px-4 rounded" style={{ cursor: "pointer" }}>
                Import
            </label>
        </div>
    );

}