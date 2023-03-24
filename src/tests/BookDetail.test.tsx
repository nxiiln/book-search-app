import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { HashRouter } from 'react-router-dom'
import BookDetail from '../components/BookDetail'


it('BookPreview', (): void => {
  const {getByText} = render(
    <HashRouter>
      <BookDetail />
    </HashRouter>
  )

  getByText('Something went wrong 🛸')
})
