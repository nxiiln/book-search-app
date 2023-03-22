import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../utils/redux-hooks'
import styled from 'styled-components'
import Button from './Button'
import Text from './Text'
import { setStartIndex } from '../slices/query'
import { fetchBooks } from '../slices/books'
import {
  MAX_RESULTS,
  URL_IMG_BASE,
  IMG_ZOOM,
  ZOOM_SMALL,
  MESSAGE_LOADING,
  MESSAGE_ERROR
} from '../utils/constants'


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
  height: 380px;
  margin: 0 10px 40px 10px;
  padding: 10px;
  display: grid;
  grid-template-rows: 210px 80px 50px 1fr;
  justify-items: center;
  align-items: start;
  background: var(--color-fade);
  cursor: pointer;
  transition: all ease-out 0.2s;

  &:hover {
    transform: scale(1.07);
  }
`

const BookImage = styled.img`
  width: 128px;
  max-height: 192px;
`

const LoadMoreGroup = styled.div`
  width: 100%;
  height: 70px;
  margin: 20px 0 100px 0;
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
      return <Text>{MESSAGE_LOADING}</Text>
    }

    if (totalItems > 0 && loadingStatus === 'error') {
      return (
        <>
          <Button width='150px' onClick={handleLoadMore}>
            Load more 📚
          </Button>
          <Text>{MESSAGE_ERROR}</Text>
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
            totalItems === 0 && loadingStatus === 'loading' ? MESSAGE_LOADING :
            totalItems === 0 && loadingStatus === 'error' ? MESSAGE_ERROR :
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
            <BookImage src={URL_IMG_BASE + book.id + IMG_ZOOM + ZOOM_SMALL} />

            <Text fontWeight={700} textAlign='center'>
              {book.volumeInfo.title.substring(0, 86)}
            </Text>

            <Text fontSize='14px' textAlign='center'>
              {book.volumeInfo.authors?.join(', ').substring(0, 61)}
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
