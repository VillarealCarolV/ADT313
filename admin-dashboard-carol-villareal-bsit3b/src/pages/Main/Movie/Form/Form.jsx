import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Form = () => {
  const [query, setQuery] = useState("");
  const [searchedMovieList, setSearchedMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(undefined);
  const [movie, setMovie] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    overview: "",
    popularity: "",
    releaseDate: "",
    voteAverage: "",
    artists: [],
    photos: [],
    videos: [],
  });
  const [newArtist, setNewArtist] = useState("");
  const [newPhoto, setNewPhoto] = useState("");
  const [newVideo, setNewVideo] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { movieId } = useParams();

  const handleSearch = useCallback(() => {
    setError("");
    if (!query) {
      setError("Please enter a search term");
      return;
    }

    setIsLoading(true);
    setSearchedMovieList([]);

    axios({
      method: "get",
      url: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${currentPage}`,
      headers: {
        Accept: "application/json",
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTdiNmUyNGJkNWRkNjhiNmE1ZWFjZjgyNWY3NGY5ZCIsIm5iZiI6MTcyOTI5NzI5Ny4wNzMzNTEsInN1YiI6IjY2MzhlZGM0MmZhZjRkMDEzMGM2NzM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZIX4EF2yAKl6NwhcmhZucxSQi1rJDZiGG80tDd6_9XI',
      },
    })
      .then((response) => {
        if (response.data.results.length === 0) {
          setError("No movies found matching your search");
        } else {
          setSearchedMovieList(response.data.results);
          setTotalPages(response.data.total_pages);
        }
      })
      .catch(() => {
        setError("Unable to search movies at this time. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, currentPage]);

  useEffect(() => {
    if (currentPage > 1) {
      handleSearch();
    }
  }, [currentPage, handleSearch]);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setFormData({
      title: movie.original_title,
      overview: movie.overview,
      popularity: movie.popularity,
      releaseDate: movie.release_date,
      voteAverage: movie.vote_average,
      artists: [],
      photos: [],
      videos: [],
    });
    setError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddArtist = () => {
    if (newArtist.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        artists: [...prevData.artists, newArtist],
      }));
      setNewArtist("");
    }
  };

  const handleAddPhoto = () => {
    if (newPhoto.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        photos: [...prevData.photos, newPhoto],
      }));
      setNewPhoto("");
    }
  };

  const handleAddVideo = () => {
    if (newVideo.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        videos: [...prevData.videos, newVideo],
      }));
      setNewVideo("");
    }
  };

 const handleSave = async (e) => {
  e.preventDefault();

  const formDataToSend = {
    ...formData,
    popularity: Number(formData.popularity),
    voteAverage: Number(formData.voteAverage),
    artists: formData.artists.map((artist) => ({ name: artist })),
    photos: formData.photos.map((photo) => ({ url: photo })),
    videos: formData.videos.map((video) => ({ url: video })),
  };

  if (!formDataToSend.title || !formDataToSend.overview || !formDataToSend.popularity || !formDataToSend.releaseDate || !formDataToSend.voteAverage) {
    setError("Please fill in all fields before saving.");
    return;
  }

  setIsLoading(true);

  const apiEndpoint = movieId ? `/api/edit-movie/${movieId}` : "/api/save-movie";
  const apiMethod = movieId ? axios.put : axios.post;

  const token = localStorage.getItem('authToken'); // Correct token retrieval
  if (!token) {
    console.error("No auth token found.");
    setError("Authentication token is missing. Please log in again.");
    setIsLoading(false);
    return;
  }

  const config = {
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTdiNmUyNGJkNWRkNjhiNmE1ZWFjZjgyNWY3NGY5ZCIsIm5iZiI6MTcyOTI5NzI5Ny4wNzMzNTEsInN1YiI6IjY2MzhlZGM0MmZhZjRkMDEzMGM2NzM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZIX4EF2yAKl6NwhcmhZucxSQi1rJDZiGG80tDd6_9XI', // Corrected to use `token` and `Bearer`
    },
  };

  try {
    const response = await apiMethod(apiEndpoint, formDataToSend, config);
    if (response.status === 200) {
      setIsLoading(false);
      setError("");
      navigate("/movies");
    }
  } catch (error) {
    setIsLoading(false);
    setError("Failed to save movie. Please try again.");
    console.error("Save error:", error);
    if (error.response) {
      console.error("Error Response Data:", error.response.data);
    }
  }
};

  
  

  return (
    <div className="dashboard-container">
      <h1>{movieId ? "Edit" : "Create"} Movie</h1>
      {error && <div className="error-message">{error}</div>}
      {isLoading && <div className="loading-message">Loading...</div>}

      {movieId === undefined && (
        <div className="search-container">
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search movies..."
          />
          <button onClick={handleSearch} disabled={isLoading || !query.trim()}>
            {isLoading ? "Searching..." : "Search"}
          </button>
          <div className="searched-movies">
            {searchedMovieList.map((movie) => (
              <p key={movie.id} onClick={() => handleSelectMovie(movie)}>
                {movie.original_title}
              </p>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1 || isLoading}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages || isLoading}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      <form>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
        </div>
        <div>
          <label>Overview:</label>
          <textarea name="overview" value={formData.overview} onChange={handleInputChange}></textarea>
        </div>
        <div>
          <label>Popularity:</label>
          <input type="number" name="popularity" value={formData.popularity} onChange={handleInputChange} />
        </div>
        <div>
          <label>Release Date:</label>
          <input type="date" name="releaseDate" value={formData.releaseDate} onChange={handleInputChange} />
        </div>
        <div>
          <label>Vote Average:</label>
          <input type="number" name="voteAverage" value={formData.voteAverage} onChange={handleInputChange} />
        </div>
        <div>
          <label>Artists:</label>
          <input
            type="text"
            value={newArtist}
            onChange={(e) => setNewArtist(e.target.value)}
            placeholder="Add artist name"
          />
          <button type="button" onClick={handleAddArtist}>
            Add Artist
          </button>
          <ul>
            {formData.artists.map((artist, index) => (
              <li key={index}>{artist}</li>
            ))}
          </ul>
        </div>
        <div>
          <label>Photos:</label>
          <input
            type="text"
            value={newPhoto}
            onChange={(e) => setNewPhoto(e.target.value)}
            placeholder="Add photo URL"
          />
          <button type="button" onClick={handleAddPhoto}>
            Add Photo
          </button>
          <ul>
            {formData.photos.map((photo, index) => (
              <li key={index}>{photo}</li>
            ))}
          </ul>
        </div>
        <div>
          <label>Videos:</label>
          <input
            type="text"
            value={newVideo}
            onChange={(e) => setNewVideo(e.target.value)}
            placeholder="Add video URL"
          />
          <button type="button" onClick={handleAddVideo}>
            Add Video
          </button>
          <ul>
            {formData.videos.map((video, index) => (
              <li key={index}>{video}</li>
            ))}
          </ul>
        </div>
        <button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Movie"}
        </button>
      </form>
    </div>
  );
};

export default Form;
