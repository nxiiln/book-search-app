import { Routes, Route } from 'react-router-dom'
import Header from './Header'
import BookList from './BookList'
import BookDetail from './BookDetail'


const App = (): JSX.Element => (
  <>
    <Header />
    <Routes>
      <Route path='/' element={<BookList />} />
      <Route path='/:id' element={<BookDetail />} />
    </Routes>
  </>
)


export default App
