import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Approuter from '@/routes/Approuter';
import { ReduxStore } from '@/store';
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={ReduxStore}>
      <Approuter />
    </Provider>
  </StrictMode>,
);
