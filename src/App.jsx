import React, { useEffect, useState } from 'react'
import heroImg from "./assets/hero-img.png";
import Search from './component/search';
import Spinner from './component/spinner';
import MovieCard from './component/MovieCard';
import { useDebounce } from 'react-use'

const API_BASE_URL = 'https://api.themoviedb.org/3'; 
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:`Bearer ${API_KEY}`
  }
  
};


 

  const App = () => {
  const [search, setSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [MovieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceSearch, setDebounceSearch] = useState('')

  useDebounce(() => setDebounceSearch(search), 500, [search])



    const fetchMovies = async (query = '') => {
      setIsLoading(true);
      setErrorMessage('');
  
      try{
        const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

        const response = await fetch(endpoint, API_OPTIONS)

        if(!response.ok){
          throw new Error("Failed to Fetch movies");
          
        }   


        const data = await response.json();

        setMovieList(data.results || [])
  
      }catch(error){

      console.log(`Error fetching movies: ${error}`);
      setErrorMessage(`Error fetching movies.please try again later.`);
   
      } finally {
        setIsLoading(false);
      }
    }

  useEffect( () => {
    fetchMovies(debounceSearch);
  }, [debounceSearch])

  return (
    <main>

      <div className='pattern' />

      <div className='wrapper '>
        <header>
          <img src={heroImg} alt="hero section" />
          <h1>Find <span className='text-gradient'>Movies</span> you'll Enjoy without the Hassle</h1>
          <Search search ={search} setSearch = {setSearch}/>
        </header>
        
        <section className='all-movies'>
          <h2 className="mt-[40px]">All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ): (
            <ul>
              {MovieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
          )}
          
        </section>
       
        <section className="mt-16">
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
            <h1 className="text-gradient text-3xl font-bold mb-4">Disclaimer</h1>

            <p className="text-lg text-amber-50 leading-relaxed">
              This website allows you to search movies and view their release dates, ratings, and available languages. 
              All movie data is fetched live from The Movie Database (TMDb).
            </p>
          </div>
        </section>
 
      </div>
    </main>
  )
} 


export default App;