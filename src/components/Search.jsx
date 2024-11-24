import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [input, setInput] = useState('')

  const handleSubmit = (data) => {
    data.preventDefault()
    onSearch(input)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(data) => setInput(data.target.value)}
        className="form-control"
        placeholder="Search for a movie"
      />
      <button type="submit" className="btn btn-primary mt-2">
        Search
      </button>
    </form>
  )
}

export default Search
