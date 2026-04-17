import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveBloc } from "../../../store/slices/blocsSlice";
import Previsualisation from "../../../components/modals/previsualisation";
import ShortcutInput from "../ShortCut";

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Erreur de copie :", err);
  }
}

function Bloc () {
    const { id } = useParams();
    const blocs = useSelector((store) => store.blocs.list);
    const dispatch = useDispatch();

    const [bloc, setBloc] = useState(blocs.find(bloc => bloc.id === id) ?? { name: '', content: '', shortcut: '' });
    const [open, setOpen] = useState(false);

    const navigation = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(saveBloc(bloc));
        navigation('/blocs');
    };

    return (
        <form className="flex flex-col h-full overflow-hidden p-2" onSubmit={handleSubmit}>
            <div className="flex-shrink-0 flex gap-2 justify-end mb-2 flex-shrink-0">
                <button className="bg-white hover:bg-gray-200 border py-2 px-4 rounded" type="button" onClick={() => copyToClipboard(bloc?.content)}>
                    Copier
                </button>
                <button className="bg-white hover:bg-gray-200 border py-2 px-4 rounded" type="button" onClick={() => setOpen(true)}>
                    Prévisualisation
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 border border-purple-500 text-white py-2 px-4 rounded " type="submit">
                    Enregistrer
                </button>
            </div>
            <div className="flex flex-col flex-1 overflow-hidden gap-2">
                <div className="flex gap-2">
                    <input placeholder="Nom" className="border border-black rounded px-2 py-1 flex-shrink-0" type="text" name="name" value={bloc?.name} onChange={(e) => setBloc({...bloc, name: e.target.value})} />
                    <ShortcutInput value={bloc?.shortcut} onChange={(e) => setBloc({...bloc, shortcut: e})} />
                </div>
                <textarea placeholder="Contenu" className="flex-1 overflow-auto rounded border border-black px-2 py-1" name="content" value={bloc?.content} onChange={(e) => setBloc({...bloc, content: e.target.value})}></textarea>
            </div>
            <Previsualisation open={open} onClose={() => setOpen(false)} text={bloc?.content} title="Prévisualisation du bloc"/>
        </form>
    )
}
export default Bloc;