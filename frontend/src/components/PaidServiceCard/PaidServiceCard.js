import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deletePaidService } from "../../actions/paidServiceActions";
import "./PaidServiceCard.css";
import { Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getUserDetails } from "../../actions/userActions";
// import { useNavigate } from "react-router-dom";

function PaidServiceCard({ paidService }) {
  // "https://www.freepnglogos.com/uploads/notebook-png/download-laptop-notebook-png-image-png-image-pngimg-2.png"
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const {
    title,
    price,
    thumbnailImage, 
    keywords,
    description,
    category,
    location,
    _id,
    createdBy,
    noOfUpdates
  } = paidService;
  // console.log(userInfo);
  // let navigate = useNavigate();
  const history= useHistory()

  const updateHandler=(id, e)=>{
    e.stopPropagation()
    history.push(`/paidservice/${id}/edit`)
  }

  const dispatch = useDispatch();
  const deleteHandler = (id, e) => {
    e.stopPropagation()
    dispatch(deletePaidService(id));
    window.location.reload();
  };

  const viewDetailsHandler=(id)=>{
    history.push(`/paidservice/${id}`)

  }
  // const createdByName= dispatch(getUserDetails(createdBy))

  return (
    <div style={{height: '632px', margin: '20px', marginTop: '30px'}} className="col">
      <div className="card psc shadow-sm" onClick={()=> viewDetailsHandler(_id)} >
        {" "}
        <img
          width={450}
          height={300}
          style={{objectFit: 'contain'}}
          src={thumbnailImage}
          className="card-img-top "
          alt="..."
        />
        {/* <div className="top-right shadow-sm mb-5 w-1 h-2">Image</div> */}
        <div className="label-top shadow-sm">{createdBy.name}</div>
        <div className="card-body mt-0">
          <div className="clearfix">
            {" "}
            <span style={{fontSize: '12px'}} className="float-start p-3 text-white badge rounded-pill bg-success my-3 mr-5">
              {price} PKR
            </span>{" "}
            <span className="float-end">
              <a href="#" className="small text-muted">
                Reviews
              </a>
            </span>{" "}
          </div>
          <h5  className="card-title">{title}</h5>
          <div className="text-center my-4">
            {" "}
            <a href="#" className="btn btn-warning">
              Check offer
            </a>{" "}
          </div>
          <span className="float-end">
              <a href="#" className="small text-muted">
               By {createdBy.name}
              </a>
            </span>
          {
            (userInfo?._id == createdBy || userInfo.isAdmin) && 
           <Row style={{display: 'flex', justifyContent: 'space-between'}}>
              <Button
            variant="danger"
            className="btn-sm"
            onClick={(e) => deleteHandler(_id, e)}
          >
            <i className="fas fa-trash" ></i>
          </Button>
{
  noOfUpdates<3 ?
  
  <Button
  variant="success"
  className="btn-sm"
  onClick={(e)=>updateHandler(_id, e)}
>
           <i class="fas fa-pen" ></i>

</Button>
  :''
}
           </Row>
          }
          {/* <div className="clearfix mb-1">
            {" "}
            <span className="float-start">
              <i className="far fa-question-circle" />
            </span>{" "}
            <span className="float-end">
              <i className="fas fa-plus" />
            </span>{" "}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default PaidServiceCard;
