import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { ContentfulClientApi } from "contentful";
<<<<<<< HEAD
import Router from "./components/Router";
import NavBar from './components/NavBar';
import BigCard from './components/BigCard';
=======
import NavBar from "./components/NavBar";
import Post from "./components/Post";
>>>>>>> 1916b07a83e04d8887c0ed139b24051293bf6a0d

function App() {
  const [posts, setPosts] = useState([]);

  //Contentful
  const contentful = require("contentful");

  const client = contentful.createClient({
    space: process.env.REACT_APP_SPACE_ID,
    environment: "master", // defaults to 'master' if not set
    accessToken: process.env.REACT_APP_ACCESS_TOKEN,
  });

  useEffect(() => {
    client
      .getEntries()
      .then((response) => {
        setPosts(response.items);
      })

      .catch(console.error);
  }, []);

  return (
    <div className="App">
      <NavBar />

      {posts ? (
        <>
          {posts.map((post) => (
            <>
              <h3>{post.fields.title}</h3>
              <p className="details">{post.fields.author}</p>
              <p className="details">{post.fields.date}</p>
              <p>{post.fields.content}</p>
              <img src={post.fields.picture.fields.file.url} />
            </> //Post ID: post.fields.sys.id
          ))}
        </>
      ) : (
        <h2>Loading...</h2>
      )}
      <Routes>
        <Route path="post/:id" element={<Post />}></Route>
      </Routes>
    </div>
  );
}

export default App;
