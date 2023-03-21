import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { store } from './store';
import { Provider } from 'react-redux';
import GlobalStyle from './styles/globalStyles';
import App from './components/App';


const root = document.createElement('div')
document.querySelector('body')?.append(root)

createRoot(root).render(
  <StrictMode>
    <GlobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
