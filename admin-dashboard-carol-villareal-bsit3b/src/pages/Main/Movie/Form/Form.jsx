import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Form.css';

const Form = () => {
  const [query, setQuery] = useState('');
  const [searchedMovieList, setSearchedMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(undefined);
  const [movie, setMovie] = useState(undefined);
  const { movieId } = useParams();
  const navigate = useNavigate();

    // New state for error messages
    const [error, setError] = useState(null);

  // Fetch movie data if `movieId` is provided
  useEffect(() => {
    if (movieId) {
      axios.get(`/movies/${movieId}`)
        .then((response) => {
          const movie = response.data;
          setFormState({
            title: movie.title,
            overview: movie.overview,
            popularity: movie.popularity,
            releaseDate: movie.releaseDate,
            voteAverage: movie.voteAverage,
          });
          setSelectedMovie(movie);
        })
        .catch((error) => console.error(error));
    }
  }, [movieId]);

  const handleSearch = useCallback(() => {
    axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
      headers: {
        Accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTdiNmUyNGJkNWRkNjhiNmE1ZWFjZjgyNWY3NGY5ZCIsIm5iZiI6MTcyOTI5NzI5Ny4wNzMzNTEsInN1YiI6IjY2MzhlZGM0MmZhZjRkMDEzMGM2NzM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZIX4EF2yAKl6NwhcmhZucxSQi1rJDZiGG80tDd6_9XI',
      },
    }).then((response) => {
      if (response.data.results.length === 0) {
        setError('No movies found. Please try a different search.');
        setSearchedMovieList([]); // Clear previous search results
      } else {
        setSearchedMovieList(response.data.results);
        setError(''); // Clear error on success
      }
      })
      .catch(() => setError('Error searching for movies. Please try again.'));
  }, [query]);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  const handleSave = () => {
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);
    if (selectedMovie === undefined) {
      // Add validation
      alert('Please search and select a movie.');
    } else {
      const data = {
        tmdbId: selectedMovie.id,
        title: formState.title,  // Use formState values
        overview: formState.overview,
        popularity: formState.popularity,
        releaseDate: formState.releaseDate,
        voteAverage: formState.voteAverage,
        backdropPath: `https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`,
        posterPath: `https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`,
        isFeatured: 0,
      };

      const request = axios({
        method: movieId ? 'patch' : 'post', // use PUT for update, POST for new
        url:  movieId ? `/movies/${movieId}` : '/movies',
        data: data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((saveResponse) => {
        alert('Movie saved successfully!');
        setError(''); // Clear error on success
        navigate('/main/movies'); // Redirect to /main/movies
        })
        .catch((error) => setError('Error saving movie. Please try again.'));
    }
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormState({ ...formState, [name]: value });
    };
  };
  

  const [formState, setFormState] = useState({
    title: '',
    overview: '',
    popularity: '',
    releaseDate: '',
    voteAverage: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  useEffect(() => {
    if (selectedMovie) {
      setFormState({
        title: selectedMovie.original_title,
        overview: selectedMovie.overview,
        popularity: selectedMovie.popularity,
        releaseDate: selectedMovie.release_date,
        voteAverage: selectedMovie.vote_average,
      });
    }
  }, [selectedMovie]);

  return (
    <>
      <h1>{movieId !== undefined ? 'Edit ' : 'Create '} Movie</h1>
      {error && <p className='error-message'>{error}</p>} {/* Display error messages */}
      {movieId === undefined && (
        <>
          <div className='search-container'>
            Search Movie:{' '}
            <input
              type='text'
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type='button' onClick={handleSearch}>
              Search
            </button>
            <div className='searched-movie'>
              {searchedMovieList.map((movie) => (
                <p key={movie.id} onClick={() => handleSelectMovie(movie)}>
                  {movie.original_title}
                </p>
              ))}
            </div>
          </div>
          <hr />
        </>
      )}

      <div className='container'>
        <form>
          {selectedMovie ? (
            <img
              className='poster-image'
              src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
            />
          ) : (
            ''
          )}
          <div className='field'>
            Title:
            <input
              type='text'
              name='title'
              value={formState.title} // Bind to formState
              onChange={handleInputChange}
            />
          </div>
          <div className='field'>
            Overview:
            <textarea
              rows={10}
              name='overview'
              value={formState.overview} // Bind to formState
              onChange={handleInputChange}
            />
          </div>

          <div className='field'>
            Popularity:
            <input
              type='text'
              name='popularity'
              value={formState.popularity} // Bind to formState
              onChange={handleInputChange}
            />
          </div>

          <div className='field'>
            Release Date:
            <input
              type='text'
              name='releaseDate'
              value={formState.releaseDate} // Bind to formState
              onChange={handleInputChange}
            />
          </div>

          <div className='field'>
            Vote Average:
            <input
              type='text'
              name='voteAverage'
              value={formState.voteAverage} // Bind to formState
              onChange={handleInputChange}
            />
          </div>

          <button type='button' onClick={handleSave}>
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;   