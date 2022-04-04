import {useState, useEffect} from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/card'
const Timeline = (props) => {
  const [posts, setPosts] = useState([])

  useEffect(()=>{
    axios
      .get('https://flowerbedv2back.herokuapp.com/posts')
      .then((response)=>{
        setPosts(response.data)
      })
  },[])
  return <>
  <div className='container'>
  {
    posts.map((post)=>{
      return <Card className='postcard' kay={post._id}>
      <Card.Body>
      <h1 className='postedBy'>{post.username}</h1>
      <h3 className='textdata'>{post.title}</h3>
      <p className='text'>{post.body}</p>
      <img src={post.img} />
      </Card.Body>
      </Card>
    })
  }
  </div>
  </>
}
export default Timeline
