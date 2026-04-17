import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteBloc, saveBloc } from "../../store/slices/blocsSlice";
import { useState } from "react";
import Previsualisation from "../modals/previsualisation";
import { exportBloc } from "../../utils/exportBloc";
import { importBloc } from "../../utils/importBloc";

function Blocs () {
    const blocs = useSelector((store) => (store.blocs.list));

    const navigation = useNavigate()
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false);
    const [blocContent, setBlocContent] = useState('');

    function openModal(content) {
        setBlocContent(content);
        setOpen(true);
    }

    function handleImport (e) {
        const file = e.target.files[0];
        if (!file) return;

        file.text().then(content => {
            dispatch(saveBloc(importBloc(content)));
        })
    }

    return (
        <>
            <h1>Liste des blocs</h1>
            <hr />
            <button onClick={() => navigation('/bloc')}>Ajouter</button>
            <label>
                Importer
                <input type='file' accept=".part.mdlc, .parts.mdlc" hidden onChange={handleImport} />
            </label>
            <button onClick={() => navigation('/images')}>Accéder à la bibliothèque d'images</button>
            { blocs.map(bloc => (
                <div key={bloc.id}>
                    <Link to={`bloc/${bloc.id}`}>{bloc.name}</Link>
                    <button onClick={() => dispatch(deleteBloc(bloc.id))}>Supprimer</button>
                    <button type="button" onClick={() =>openModal(bloc.content)}>Prévisualisation</button>
                    <button type="button" onClick={() => exportBloc(bloc?.content, bloc?.name)}>Exporté</button>
                    <br />
                </div>
            )) }
            <Previsualisation open={open} onClose={() => setOpen(false)} text={blocContent} />
        </>
    )
}
export default Blocs;