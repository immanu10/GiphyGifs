import React from "react";
import GetGif from "./GetGif";
function AllPosts({ allPost }) {
  return (
    <>
      <div className="allPost-container">
        {allPost &&
          allPost.map((item, i) => {
            return (
              <div key={i} className="eachPost">
                <p style={{ fontSize: "20px" }}>{item.msg}</p>
                <GetGif id={item.gifid} />
              </div>
            );
          })}
      </div>
    </>
  );
}

export default AllPosts;
