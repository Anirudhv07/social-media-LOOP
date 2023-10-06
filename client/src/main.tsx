import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {Provider} from "react-redux"
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import store from "./redux/userRedux/store.ts";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from "./ErrorBoundary.tsx";
import ErrorPage from "./Components/Error/Error.tsx";



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
  

    <ThemeProvider>
      <ErrorBoundary fallback={<ErrorPage />}>
      <ToastContainer position="top-right" hideProgressBar={true} autoClose={2000}/>
      <App />
      </ErrorBoundary>
    </ThemeProvider>
    
    </Provider>
  </React.StrictMode>
);
