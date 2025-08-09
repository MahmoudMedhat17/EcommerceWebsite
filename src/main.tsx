import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Approuter from '@/routes/Approuter';
import { ReduxStore } from '@/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { presistor } from '@/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={ReduxStore}>
      {/* Here we wrapping the persistStore around the App to be able to use Redux Persist functionalities */}
      <PersistGate loading={null} persistor={presistor}>
        <Approuter />
      </PersistGate>
    </Provider>
  </StrictMode>,
);
