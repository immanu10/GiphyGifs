import React, { useState } from "react";

function GetGif({ id, belongsTo }) {
  const [url, seturl] = useState("");
  const [isLoading, setisLoading] = useState(true);

  const handleGifClick = (id) => {
    const api = `https://api.giphy.com/v1/gifs/${id}?api_key=4SsN9b31RwvT5JcDY57HxWzqiZsGS27E`;
    fetch(api)
      .then((res) => res.json())
      .then((gif) => {
        seturl(gif.data.images.fixed_height.url);
        setisLoading(false);
      });
  };
  handleGifClick(id);

  return (
    <>
      {isLoading ? (
        <p style={{ marginTop: "30px" }}>Loading...</p>
      ) : belongsTo === "Post" ? (
        <div>
          <img src={url} alt="" className="gifs" />
        </div>
      ) : (
        <div>
          <img src={url} alt="" className="gifs" style={{ height: "100%" }} />
        </div>
      )}
    </>
  );
}

export default GetGif;
