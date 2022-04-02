import {useState, useEffect,} from 'react'
import About from './components/About'
import axios from 'axios'
import{Routes,Route, Link} from 'react-router-dom'
import Profile from './components/Profile'
import Timeline from './components/Timeline'
import Login from './components/Login'
import Post from './components/Post'
import Register from './components/Register'
import postimg from './post.png'
const App = (props) => {

const componentDidMount = ()=>{
  this.props.history.push('/about')
}

  return(<>
    <h1>TheFlowerBedv2</h1>
    <nav>
      <ul>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/profile'>My Profile</Link></li>
        <li><Link to='/timeline'>Home</Link></li>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/register'>Register</Link></li>
        <li><Link to='/post'><img className='new-post' src={postimg} alt='New Post' /></Link></li>
      </ul>
    </nav>

    <div className='main'>
      <Routes>
        <Route path='/about' element={<About user={props.user} />} />
        <Route path='/profile' element={<Profile user={props.user}/>} />
        <Route path='/timeline' element={<Timeline user={props.user} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/post' element={<Post user={props.user} />} />
      </Routes>
    </div>
    </>
  )
}

export default App;
