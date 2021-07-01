import React, { useEffect, useState } from "react";
import GetGif from "./GetGif";

const apiKey = "4SsN9b31RwvT5JcDY57HxWzqiZsGS27E";

function CreatePost({ changePost, post }) {
  const [msg, setMsg] = useState("");
  const [allGifs, setallGifs] = useState([]);
  const [toggleGif, settoggleGif] = useState(false);
  const [searchTxt, setSearchTxt] = useState("");
  const [gifid, setgifid] = useState("");

  // function to Create Post once submitted
  const handleSubmitPost = (e) => {
    e.preventDefault();
    changePost([...post, { msg, gifid }]);
    setMsg("");
    setgifid("");
  };

  // funtion to get searched GIFs if search text is present or get trending GIFs
  useEffect(() => {
    if (searchTxt) {
      const api = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTxt}&limit=10&offset=0&rating=g&lang=en`;
      fetch(api)
        .then((res) => res.json())
        .then((gif) => {
          const urlsOfGifs = gif.data.map((item) => {
            const url = item.images.fixed_height_small.url;
            const id = item.id;
            return { id, url };
          });
          setallGifs(urlsOfGifs);
        });
    } else {
      getTrendingGifs();
    }
  }, [searchTxt]);

  // function to get Trending GIFs
  const getTrendingGifs = () => {
    const api = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=12&rating=g`;
    fetch(api)
      .then((res) => res.json())
      .then((gif) => {
        const urlsOfGifs = gif.data.map((item) => {
          const url = item.images.fixed_height_small.url;
          const id = item.id;
          return { id, url };
        });
        setallGifs(urlsOfGifs);
      });
  };

  return (
    <div className="create-post-container">
      <div className="create-post">
        <textarea
          cols="40"
          rows="2"
          className="textArea"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Share your moments with GIFs..."
        ></textarea>
        {toggleGif ? (
          <button className="gifbtn" disabled>
            GIF
          </button>
        ) : (
          <button className="gifbtn" onClick={() => settoggleGif(true)}>
            GIF
          </button>
        )}
      </div>
      <div className="gifInPost">
        {gifid && <GetGif id={gifid} belongsTo="Post" />}
      </div>
      <div className="postbtnContainer">
        {gifid && msg ? (
          <button className="postbtn" onClick={handleSubmitPost}>
            Post
          </button>
        ) : (
          <button className="postbtn" disabled>
            Post
          </button>
        )}
      </div>
      {toggleGif && (
        <div className="gif-container">
          <input
            type="text"
            value={searchTxt}
            onChange={(e) => setSearchTxt(e.target.value)}
            className="searchGif"
            placeholder="Search for GIFs"
          />
          <button className="close" onClick={() => settoggleGif(false)}>
            X
          </button>
          <div className="gifImg-container">
            {allGifs.map((gif) => {
              return (
                <div key={gif.id} style={{ padding: "0px 2px" }}>
                  <img
                    src={gif.url}
                    data-id={gif.id}
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      setgifid(e.target.dataset.id);
                      settoggleGif(false);
                    }}
                    alt=""
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default CreatePost;
