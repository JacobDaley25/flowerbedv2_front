import {useState, useEffect} from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/form'
import Button from 'react-bootstrap/button'
const Post = (props) => {
const [posts, setPosts]=useState([])
const [newTitle, setNewTitle]=useState('')
const [newBody, setNewBody]=useState('')
const [newReply, setNewReply]=useState('')
const [success, setSuccess]=useState(false)



const handleNewFormSubmit = (event) => {
event.preventDefault()
axios.post(
  'https://flowerbedv2back.herokuapp.com/posts',{
    username: props.user,
    title: newTitle,
    body: newBody

  }
).then((response)=>{
  axios
    .get('https://flowerbedv2back.herokuapp.com/posts')
    .then((response)=>{
      setPosts(response.data)
      setNewTitle('')
      setNewBody('')
      setSuccess(true)
    })
})
}

const handleNewTitleChange = (event) => {
  setNewTitle(event.target.value)
}
const handleNewBodyChange = (event) => {
  setNewBody(event.target.value)
}

return <>
{success ? <h1>Post Sent!</h1>:
<div className='container'>
<h1>New Post</h1>
<Form className='form' onSubmit={handleNewFormSubmit}>
<Form.Group className='mb-3' controlId='formBasicUsername'>
<Form.Control type='hidden' value={props.user} />
</Form.Group>
<Form.Group className='mb-3' controlId='formBasicTitle'>
<Form.Label>Title :</Form.Label>
<Form.Control type='text' onChange={handleNewTitleChange} /><br />
</Form.Group>
<Form.Group className='mb-3' controlId='formBasicBody'>
<Form.Label>Body :</Form.Label>
<Form.Control type='text' onChange={handleNewBodyChange} /><br />
</Form.Group>
<Button varient='primary' type='submit'>Send</Button>
</Form>
</div>
}
</>


}

export default Post
