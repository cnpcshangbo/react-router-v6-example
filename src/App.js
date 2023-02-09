import "./bootstrap.min.css";
import '../node_modules/video-react/dist/video-react.css'; // import css
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
import { Player } from 'video-react';

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
  return (
    <div style={{ padding: 20 }}>
      <h2>Innovbot Cloud Overview</h2>
      <p>
        This website provides tools for post-processing data captured by robot
        from Innovbot LLC.{" "}
      </p>
      <p>Current functions:</p>
      <p>
        - SingleImage: Upload a single image for crack segmentation and check
        the result.
      </p>
      <p>
        - Multi-Images: Upload a folder of images for crack segmentation and
        check the results.
      </p>
    </div>
  );
}

function SingleImage() {
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
function MultiImage() {
  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className="App" style={{ padding: 20 }}>
      <div class="d-grid gap-2">
      <Player width="200">
        <source src="http://localhost:3000/test_o.mp4" />
      </Player>
      <h3>View input and output images:</h3>
      <button class="btn btn-lg btn-primary" type="button" style={{ padding: 20 }}>
        
        <a class="nav-link" href="http://45.79.141.198:3000/">
                View Cloud Workspace
                  </a>
        </button>
        <br></br>
        <h3>Add new images:</h3>
        <button class="btn btn-lg btn-primary" type="button" style={{ padding: 20 }}>
        <a class="nav-link" href="http://45.79.141.198:8080/">Add a New Image</a>
        </button>        
        <br></br>
        <h3>Processing new images:</h3>
        <button class="btn btn-lg btn-primary" type="button" style={{ padding: 20 }}>
        <a class="nav-link" href="http://45.79.141.198:5000/run">Start Inferencing</a>
        </button>
        </div>
      {/* <h2>Add Images (under construction):</h2>
      <input type="file" onChange={handleChange} />
      <img src={file} /> */}
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
            <a class="navbar-brand" href="#">
              Innovbot Cloud
            </a>
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
                  <Link class="nav-link" to="/singleimage">
                    SingleImage
                  </Link>
                </li>{" "}
                <li class="nav-item">
                  <Link class="nav-link" to="/multiimage">
                    Multi-Images
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/posts">
                    Posts
                  </Link>
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
          <Route path="/singleimage" element={<SingleImage />} />
          <Route path="/multiimage" element={<MultiImage />} />
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
