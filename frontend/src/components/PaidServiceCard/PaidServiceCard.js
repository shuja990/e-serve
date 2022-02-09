import React from "react";
import "./PaidServiceCard.css";

function PaidServiceCard({paidService}) {
  // "https://www.freepnglogos.com/uploads/notebook-png/download-laptop-notebook-png-image-png-image-pngimg-2.png"
  const {title, price, thumbnailImage, keywords, description, category, location}= paidService
  return (
    <div className="col">
      <div className="card psc h-100 shadow-sm">
        {" "}
        <img style={{marginTop: '120px'}}
          src={thumbnailImage}
          className="card-img-top "
          alt="..."
        />
        <div className="top-right shadow-sm mb-5">Image</div>
        <div className="label-top shadow-sm">{title}</div>
        <div className="card-body">
          <div className="clearfix">
            {" "}
            <span className="float-start badge rounded-pill bg-success">
              {price} PKR
            </span>{" "}
            <span className="float-end">
              <a href="#" className="small text-muted">
                Reviews
              </a>
            </span>{" "}
          </div>
          <h5 className="card-title">
           {description}
          </h5>
          <div className="text-center my-4">
            {" "}
            <a href="#" className="btn btn-warning">
              Check offer
            </a>{" "}
          </div>
          <div className="clearfix mb-1">
            {" "}
            <span className="float-start">
              <i className="far fa-question-circle" />
            </span>{" "}
            <span className="float-end">
              <i className="fas fa-plus" />
            </span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaidServiceCard;
