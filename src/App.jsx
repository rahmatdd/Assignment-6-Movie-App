import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './components/Header'
import Movie from './components/Movie'
import Search from './components/Search'
import { useSelector, useDispatch } from 'react-redux'

function App() {
  const movies = useSelector((state) => state.movies)
  const loading = useSelector((state) => state.loading)
  const error = useSelector((state) => state.error)

  const dispatch = useDispatch()
  
  const apiUrl = import.meta.env.VITE_API_URL
  const apiKey = import.meta.env.VITE_API_KEY

  const [query, setQuery] = useState('')

  const fetchMovies = async (query) => {
    dispatch({ type: 'FETCH_MOVIES_REQUEST' })
    const url = `${apiUrl}?apikey=${apiKey}&s=${query}`
    
    try {
      const response = await axios.get(url)
      dispatch({ type: 'FETCH_MOVIES_SUCCESS', payload: response.data.Search || [] })
    } catch (err) {
      dispatch({ type: 'FETCH_MOVIES_FAILURE', payload: err.message })
    }
  }

  useEffect(() => {
    fetchMovies(query)
  }, [query])

  const handleSearch = (newQuery) => {
    setQuery(newQuery)
  }

  return (
    <>
      <div className="container mt-4">
        <Header title="Movie Finder" />
        <Search onSearch={handleSearch} />
        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}
        <div className="row row-cols-1 row-cols-md-3 g-4 mt-4">
          {movies.map((movie) => (
            <Movie key={movie.imdbID} movie={movie} />
          ))}
        </div>
      </div>
    </>
  )
}

export default App
