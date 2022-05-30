import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { Button, Form } from "react-bootstrap";
import { useSelector } from 'react-redux';


function FeedbackForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [feedbacks, setFeedbacks] = useState("");

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const handleFeedback= async (e)=>{
        e.preventDefault()
        const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
      
          const { data } = await axios.post(`/api/feedback`, {
              title,
              description,
              feedbackProvider: userInfo
          }, config)
      console.log('Feedback sent: ', data)
      setTitle('')
      setDescription('')
    }

    useEffect(async()=>{
        const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
      
          const { data } = await axios.get(`/api/feedback`, config)
          setFeedbacks(data)
        //   alert(JSON.stringify(data[0].feedbackProvider.name))

      console.log('Feedback sent: ', data)
    },[])
  
  return ( 
    <div  >
        {
            userInfo.isAdmin?
            <>
            <h1 className='text-center' >Feedbacks</h1>
            {
                feedbacks?
                feedbacks.map((feedback)=>{
                    return(
                        <div style={{border: '2px solid black', borderRadius: '5px', padding: '10px' }} >
                        <h4>User: <br /> {feedback.feedbackProvider.name}</h4>
                        <h3>Title: <br /> {feedback.title}</h3>
                        <p className='text-center' >Description: <br /> {feedback.description}</p>
                    </div>
                    )
                })
                :
                <h1>'No Feedbacks yet..'</h1>
            }
            </>
            
            :
            <>
            <h1 className='text-center' >Feedback</h1>
        <form onSubmit={handleFeedback} >
        <Form.Group controlId="name">
                <Form.Label>Feedback Title</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className='mt-3' controlId="description">
                <Form.Label>Feedback Description</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button
                type="submit"
                className="align-self-center mt-5"
                variant="success"
              >
                Submit
              </Button>
        </form>
       <div className='text-center mt-3' >
       <img width={'50%'} src={`https://d2tnst4joh66uk.cloudfront.net/wp-content/uploads/2019/01/Tech1-1.gif`} alt="" />
       </div>
            </>
        }
    </div>
  )
}

export default FeedbackForm