import {useState, useEffect} from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import App from '../App'
const Profile = (props) => {
  const [posts, setPosts] = useState([])

  useEffect(()=>{
    axios
      .get('https://flowerbedv2back.herokuapp.com/posts')
      .then((response)=>{
        setPosts(response.data)
      }, [])
  })

  const handleDelete = (postData) => {
    axios
      .delete(`https://flowerbedv2back.herokuapp.com/posts/${postData._id}`)
      .then(() => {
        axios
          .get('https://floerbedv2back.herokuapp.com/posts')
          .then((response)=> {
            setPosts(response.data)
          })
      })
  }
  return(
  <>
  <div className='container'>
  <h1> Hi there, {props.user}!</h1>
  <h1>Followers:0 Following:0</h1>
  <h1>Your Posts</h1>
    {
      posts.filter(posts=> posts.username === props.user).map((post)=> {
      return <Card className='postcard' key={post._id}>
      <Card.Body>
      <h1 className='postedBy'>{post.username}</h1>
      <h3 className='textdata'>{post.title}</h3>
      <p className='text'>{post.body}</p>
      <button onClick={ (event)=>{handleDelete(post) } }>Delete</button>
      </Card.Body>
      </Card>
    }
  )
  }
  </div>
  </>
)
}
export default Profile
