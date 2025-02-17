import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { ProductsProvider } from './context/products_context';
import { FilterProvider } from './context/filter_context';
import { CartProvider } from './context/cart_context';
import { UserProvider } from './context/user_context';
import { Auth0Provider } from '@auth0/auth0-react';

const authDomain = process.env.REACT_APP_AUTH_DOMAIN;
const authClientId = process.env.REACT_APP_AUTH_CLIENT_ID;

if (!authDomain || !authClientId) {
  throw new Error('Missing Auth0 environment variables');
}

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <Auth0Provider
      domain={authDomain}
      clientId={authClientId}
      redirectUri={window.location.origin}
      cacheLocation="localstorage"
    >
      <UserProvider>
        <ProductsProvider>
          <FilterProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </FilterProvider>
        </ProductsProvider>
      </UserProvider> 
    </Auth0Provider>
  );
} else {
  throw new Error('Root element not found');
}