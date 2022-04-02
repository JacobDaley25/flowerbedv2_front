import {useState, useEffect} from 'react'
import axios from 'axios'

const Timeline = (props) => {
  const [posts, setPosts] = useState([])

  useEffect(()=>{
    axios
      .get('https://flowerbedv2back.herokuapp.com/posts')
      .then((response)=>{
        setPosts(response.data)
      }, [])
  })
  return <>
  <div className='container'>
  {
    posts.map((post)=>{
      return <div className='postcard' kay={post._id}>
      <h1 className='postedBy'>{post.username}</h1>
      <h3 className='textdata'>{post.title}</h3>
      <p className='text'>{post.body}</p>
      </div>
    })
  }
  </div>
  </>
}
export default Timeline
