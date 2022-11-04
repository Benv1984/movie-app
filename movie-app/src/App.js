import  React, {useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import MovieComponent from './components/MovieComponent'
import MovieInfoComponent from './components/MovieInfoComponent'
export const API_KEY = 'e15cd47d'

const Container = styled.div`
display: flex;
flex-direction: column;

`

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const MovieImage = styled.img`
width: 48px;
height: 48px;
margin: 15px;
`
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`

const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`

const Header = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
background-color: black;
color: white;
align-items: center;
padding: 10px;
font-size: 25px;
font-weight: bold;
box-shadow: 0 3px 6px #555;
`

const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;
`

function App() {
  const [searchQuery, updateSearchQuery] = useState()
  const [timeoutId, updateTimeoutId] = useState()
  const [movieList, updateMovieList] = useState([])
  const [selectedMovie, onMovieSelect] = useState()

  const fetchData = async (searchString) => {
   const response = await axios.get(
    `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
    )
    
    updateMovieList(response.data.Search)
  }
  const onTextChange = (event) => {
    clearTimeout(timeoutId)
    updateSearchQuery(event.target.value)
   const timeout = setTimeout(()=> fetchData(event.target.value), 500)
   updateTimeoutId(timeout)
  }
  return( 
  <Container>
    <Header>
     <AppName>
      <MovieImage src='/movie-icon.svg'/>
      Movie App
      </AppName>
      <SearchBox>
        <SearchIcon src='/search-icon.svg' />
        <SearchInput 
        placeholder='Search Movie'
        value={searchQuery}
        onChange={onTextChange}
        />
      </SearchBox>
     </Header>
     {selectedMovie && <MovieInfoComponent selectedMovie = {selectedMovie} />}
     <MovieListContainer>
      {movieList?.length 
      ? movieList.map((movie, index)=> (
      <MovieComponent 
      key = {index} 
      movie = {movie} 
      onMovieSelect = {() => onMovieSelect(movie)}/>
      ))
      : 'NO MOVIE SEARCH'}
     </MovieListContainer>
      </Container>
 )
}

export default App;
