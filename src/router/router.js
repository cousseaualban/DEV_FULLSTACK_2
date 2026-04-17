import { createBrowserRouter } from "react-router-dom";
import Blocs from "../bloc_personnalises/components/Blocs/blocs";
import Bloc from "../bloc_personnalises/components/Blocs/bloc";
import ImageLibrary from "../images/ImageLibrary";
import header from "../components/header";
import Markdown from "../markdown/Markdown";
  
const routes = [
  { path: '/', Component: header, children: [
    { index: true, name: 'markdown', Component: Markdown},
    { path: 'blocs', name: 'liste-bloc', Component: Blocs},
    { path: 'bloc', name: 'add-bloc', Component: Bloc},
    { path: 'bloc/:id', name: 'bloc', Component: Bloc},
    { path: 'images', name: 'images', Component: ImageLibrary }
  ]}
  
];


const router = createBrowserRouter(routes);


export default router;
