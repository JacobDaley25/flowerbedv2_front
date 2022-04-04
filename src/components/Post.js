import {useState, useEffect} from 'react'
import axios from 'axios'
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
<form className='form' onSubmit={handleNewFormSubmit}>
<input type='hidden' value={props.user} />
Title: <input type='text' onChange={handleNewTitleChange} /><br />
Body: <input type='text' onChange={handleNewBodyChange} /><br />
<input type='submit' value='Send' />
</form>
</div>
}
</>


}

export default Post
