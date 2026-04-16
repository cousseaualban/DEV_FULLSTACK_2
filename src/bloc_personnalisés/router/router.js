import { createBrowserRouter } from "react-router-dom";
import Blocs from "../components/Blocs/blocs";
import Bloc from "../components/Blocs/bloc";

const routes = [
  { path: '/', name: 'liste-bloc', Component: Blocs},
  { path: 'bloc', name: 'add-bloc', Component: Bloc},
  { path: 'bloc/:id', name: 'bloc', Component: Bloc}
];


const router = createBrowserRouter(routes);


export default router;
