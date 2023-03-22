import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Text from './Text'
import { URL_BOOK_BASE, URL_IMG_BASE,IMG_ZOOM_BIG, BREAKPOINT_MEDIUM } from '../constants'
import { TLoadingStatus } from '../types/TLoadingStatus'
import { TBook } from '../types/TBook'


const PageDetailWrapper = styled.main`
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
  margin-top: 5px;
  font-family: var(--font-main);
  font-size: 16px;
  font-weight: 400;
  color: var(--color-main);

  & > p {
    margin: 0;
  }

  & > b {
    font-weight: 700;
  }
`


const PageDetail = (): JSX.Element => {
  const bookId = useParams().id
  const [book, setBook] = useState<TBook>();
  const [loadingStatus, setLoadingStatus] = useState<TLoadingStatus>('loading')

  const getBook = async (): Promise<void> => {
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
    getBook()
  }, [bookId])

  return (
    <PageDetailWrapper>
      <Text>
          {
            loadingStatus === 'loading' ? 'Loading... 🚀' :
            loadingStatus === 'error' ? 'Something went wrong 🛸' : ''
          }
        </Text>

      {book && loadingStatus === 'ok' &&
        <>
          <BookImage src={URL_IMG_BASE + book.id + IMG_ZOOM_BIG} />

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
          </AboutBook>
        </>
      }
    </PageDetailWrapper>
  )
}


export default PageDetail
