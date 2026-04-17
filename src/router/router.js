import { createBrowserRouter } from "react-router-dom";
import Blocs from "../bloc_personnalisés/components/Blocs/Blocs";
import Bloc from "../bloc_personnalisés/components/Blocs/bloc";
import ImageLibrary from "../pages/ImageLibrary/ImageLibrary";
  
const routes = [
  { path: '/', name: 'liste-bloc', Component: Blocs},
  { path: 'bloc', name: 'add-bloc', Component: Bloc},
  { path: 'bloc/:id', name: 'bloc', Component: Bloc},
  { path: 'images', name: 'images', Component: ImageLibrary }
];


const router = createBrowserRouter(routes);


export default router;
