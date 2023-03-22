import { useState } from 'react'
import { useAppDispatch } from '../redux-hooks'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Title from './Title'
import Input from './Input'
import Button from './Button'
import Text from './Text'
import Select from './Select'
import { clearState, fetchBooks } from '../slices/books'
import { setBaseQuery } from '../slices/query'
import { CATEGORIES, SORTING, URL_BASE, MAX_RESULTS } from '../constants'


const HeaderWrapperOuter = styled.header`
  width: 100%;
  margin: 20px 0 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const HeaderWrapperInner = styled.div`
  width: 90%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Form = styled.form`
  width: 100%;
  /* height: 80px; */
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: space-between;
  /* border: 1px solid orange; */
`

const Selects = styled.div`
  width: 100%;
  max-width: 400px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 540px) {
    height: 70px;
    flex-direction: column;
    align-items: center;
  }
`

const SelectGroup = styled.div`
  width: 185px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`




const Header = (): JSX.Element => {
  const [query, setQuery] = useState<string>('')
  const [category, setCategory] = useState<string>('all')
  const [sort, setSort] = useState<string>('relevance')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const subject: string = category === 'all' ? '' : `+subject:${category}`
  const orderBy: string = `&orderBy=${sort}`
  const baseQuery: string = URL_BASE + query + subject + orderBy
  const urlQuery: string = `${baseQuery}&startIndex=0&maxResults=${MAX_RESULTS}`

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (query) {
      dispatch(clearState())
      dispatch(setBaseQuery(baseQuery))
      dispatch(fetchBooks(urlQuery))
      navigate('/')
    }
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value)
  }

  const handleChangeSelect = (setValue: (value: string) => void) => (
    (e: React.ChangeEvent<HTMLSelectElement>): void => {
      setValue(e.target.value)
    }
  )

  const fillSelect = (options: string[]): JSX.Element[] => (
    options.map((option: string, id: number): JSX.Element => (
      <option key={id} value={option}>{option}</option>
    ))
  )

  return (
    <HeaderWrapperOuter>
      <HeaderWrapperInner>
        <Title>Search Book 📚</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type='search'
            value={query}
            onChange={handleChangeInput}
          />
          <Button margin='0 0 0 10px'>Search 🔍</Button>

          <Selects>
            <SelectGroup>
              <Text>Categories</Text>
              <Select value={category} onChange={handleChangeSelect(setCategory)}>
                {fillSelect(CATEGORIES)}
              </Select>
            </SelectGroup>

            <SelectGroup>
              <Text>Sorting by</Text>
              <Select value={sort} onChange={handleChangeSelect(setSort)}>
                {fillSelect(SORTING)}
              </Select>
            </SelectGroup>
          </Selects>
        </Form>
      </HeaderWrapperInner>
    </HeaderWrapperOuter>
  )
}


export default Header
