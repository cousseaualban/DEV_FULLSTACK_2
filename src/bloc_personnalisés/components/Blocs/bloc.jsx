import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveBloc } from "../../store/slices/blocsSlice";
import Previsualisation from "../modals/previsualisation";

function Bloc () {
    const { id } = useParams();
    const blocs = useSelector((store) => store.blocs.list);
    const dispatch = useDispatch();

    const [bloc, setBloc] = useState(blocs.find(bloc => bloc.id === id) ?? { name: '', content: '' });
    const [open, setOpen] = useState(false);

    const navigation = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(saveBloc(bloc));
        navigation('/');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={bloc?.name} onChange={(e) => setBloc({...bloc, name: e.target.value})} />
                <button type="submit">Enregistrer</button>
                <button type="button" onClick={() => setOpen(true)}>
                    Ouvrir la modal
                </button>
                <Previsualisation open={open} onClose={() => setOpen(false)} text={bloc?.content} />
                <br />
                <textarea style={{ width: '100%', height: '95vh' }} name="content" value={bloc?.content} onChange={(e) => setBloc({...bloc, content: e.target.value})}></textarea><br />
            </form>
        </div>
    )
}
export default Bloc;