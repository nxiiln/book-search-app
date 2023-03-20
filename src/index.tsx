import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import GlobalStyle from './styles/globalStyles';
import App from './components/App';


const root = document.createElement('div')
document.querySelector('body')?.append(root)

createRoot(root).render(
  <StrictMode>
    <GlobalStyle />
    <App />
  </StrictMode>
)
