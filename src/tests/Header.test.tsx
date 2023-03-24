import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../store'
import Header from '../components/Header'


it('Header', (): void => {
  const {getByText, getByLabelText, getByDisplayValue, getByRole} = render(
    <HashRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </HashRouter>
  )

  getByText('Search Book 📚')

  getByLabelText('Categories')
  getByLabelText('Sorting by')

  getByDisplayValue('')
  getByDisplayValue('all')
  getByDisplayValue('relevance')

  expect(getByRole('button')).toHaveTextContent('Search 🔍')
})
