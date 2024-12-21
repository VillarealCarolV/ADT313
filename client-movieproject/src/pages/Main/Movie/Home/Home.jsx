import { useNavigate } from 'react-router-dom';
import './Home.css';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
// import Leftbar from '../../../../components/Leftbar/Leftbar';
import MovieCards from '../../../../components/MovieCards/MovieCards';
import { useMovieContext } from '../../../../context/MovieContext';
const Home = () => {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const { movieList, setMovieList, setMovie } = useMovieContext();

  const getMovies = () => {
    //get the movies from the api or database
    axios
      .get('/movies')
      .then((response) => {
        setMovieList(response.data);
        
        const random = Math.floor(Math.random() * response.data.length);
        setFeaturedMovie(response.data[random]);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (movieList.length) {
        console.log('change movie');
        const random = Math.floor(Math.random() * movieList.length);
        setFeaturedMovie(movieList[random]);
      }
    }, 5000);
    return;
  }, [featuredMovie]);

  return (
    
    <div className='main-container-home'>
      {/* <Leftbar /> */}
      {/* <h1 className='page-title'>Movies</h1> */}
      
      {featuredMovie && movieList.length ? (
        <div className='featured-list-container'>
          <div
            className='featured-backdrop'
            style={{
              background: `url(${
                featuredMovie.backdropPath !==
                'https://image.tmdb.org/t/p/original/undefined'
                  ? featuredMovie.backdropPath
                  : featuredMovie.posterPath
              }) no-repeat center center / cover`,
            }}
          >
            <span className='featured-movie-title'>{featuredMovie.title}</span>
            <p className='featured-movie-description'>{featuredMovie.overview}</p>
            <div className="btns">
              <button>WATCH TRAILER</button>
              
            </div>
          </div>
         <div> <h4 className='submaintitle'>Popular Movies</h4></div>
          <div className='list-container'>
        {movieList.map((movie) => (
          <>
            <MovieCards
              movie={movie}
              onClick={() => {
                console.log(movie);
                navigate(`/main/view/${movie.id}`);
                setMovie(movie);
              }}
            />
          </>
        ))}
      </div>
        </div>
      ) : (
        <div className='featured-list-container-loader'></div>
      )}


      
      
    </div>
  );
};

export default Home;
