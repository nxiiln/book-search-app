import styled from 'styled-components';
import Title from './Title';
import Input from './Input';
import Button from './Button';
import Text from './Text';
import Select from './Select';


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


const categories: string[] = ['all', 'art', 'biography', 'computers', 'history', 'medical', 'poetry']
const sorting: string[] = ['relevance', 'newest']

const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => e.preventDefault()

const fillSelect = (options: string[]): JSX.Element[] => (
  options.map((option: string, id: number): JSX.Element => (
    <option key={id}>{option}</option>
  ))
)


const Header = (): JSX.Element => (
  <HeaderWrapperOuter>
    <HeaderWrapperInner>
      <Title>Search Book 📚</Title>
      <Form onSubmit={handleSubmit}>
        <Input type='search' />
        <Button>Search 🔍</Button>

        <SelectGroup>
          <Text>Categories</Text>
          <Select>{fillSelect(categories)}</Select>
        </SelectGroup>

        <SelectGroup>
          <Text>Sorting by</Text>
          <Select>{fillSelect(sorting)}</Select>
        </SelectGroup>
      </Form>
    </HeaderWrapperInner>
  </HeaderWrapperOuter>
)


export default Header
