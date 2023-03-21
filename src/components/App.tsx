import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import BookDetail from './BookDetail';


const App = (): JSX.Element => (
  <>
    <Header />
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/:id' element={<BookDetail />} />
    </Routes>
  </>
)


export default App
