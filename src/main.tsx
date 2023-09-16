import ReactDOM from 'react-dom/client';
import Home from './pages/home/home';
import 'simple-display/dist/style.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Fragment } from 'react';
import './assets/styles/global.scss';
import Cipher from './pages/cipher/cipher';
import Decipher from './pages/decipher/decipher';

const router = createBrowserRouter([
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
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Fragment>
    <RouterProvider router={router} />
  </Fragment>
);
