import React from "react";

const ImgCard = props => {
  return (
    <div>
      <img src={props.data.img_url} alt={props.data.label} />
      <p>{props.data.label}</p>
    </div>
  );
};

export default ImgCard;
