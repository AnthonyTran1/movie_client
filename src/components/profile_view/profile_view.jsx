import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import "./profile_view.scss";

export const ProfileView = ({ user, token, movies }) => {
  const [usernameUpdate, setUsernameUpdate] = useState("");
  const [passwordUpdate, setPasswordUpdate] = useState("");
  const [emailUpdate, setEmailUpdate] = useState("");
  const [birthdayUpdate, setBirthdayUpdate] = useState("");
  const [myFavMovies, setMyFavMovies] = useState([]);
  const [userData, setUserData] = useState({
    username: "username here",
    password: "password here",
    email: "email here",
    birthday: "birthday here",
    favoriteMovies: [],
  });

  // let myFavoriteMovies = movies.filter(
  //   (m) => m._id === user.FavoriteMovies.map()
  // );
  // console.log("fav movies: " + myFavoriteMovies);
  console.log("userdata movies: " + userData.favoriteMovies);
  console.log("userdata datatype: " + typeof userData.favoriteMovies);

  useEffect(() => {
    fetch(
      `https://movies-flix-aada9cec6615.herokuapp.com/users/${user.Username}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => response.json())
      .then((data) =>
        setUserData({
          username: data.Username,
          password: data.Password,
          email: data.Email,
          birthday: data.Birthday,
          favoriteMovies: data.FavoriteMovies,
        })
      );
  }, [token]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: usernameUpdate,
      Password: passwordUpdate,
      Email: emailUpdate,
      Birthday: birthdayUpdate,
    };

    fetch(
      `https://movies-flix-aada9cec6615.herokuapp.com/users/${user.Username}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      if (response.ok) {
        alert("Update successful");
        window.location.reload();
      } else {
        alert("Update failed");
      }
    });
  };

  const onClickDeregister = () => {
    fetch(
      `https://movies-flix-aada9cec6615.herokuapp.com/users/${user.Username}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        method: "DELETE",
      }
    ).then((response) => {
      if (response.ok) {
        alert(
          `Successfully deregistered ${user.Username}! Thank you for using my App!`
        );
      } else {
        alert(`ERROR: ${user.Username} was not deleted!`);
      }
    });
  };

  return (
    <Col md={8}>
      <div>
        <Link to={"/"}>
          <button className="back-button">Back</button>
        </Link>
        <div>
          <span>Username: </span>
          <span>{userData.username}</span>
        </div>
        <div>
          <span>Password: </span>
          <span>{userData.password}</span>
        </div>
        <div>
          <span>Email: </span>
          <span>{userData.email}</span>
        </div>
        <div>
          <span>Birthday: </span>
          <span>{userData.birthday}</span>
        </div>
        <div>
          <span>Favorite Movies: </span>
          <span>{userData.favoriteMovies}</span>
        </div>
        {/* <div>
          <span>Favorite Movies from users: </span>
          <span>{favoriteMoviesList}</span>
        </div> */}
      </div>
      <span>Update User Information Below:</span>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsernameUpdate">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={usernameUpdate}
            onChange={(e) => setUsernameUpdate(e.target.value)}
            required
            minLength="5"
          />
        </Form.Group>
        <Form.Group controlId="formPasswordUpdate">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={passwordUpdate}
            onChange={(e) => setPasswordUpdate(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmailUpdate">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={emailUpdate}
            onChange={(e) => setEmailUpdate(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBirthdayUpdate">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={birthdayUpdate}
            onChange={(e) => setBirthdayUpdate(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <div>
        <div>CAUTION: DANGER ZONE!!! </div>
        <span>Click below ONLY if you want to deregister your account! </span>
      </div>
      <Link>
        <button className="deregister-button">Deregister Account</button>
      </Link>
    </Col>
  );
};
