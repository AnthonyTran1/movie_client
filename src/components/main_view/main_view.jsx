import { useState } from "react";
import { MovieCard } from "../movie_card/movie_card";
import { MovieView } from "../movie_view/movie_view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "John Wick",
      image: "https://m.media-amazon.com/images/I/7169P9ipAGL._AC_SL1499_.jpg",
      genre: "Thriller",
      director: "Chad Stahelski",
      description:
        "An ex-hitman comes out of retirement to track down the gangsters who killed his dog and stole his car.",
    },
    {
      id: 2,
      title: "John Wick: Chapter 2",
      image: "https://m.media-amazon.com/images/I/61TdePQT4aL._AC_SL1500_.jpg",
      genre: "Thriller",
      director: "Chad Stahelski",
      description:
        "After returning to the criminal underworld to repay a debt, John Wick discovers that a large bounty has been put on his life.",
    },
    {
      id: 3,
      title: "John Wick 3 - Parabellum",
      image: "https://m.media-amazon.com/images/I/61tVMGdM1hL._AC_SL1500_.jpg",
      genre: "Thriller",
      director: "Chad Stahelski",
      description:
        "John Wick is on the run after killing a member of the international assassins' guild, and with a $14 million price tag on his head, he is the target of hit men and women everywhere.",
    },
    {
      id: 4,
      title: "Harry Potter and the Sorcerers Stone",
      image: "https://m.media-amazon.com/images/I/8102IRfOCBL._AC_SL1500_.jpg",
      genre: "Fantasy",
      director: "Chris Columbus",
      description:
        "An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.",
    },
    {
      id: 5,
      title: "Harry Potter and the Chamber of Secrets",
      image: "https://m.media-amazon.com/images/I/71FL9FvRWnL._AC_SL1500_.jpg",
      genre: "Fantasy",
      director: "Chris Columbus",
      description:
        "Harry Potter lives his second year at Hogwarts with Ron and Hermione when a message on the wall announces that the legendary Chamber of Secrets has been opened. The trio soon realize that, to save the school, it will take a lot of courage.",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
