import './Loading.css'
import imageTitle from '../../img/logo-movie.png';

function Loading() {
    return (
      <div className="loader-container">
      <img 
        src={imageTitle} 
        alt="Title" 
        className="title-image" 
      />
      <div className="loader"></div>
    </div>
    

    );
  }
  
  export default Loading;



  
  