import { useAppDispatch } from '../utils/redux-hooks'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Text from './Text'
import { setScrollY } from '../slices/scrollY'
import { TBook } from '../types/TBook'
import { URL_IMG_BASE, IMG_ZOOM, ZOOM_SMALL } from '../utils/constants'


const BookPreviewWrapper = styled.section`
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
  filter: brightness(0.9);
  user-select: none;
`


const BookPreview = ({book}: {book: TBook}): JSX.Element => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleClick = (): void => {
    dispatch(setScrollY(window.scrollY))
    navigate(`/${book.id}`)
  }

  return (
    <BookPreviewWrapper onClick={handleClick}>
      <BookImage src={URL_IMG_BASE + book.id + IMG_ZOOM + ZOOM_SMALL} />

      <Text fontWeight={700} textAlign='center'>
        {book.volumeInfo.title.substring(0, 73)}
      </Text>

      <Text fontSize='14px' textAlign='center'>
        {book.volumeInfo.authors?.join(', ').substring(0, 61)}
      </Text>

      <Text fontSize='12px'>
        {book.volumeInfo.categories && book.volumeInfo.categories[0]}
      </Text>
    </BookPreviewWrapper>
  )
}


export default BookPreview
