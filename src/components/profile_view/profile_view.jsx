import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
// import "./profile_view.scss";

export const ProfileView = ({ user, token }) => {
  const userData = {
    username: "username",
    password: "password",
    email: "email",
    Birthday: "birthday",
  };

  useEffect(() => {
    console.log(user);
    console.log(token);
    fetch(
      "https://movies-flix-aada9cec6615.herokuapp.com/users/" + user.Username,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log("Login response: " + data);
        const userFromApi = data.map((doc) => {
          return {
            username: doc.Username,
            password: doc.Password,
            email: doc.Email,
            birthday: doc.Birthday,
          };
        });

        // setMovies(moviesFromApi);
      });
  }, []);

  return (
    <Col md={8}>
      <div>
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
        <Link to={"/"}>
          <button className="back-button">Back</button>
        </Link>
      </div>
    </Col>
  );
};
