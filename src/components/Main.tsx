import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { URL_IMG_BASE, IMG_ZOOM, MAX_RESULTS } from '../constants'
import { useAppDispatch, useAppSelector } from '../redux-hooks'
import { fetchBooks } from '../slices/books'
import { setStartIndex } from '../slices/query'
import Button from './Button'
import Text from './Text'


const MainWrapper = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`

const SearchStatus = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: start;
`

const Page = styled.section`
  width: 250px;
  height: 350px;
  margin: 0 10px 40px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background: var(--color-fade);
  cursor: pointer;
  transition: all ease-out 0.2s;

  &:hover {
    transform: scale(1.07);
  }
`

const LoadMoreGroup = styled.div`
  width: 100%;
  height: 60px;
  margin: 20px 0 60px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`


const Main = (): JSX.Element => {
  const {items, totalItems, loadingStatus} = useAppSelector(state => state.books)
  const {startIndex, baseQuery} = useAppSelector(state => state.query)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLoadMore = (): void => {
    dispatch(
      fetchBooks(
        `${baseQuery}&startIndex=${startIndex}&maxResults=${MAX_RESULTS}`
      )
    )
    dispatch(setStartIndex())
  }

  const renderLoadMoreGroup = (): JSX.Element => {
    if (totalItems > 0 && loadingStatus === 'loading') {
      return <Text>Loading... 🚀</Text>
    }

    if (totalItems > 0 && loadingStatus === 'error') {
      return (
        <>
          <Button width='150px' onClick={handleLoadMore}>
            Load more 📚
          </Button>
          <Text>Something went wrong 🛸</Text>
        </>
      )
    }

    if (totalItems > 0) {
      return (
        <Button width='150px' onClick={handleLoadMore}>
          Load more 📚
        </Button>
      )
    }

    return <></>
  }


  return (
    <MainWrapper>
      <SearchStatus>
        <Text>
          {
            totalItems === 0 && loadingStatus === 'loading' ? 'Loading... 🚀' :
            totalItems === 0 && loadingStatus === 'error' ? 'Something went wrong 🛸' :
            totalItems > 0 ? `Found ${totalItems} books` : false
          }
        </Text>
      </SearchStatus>

      {totalItems > 0 &&
        items.map((book): JSX.Element => (
          <Page
            key={book.id}
            onClick={(): void => navigate(`/${book.id}`)}
          >
            <img src={URL_IMG_BASE + book.id + IMG_ZOOM} />

            <Text textAlign='center'>
              {book.volumeInfo.title}
            </Text>

            <Text fontSize='14px' textAlign='center'>
              {book.volumeInfo.authors?.join(', ')}
            </Text>

            <Text fontSize='12px'>
              {book.volumeInfo.categories && book.volumeInfo.categories[0]}
            </Text>
          </Page>
        ))
      }

      <LoadMoreGroup>{renderLoadMoreGroup()}</LoadMoreGroup>
    </MainWrapper>
  )
}


export default Main
