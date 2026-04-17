import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import router from "./router/router";
import store from "./store/store";
import './index.css';


function App() {
  return (
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
  );
}

export default App;