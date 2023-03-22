import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { store } from './store'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import GlobalStyle from './styles/globalStyles'
import { FontsImporter } from './styles/fonts'
import App from './components/App'


const root = document.createElement('div')
document.querySelector('body')?.append(root)

createRoot(root).render(
  <StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
    <GlobalStyle />
    <FontsImporter />
  </StrictMode>
)
