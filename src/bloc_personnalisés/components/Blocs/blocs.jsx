import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteBloc, saveBloc } from "../../../store/slices/blocsSlice";
import { useState } from "react";
import Previsualisation from "../modals/previsualisation";
import { exportSelectedBlocs } from "../../utils/exportBloc";
import { importBloc } from "../../utils/importBloc";

function Blocs () {
    const blocs = useSelector((store) => (store.blocs.list));

    const navigation = useNavigate()
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false);
    const [blocContent, setBlocContent] = useState('');
    const [selected, setSelected] = useState([]);

    const toggleSelect = (id) => {
        setSelected((prev) =>
            prev.includes(id)
            ? prev.filter((i) => i !== id)
            : [...prev, id]
        );
    };

    function openModal(content) {
        setBlocContent(content);
        setOpen(true);
    }

    function handleImport (e) {
        const file = e.target.files[0];
        if (!file) return;

        file.text().then(content => {
            const blocImport = importBloc(file.name ,content)
            if (!blocImport) return;
            blocImport.forEach(bloc => {
                dispatch(saveBloc(bloc));
            });
        })
    }

    return (
        <>
            <div className="flex gap-2 p-2 justify-end">
                <button hidden={selected.length <= 0} onClick={()=> exportSelectedBlocs(selected, blocs)}>Export</button>
                <label className="bg-white hover:bg-gray-200 border py-2 px-4 rounded">
                    Importer
                    <input type='file' accept=".part.mdlc, .parts.mdlc" hidden onChange={handleImport} />
                </label>
                <button className="bg-purple-600 hover:bg-purple-700 border border-purple-500 text-white py-2 px-4 rounded" onClick={() => navigation('/bloc')}>Ajouter</button>
            </div>
            <table className="table-auto border-collapse border border-slate-400 w-full text-left">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nom du bloc</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { blocs.map(bloc => (
                        
                        <tr key={bloc.id}
                            className="cursor-pointer hover:bg-slate-100"
                            onClick={() => navigation(`/bloc/${bloc.id}`)}
                            >
                            <td onClick={(e) => e.stopPropagation()}>
                                <input
                                type="checkbox"
                                checked={selected.includes(bloc.id)}
                                onChange={() => toggleSelect(bloc.id)}
                                />
                            </td>
                            <td>{bloc.name}</td>

                            <td className="flex gap-4">
                                <button
                                    type="button"
                                    className="hover:text-blue-500 transition"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openModal(bloc.content);
                                    }}
                                >
                                    👁
                                </button>

                                <button
                                    type="button"
                                    className="hover:text-red-500 transition"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        dispatch(deleteBloc(bloc.id));
                                    }}
                                >
                                    🗑
                                </button>
                            </td>
                        </tr>
                        
                    )) }
                </tbody>
            </table>
            
            <Previsualisation open={open} onClose={() => setOpen(false)} text={blocContent} />
        </>
    )
}
export default Blocs;