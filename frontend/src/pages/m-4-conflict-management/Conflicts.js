import React, { useEffect }  from 'react'
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import { Button, Table } from "react-bootstrap";
import Loader from "../../components/Loader";
import {
  deleteRentPost,
  rentPostsListAnalytics,
} from "../../actions/rentActions";
import {
  deletePaidService,
  paidServicesListAnalytics,
} from "../../actions/paidServiceActions";
import {
  deletecommunityServicePost,
  myCommunityServicePosts,
} from "../../actions/communityServiceActions";
import { RENT_DELETE_RESET } from "../../constants/rentConstants";
import { COMMUNITY_SERVICE_DELETE_RESET } from "../../constants/communityServiceConstants";
import { PAID_SERVICES_DELETE_RESET } from "../../constants/paidServiceConstants";
import { listMyOrdersAsBuyer } from '../../actions/orderActions';
import { LinkContainer } from 'react-router-bootstrap';
import { getMyDisputes } from '../../actions/disputeActions';


function Conflicts({history}) {

    const dispatch = useDispatch();
  const rentPostList = useSelector((state) => state.rentPosts);
  const { loading: rentLoading, error: rentError, rentPosts } = rentPostList;
  const myDisputesStoreList = useSelector((state) => state.getMyDisputesReducerStore);
 
  const {
    loading: disputesLoading,
    error: disputesError,
    myDisputes
  } = myDisputesStoreList;


  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;



    
  useEffect(() => {
    if (userInfo) {
     
      dispatch(getMyDisputes(userInfo._id)) 
  
        // alert(JSON.stringify(myDisputesStoreList))
    } else {
      history.push("/login");
    }
    return () => {
    
    };
  }, [
    dispatch,
    userInfo._id,
    userInfo,
    history
    
  ]);



  return (
    <div>
        <h1 className='text-center' >My Disputes</h1>
       {
           disputesLoading? 
           
           <Loader/>
           :
           disputesError ?
           <Message variant="danger">{disputesError}</Message>
           :
           <Table striped bordered hover responsive className="table-sm">
           <thead>
             <tr>
               <th>ID</th>
               <th>Title</th>
               <th>Price</th>
               <th>Dispute Created by</th>
               <th>Dsipute Status</th>
               <th>Is Paid</th>
               <th>Created At</th>
               <th colSpan={2} >Actions</th>
             </tr>
           </thead>
           <tbody>

             {myDisputes?.service?.map((order) => (
               <tr key={order._id}>
                 <td>{order._id}</td>
                 <td>{order.title}</td>
                 <td>{order.price}</td>
                 <td>{order.disputeCreatedBy.name}</td>
                 <td>{order.disputeStatus}</td>
                 <td>{order.title}</td>
                 <td>{order?.createdAt}</td>
                 <td>  <LinkContainer to={`/conflict/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Open Dispute
                    </Button>
                  </LinkContainer></td>
                 <td>
                   {" "}
                   {disputesLoading ? (
                     <Loader />
                   ) : (
                    <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                   )}
                 </td>
               </tr>
             ))}
           </tbody>
         </Table>
       }
    </div>
  )
}

export default Conflicts