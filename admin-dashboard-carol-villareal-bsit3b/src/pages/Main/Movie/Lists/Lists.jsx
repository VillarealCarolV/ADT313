import { useNavigate } from 'react-router-dom';
import './Lists.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Lists = () => {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Items displayed per page

  const getMovies = async () => {
    try {
      const response = await axios.get('/movies', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setLists(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const handleDelete = async (id) => {
    const isConfirm = window.confirm(
      'Are you sure that you want to delete this data?'
    );
    if (isConfirm) {
      try {
        await axios.delete(`/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setLists((prevLists) => {
          const updatedLists = prevLists.filter((movie) => movie.id !== id);
          const totalPages = Math.ceil(updatedLists.length / itemsPerPage);

          if (currentPage > totalPages) {
            setCurrentPage(totalPages);
          }
          return updatedLists;
        });
      } catch (error) {
        console.error('Error deleting movie:', error);
      }
    }
  };

  const displayedMovies = lists.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < Math.ceil(lists.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='lists-container'>
      <div className='create-container'>
        <button
          type='button'
          onClick={() => {
            navigate('/main/movies/form');
          }}
        >
          Create new
        </button>
      </div>
      <div className='table-container'>
        <table className='movie-lists'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Genre</th>
              <th>Release Date</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedMovies.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.id}</td>
                <td>{movie.title}</td>
                <td>{movie.genre || 'N/A'}</td>
                <td>{movie.releaseDate || 'N/A'}</td>
                <td>{movie.rating || 'N/A'}</td>
                <td>
                  <button
                    type='button'
                    onClick={() => {
                      navigate('/main/movies/form/' + movie.id);
                    }}
                  >
                    Edit
                  </button>
                  <button type='button' onClick={() => handleDelete(movie.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination controls */}
        <div className='pagination'>
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {Math.ceil(lists.length / itemsPerPage)}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(lists.length / itemsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lists;
