import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { routes } from './routes';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>
);

