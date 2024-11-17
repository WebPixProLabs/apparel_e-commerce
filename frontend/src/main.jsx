import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { ShopContextProvider } from './Context/ShopContext.jsx';
import './index.css';


createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={clientId}>
  <BrowserRouter>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </BrowserRouter>
  </GoogleOAuthProvider>
);
