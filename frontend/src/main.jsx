import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { ShopContextProvider } from './Context/ShopContext.jsx';
import './index.css';
import { GoogleOAuthProvider } from "@react-oauth/google";


const clientId = "645305623294-m2gb7jo74jaa5oirkis3l2butt6602qk.apps.googleusercontent.com";

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={clientId}>
  <BrowserRouter>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </BrowserRouter>
  </GoogleOAuthProvider>
);
