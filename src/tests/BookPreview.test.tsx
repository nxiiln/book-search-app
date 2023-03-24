import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../store'
import BookPreview from '../components/BookPreview'


const mockBookProps = {
  id: '',
   volumeInfo: {
    title: 'title',
    authors: ['author1', 'author2'],
    description: 'description',
    categories: ['categories1'],
  }
}


it('BookPreview', (): void => {
  const {getByText, getByAltText} = render(
    <HashRouter>
      <Provider store={store}>
        <BookPreview book={mockBookProps} />
      </Provider>
    </HashRouter>
  )

  getByAltText('book')
  getByText('title')
  getByText('author1, author2')
  getByText('categories1')
})
