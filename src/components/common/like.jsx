import React, { Component } from "react";
// input: liked: boolean
// output: onClick => filled

const Like = (props) => {
  return (
    <i
      style={{ cursor: "pointer" }}
      onClick={props.onLike}
      className={getLikeButton(props)}
    ></i>
  );
};

const getLikeButton = (props) => {
  const likeButton =
    props.liked === true ? "fas fa-thumbs-up" : "far fa-thumbs-up";
  return likeButton;
};

export default Like;
