import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../utils/redux-hooks'
import styled from 'styled-components'
import Text from './Text'
import BookPreview from './BookPreview'
import Button from './Button'
import { setStartIndex } from '../slices/query'
import { fetchBooks } from '../slices/books'
import { MAX_RESULTS, MESSAGE_LOADING, MESSAGE_ERROR } from '../utils/constants'
import { TBook } from '../types/TBook'


const BookListWrapper = styled.main`
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

const LoadMoreGroup = styled.div`
  width: 100%;
  height: 70px;
  margin: 20px 0 100px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`


const BookList = (): JSX.Element => {
  const {items, totalItems, loadingStatus} = useAppSelector(state => state.books)
  const {startIndex, baseQuery} = useAppSelector(state => state.query)
  const scrollY = useAppSelector(state => state.scrollY)
  const dispatch = useAppDispatch()

  useEffect((): void => {
    window.scroll({top: scrollY})
  }, [])

  const handleLoadMore = (): void => {
    const urlQuery: string = `${baseQuery}&startIndex=${startIndex}&maxResults=${MAX_RESULTS}`
    dispatch(fetchBooks(urlQuery))
    dispatch(setStartIndex())
  }

  const renderLoadMoreGroup = (): JSX.Element => {
    const buttonLoadMore: JSX.Element = (
      <Button width='150px' onClick={handleLoadMore}>
        Load more 📚
      </Button>
    )

    if (totalItems > 0 && loadingStatus === 'loading') {
      return <Text>{MESSAGE_LOADING}</Text>
    }

    if (totalItems > 0 && loadingStatus === 'error') {
      return (
        <>
          {buttonLoadMore}
          <Text>{MESSAGE_ERROR}</Text>
        </>
      )
    }

    if (totalItems > 0) {
      return buttonLoadMore
    }

    return <></>
  }


  return (
    <BookListWrapper>
      <SearchStatus>
        <Text>
          {
            totalItems === 0 && loadingStatus === 'loading' ? MESSAGE_LOADING :
            totalItems === 0 && loadingStatus === 'error' ? MESSAGE_ERROR :
            totalItems > 0 ? `Found ${totalItems} books` : false
          }
        </Text>
      </SearchStatus>

      {totalItems > 0 && items.map((book: TBook, id: number): JSX.Element =>
        <BookPreview key={id} book={book} />
      )}

      <LoadMoreGroup>{renderLoadMoreGroup()}</LoadMoreGroup>
    </BookListWrapper>
  )
}


export default BookList
