import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteBloc } from "../../store/slices/blocsSlice";
import { useState } from "react";

function Blocs () {
    const blocs = useSelector((store) => (store.blocs.list));

    const navigation = useNavigate()
    const dispatch = useDispatch()

    return (
        <>
            <h1>Liste des blocs</h1>
            <hr />
            <button onClick={() => navigation('/bloc')}>Ajouter</button>
            { blocs.map(bloc => (
                <div key={bloc.id}>
                    <Link to={`bloc/${bloc.id}`}>{bloc.name}</Link>
                    <button onClick={() => dispatch(deleteBloc(bloc.id))}>Supprimer</button>
                    <br />
                </div>
            )) }
        </>
    )
}
export default Blocs;