import React, { useState } from "react";
import CreatePost from "./components/CreatePost";
import AllPosts from "./components/AllPosts";
import "./App.css";

function App() {
  const [allPost, setallPost] = useState([]);
  const handlePostChange = (value) => {
    setallPost(value);
  };
  return (
    <div className="App">
      <h1 className="title">GiphyGifs</h1>
      <br />
      <CreatePost changePost={handlePostChange} post={allPost} />
      <AllPosts allPost={allPost} />
    </div>
  );
}

export default App;
