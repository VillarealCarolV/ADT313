import { useEffect } from 'react';
import { useMovieContext } from '../../../../context/MovieContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function View() {
  const { movie, setMovie } = useMovieContext();
  const { movieId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (movieId !== undefined) {
      axios
        .get(`/movies/${movieId}`)
        .then((response) => {
          setMovie(response.data);
        })
        .catch((e) => {
          console.log(e);
          navigate('/');
        });
    }
  }, [movieId]);

  return (
    <>
      {movie && (
        <>
          <div>
            <div className='banner'>
              <h1>{movie.title}</h1>
            </div>
            <h3>{movie.overview}</h3>
           
          </div>

          {movie.casts && movie.casts.length > 0 ? (
            <div>
              <h1>Cast & Crew</h1>
              <ul>
                {movie.casts.map((cast, index) => (
                  <li key={index}>{cast.name}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No cast information available.</p>
          )}

          {movie.videos && movie.videos.length > 0 ? (
            <div>
              <h1>Videos</h1>
              <div>
                {movie.videos.map((video, index) => (
                  <iframe
                    key={index}
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title={video.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ))}
              </div>
            </div>
          ) : (
            <p>No videos available.</p>
          )}

          {movie.photos && movie.photos.length > 0 ? (
            <div>
              <h1>Photos</h1>
              <div style={{ display: 'flex', gap: '10px' }}>
                {movie.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo.filePath}
                    alt={`Photo ${index + 1}`}
                    style={{ width: '200px', height: 'auto' }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <p>No photos available.</p>
          )}
        </>
      )}
    </>
  );
}
export default View;

