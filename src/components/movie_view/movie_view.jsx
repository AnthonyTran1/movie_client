import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import "./movie_view.scss";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Col md={8}>
      <div>
        <img src={movie.image} alt="movie_image" />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <button
        onClick={onBackClick}
        className="back-button"
        style={{ cursor: "pointer" }}
      >
        Back
      </button>
    </Col>
  );
  //Here is where we define all the props constraints for the MovieCard
};

//Here is where we define all the props constraints for the MovieCard
MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
