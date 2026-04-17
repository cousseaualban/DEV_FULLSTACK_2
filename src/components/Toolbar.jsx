export default function Toolbar({onAddFolder, onAddFile}){

    return(
        <div>
            <button onClick={onAddFolder}>Add Folder</button>
            <button onClick={onAddFile}>Add File</button>
        </div>
    );

}