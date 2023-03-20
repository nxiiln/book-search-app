import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import GlobalStyle from './styles/globalStyles';
import App from './components/App';


const body: HTMLBodyElement | null = document.querySelector('body')
body && createRoot(body).render(
  <StrictMode>
    <GlobalStyle />
    <App />
  </StrictMode>
)
