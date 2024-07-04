import React from "react";
import Image from "./ImageUrl.jpg"

const NewsItem = (props) => {

    let {title, description, imageUrl, newsUrl, author, date, source} = props;

  return (
    <div className="my-3">
      <div className="card position-relative d-flex justify-content-center">

      <div style={{display: "flex", justifyContent: "flex-end", alignItems: "center", position: "absolute", right: "0", top: "0"}}>
      <span className="badge text-bg-light">{source}</span>
      </div>
      
        <img src={!imageUrl?Image:imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            {description}
          </p>
          <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">
            Read More
          </a>
        </div>
      </div>
    </div>
  );

}

export default NewsItem;
