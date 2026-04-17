import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveBloc } from "../../../store/slices/blocsSlice";
import Previsualisation from "../modals/previsualisation";
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
        navigation('/');
    };

    return (
        <form className="flex flex-col" onSubmit={handleSubmit}>
            <div>
            <button type="submit">Enregistrer</button>
            <button type="button" onClick={() => setOpen(true)}>
                Prévisualisation
            </button>
            <button type="button" onClick={() => copyToClipboard(bloc?.content)}>
                Copier
            </button>
            </div>
            <div className="flex flex-col">
                <div>
                    <input placeholder="Nom" className="border border-black px-2 py-1" type="text" name="name" value={bloc?.name} onChange={(e) => setBloc({...bloc, name: e.target.value})} />
                    <ShortcutInput value={bloc?.shortcut} onChange={(e) => setBloc({...bloc, shortcut: e})} />
                </div>
                <textarea placeholder="Contenu" className="border border-black px-2 py-1" name="content" value={bloc?.content} onChange={(e) => setBloc({...bloc, content: e.target.value})}></textarea>
            </div>
            <Previsualisation open={open} onClose={() => setOpen(false)} text={bloc?.content} />
        </form>
    )
}
export default Bloc;