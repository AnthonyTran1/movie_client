import { useState, useEffect } from "react";
import { MovieCard } from "../movie_card/movie_card";
import { MovieView } from "../movie_view/movie_view";
import { LoginView } from "../login_view/login_view";
import { SignupView } from "../signup_view/signup_view";
import { ProfileView } from "../profile_view/profile_view";
import { NavigationBar } from "../navigation_bar/navigation_bar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [filteredMovieName, setFilteredMovieName] = useState();
  const [masterList, setMasterList] = useState([]);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://movies-flix-aada9cec6615.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((doc) => {
          return {
            id: doc._id,
            title: doc.Title,
            image: doc.ImagePath,
            director: doc.Director.Name,
            description: doc.Description,
            genre: doc.Genre.Name,
          };
        });

        setMasterList(moviesFromApi);
        setMovies(moviesFromApi);
      });
  }, [token]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const thisFilterMovie = masterList.filter((m) =>
      m.title.toLowerCase().includes(filteredMovieName.toLowerCase())
    );
    setMovies(thisFilterMovie);
  };

  const handleClear = (event) => {
    event.preventDefault();
    setMovies(masterList);
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
        onHomePress={() => {
          setMovies(masterList);
          setFilteredMovieName("");
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} user={user} token={token} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group controlId="formMovie">
                        <Form.Label>Search by Movie Name :</Form.Label>
                        <Form.Control
                          type="text"
                          value={filteredMovieName}
                          onChange={(e) => setFilteredMovieName(e.target.value)}
                          required
                        />
                      </Form.Group>
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    </Form>
                    <Form onSubmit={handleClear}>
                      <Button variant="secondary" type="clear">
                        Clear Filter
                      </Button>
                    </Form>
                    <Col>The list is empty!</Col>
                  </>
                ) : (
                  <>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group controlId="formMovie">
                        <Form.Label>Search by Movie Name :</Form.Label>
                        <Form.Control
                          type="text"
                          value={filteredMovieName}
                          onChange={(e) => setFilteredMovieName(e.target.value)}
                          required
                        />
                      </Form.Group>
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    </Form>
                    <Form onSubmit={handleClear}>
                      <Button variant="secondary" type="clear">
                        Clear Filter
                      </Button>
                    </Form>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={8}>
                    <ProfileView
                      user={user}
                      token={storedToken}
                      movies={masterList}
                      onLoggedOut={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
