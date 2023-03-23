import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Text from './Text'
import Button from './Button'
import { TLoadingStatus } from '../types/TLoadingStatus'
import { TBook } from '../types/TBook'
import {
  URL_BOOK_BASE,
  URL_IMG_BASE,
  IMG_ZOOM,
  ZOOM_BIG,
  BREAKPOINT_MEDIUM,
  MESSAGE_LOADING,
  MESSAGE_ERROR,
} from '../utils/constants'


const BookDetailWrapper = styled.main`
  width: 100%;
  margin: 20px 0 100px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${BREAKPOINT_MEDIUM} {
    flex-direction: row;
    justify-content: space-around;
    align-items: start;
  }
`

const BookImage = styled.img`
  width: 90%;
  max-width: 500px;
  margin-bottom: 20px;
  filter: brightness(0.9);
  user-select: none;

  @media ${BREAKPOINT_MEDIUM} {
    width: 45%;
    margin: 0;
  }
`

const AboutBook = styled.div`
  width: 90%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  @media ${BREAKPOINT_MEDIUM} {
    width: 45%;
    max-width: 750px;
  }
`

const TextGroup = styled.div`
  margin-top: 20px;

  @media ${BREAKPOINT_MEDIUM} {
    margin: 0 0 30px 0;
  }

`

const Description = styled.div`
  margin: 5px 0 40px 0;
  font-family: var(--font-main);
  font-size: 16px;
  font-weight: 400;
  color: var(--color-main);

  @media ${BREAKPOINT_MEDIUM} {
    margin-bottom: 15px;
  }

  & > p {
    margin: 0;
  }

  & > b {
    font-weight: 700;
  }
`


const BookDetail = (): JSX.Element => {
  const navigate = useNavigate()
  const bookId = useParams().id
  const [book, setBook] = useState<TBook>();
  const [loadingStatus, setLoadingStatus] = useState<TLoadingStatus>('loading')

  const fetchBook = async (): Promise<void> => {
    try {
      setLoadingStatus('loading')
      const response: Response = await fetch(URL_BOOK_BASE + bookId);
      if (!response.ok) throw new Error();
      const book: TBook = await response.json();
      setBook(book)
      setLoadingStatus('ok')
    } catch(error) {
      setLoadingStatus('error')
    }
  }

  useEffect((): void => {
    fetchBook()
  }, [bookId])


  return (
    <BookDetailWrapper>
      <Text>
        {
          loadingStatus === 'loading' ? MESSAGE_LOADING :
          loadingStatus === 'error' ? MESSAGE_ERROR : ''
        }
      </Text>

      {book && loadingStatus === 'ok' &&
        <>
          <BookImage src={URL_IMG_BASE + book.id + IMG_ZOOM + ZOOM_BIG} />

          <AboutBook>
            <TextGroup>
              <Text fontSize='32px' fontWeight={700}>{book.volumeInfo.title}</Text>
            </TextGroup>

            <TextGroup>
              <Text fontSize='16px' fontWeight={700}>
                {'Authors: '}
              </Text>
              <Text fontSize='16px'>
                {book.volumeInfo.authors?.join(', ')}
              </Text>
            </TextGroup>

            <TextGroup>
              <Text fontSize='16px' fontWeight={700}>
                {'Categories: '}
              </Text>
              <Text fontSize='16px'>
                {book.volumeInfo.categories?.join(', ')}
              </Text>
            </TextGroup>

            <TextGroup>
              <Text fontSize='16px' fontWeight={700}>
                {'Description: '}
              </Text>
              <Description
                dangerouslySetInnerHTML={
                  {__html: book.volumeInfo.description || ''}
                }
              />
            </TextGroup>

            <Button
              aligSelf='center'
              onClick={(): void => navigate('/')}
            >
              Close
            </Button>
          </AboutBook>
        </>
      }
    </BookDetailWrapper>
  )
}


export default BookDetail
