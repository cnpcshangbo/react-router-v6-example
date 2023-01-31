import "./bootstrap.min.css";
// import './App.css';
// after other import statements
// import { BrowserRouter as Router } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useParams,
} from "react-router-dom";
import React, { useState } from "react";

const BlogPosts = {
  1: {
    title: "First Blog Post",
    description: "Lorem ipsum dolor sit amet, consectetur adip.",
  },
  2: {
    title: "Second Blog Post",
    description: "Hello React Router v6",
  },
};

function Posts() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Blog</h2>
      {/* render any matching child */}
      <Outlet />
    </div>
  );
}

function Post() {
  const { slug } = useParams();
  const post = BlogPosts[slug];
  const { title, description } = post;
  return (
    <div style={{ padding: 20 }}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function PostLists() {
  return (
    <ul>
      {Object.entries(BlogPosts).map(([slug, { title }]) => (
        <li key={slug}>
          <Link to={`/posts/${slug}`}>
            <h3>{title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Home() {
  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className="App">
      <h2>Add Image:</h2>
      <input type="file" onChange={handleChange} />
      <img src={file} />
    </div>
  );
}

function About() {
  return (
    <div style={{ padding: 20 }}>
      <h2>About View</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      {" "}
      <main>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
          <div class="container-fluid">
            <Link class="navbar-brand" to="#">
              Innovbot Cloud
            </Link>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarColor01"
              aria-controls="navbarColor01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarColor01">
              <ul class="navbar-nav me-auto">
                <li class="nav-item">
                  <Link class="nav-link active" to="/">
                    Home
                    <span class="visually-hidden">(current)</span>
                  </Link>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Features
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/posts">
                    Posts
                  </a>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/about">
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* <nav style={{ margin: 10 }}>
    <Link to="/" style={{ padding: 5 }}>
      <button variant="primary">Home</button>
    </Link>
    <Link to="/about" style={{ padding: 5 }}>
      About
    </Link>    
    <Link to="/posts" style={{ padding: 5 }}>
      Posts
    </Link>
  </nav> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="posts" element={<Posts />}>
            <Route path="/" element={<PostLists />} />
            <Route path=":slug" element={<Post />} />
          </Route>
        </Routes>
      </main>
      <p className="text-center" style={{ padding: 20 }}>
        Innovbot LLC &copy; 2023
      </p>
    </Router>
  );
}

export default App;
