import { useState } from 'react';
import { useAppDispatch } from '../redux-hooks';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Title from './Title';
import Input from './Input';
import Button from './Button';
import Text from './Text';
import Select from './Select';
import { clearState, fetchBooks } from '../slices/books';
import { setBaseQuery } from '../slices/query';
import { CATEGORIES, SORTING, URL_BASE, MAX_RESULTS } from '../constants';


const HeaderWrapperOuter = styled.header`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const HeaderWrapperInner = styled.div`
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const Form = styled.form`
  width: 100%;
  height: 80px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-content: space-between;
`

const SelectGroup = styled.div`
  width: 190px;
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
          <Button>Search 🔍</Button>

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
        </Form>
      </HeaderWrapperInner>
    </HeaderWrapperOuter>
  )
}


export default Header
