import { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'simple-display/dist/style.css';
import './assets/styles/global.scss';
import Cipher from './pages/cipher/cipher';
import Decipher from './pages/decipher/decipher';
import Home from './pages/home/home';

const router = createBrowserRouter(
  [
    {
      path: '/',
      Component: Home,
    },
    {
      path: '/cipher',
      Component: Cipher,
    },
    {
      path: '/decipher',
      Component: Decipher,
    },
  ],
  {
    basename: '/cryptanalysis-vigenere-ts',
  }
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Fragment>
    <RouterProvider router={router} />
  </Fragment>
);
