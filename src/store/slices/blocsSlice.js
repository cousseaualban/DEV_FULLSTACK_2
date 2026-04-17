import { createSlice } from "@reduxjs/toolkit";

export const blocsSlice = createSlice({
    name: 'blocs',
    initialState: {
        list: [
            { id: crypto.randomUUID(), name: "Bloc 1", content: "Ceci est le contenu du bloc 1", shortcut: '' },
            { id: crypto.randomUUID(), name: "Bloc 2", content: "Ceci est le contenu du bloc 2", shortcut: '' }
        ]
    },
    reducers: {
        saveBloc: (state, {payload}) => {
            const index = state.list.findIndex(bloc => bloc.id === payload.id)
            if(index === -1) {
                state.list.push({...payload, id: crypto.randomUUID()})
            } else {
                state.list[index] = payload
            }
        },
        deleteBloc: (state, { payload }) => {
            const index = state.list.findIndex((bloc) => bloc.id === payload)
            state.list.splice(index, 1)
        }
    }
})

export const { saveBloc, getBloc, deleteBloc } = blocsSlice.actions
export default blocsSlice.reducer