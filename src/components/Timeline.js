import {useState, useEffect} from 'react'
import axios from 'axios'
import {Card,Button,Form} from 'react-bootstrap'
const Timeline = (props) => {
  const [posts, setPosts] = useState([])
  const [repliesCheck, setRepliesCheck] = useState(false)
  const [newBody, setNewBody] = useState('')
  const [replyCheck, setReplyCheck] = useState(false)


  const handleNewReplySubmit = (postData, event) => {
    event.preventDefault()
    console.log(postData);
    axios.put(`https://flowerbedv2back.herokuapp.com/posts/${postData}`,{
      replies:[{
        username: props.user,
        body: newBody
      }]
    }


    ).then((response)=>{
      axios
        .get('https://flowerbedv2back.herokuapp.com/posts')
        .then((response)=>{
          setPosts(response.data)
          setNewBody('')
          setReplyCheck(false)
        })
    })
  }

  const showReplies = () => {
    setRepliesCheck(!repliesCheck)
  }
const handleNewBodyChange = (event) => {
  setNewBody(event.target.value)
}
  const showReplyForm = () => {
    setReplyCheck(!replyCheck)
  }
  useEffect(()=>{
    axios
      .get('https://flowerbedv2back.herokuapp.com/posts')
      .then((response)=>{
        setPosts(response.data)
      })
  },[])
  return <>
  <div className='container'>
  <h1>The Flower Bedv2  </h1>


  {
    posts.map((post)=>{
      return <Card className='postcard' key={post._id}>
      <Card.Body>
      <h1 className='postedBy'>{post.username}</h1>
      <h3 className='textdata'>{post.title}</h3>
      <p className='text'>{post.body}</p>
      <img src={post.img} />
      <Button onClick={showReplies} varient='primary'>Replies</Button>
      <Button onClick={showReplyForm} variant='primary'>Reply</Button>



      { replyCheck ? (
        <Form onSubmit={ (event) => {handleNewReplySubmit(post._id, event)}}>
      <Form.Group className='mb-3' controlId='formBasicUsername'>
      <Form.Control type='hidden' value={props.user} />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formBasicReply'>
        <Form.Label>Reply</Form.Label>
        <Form.Control type='text' placeholder='Your Reply Here' onChange={handleNewBodyChange} />
        </Form.Group>
      <Button variant='primary' type='submit'>Send</Button>
      </Form>

    ):null}



      { repliesCheck ? ( <div>
        { post.replies.map((reply)=>{
        return <Card className='repliesCard' key={reply._id}>
        <Card.Body>
        <h3 className='repliedBy'>{reply.username}</h3>
        <p className='replyText'>{reply.body}</p>

        </Card.Body>
        </Card>
      })
    }
    </div>
      ):null}
      </Card.Body>
      </Card>
    }).reverse()
  }

  </div>


  </>
}
export default Timeline
