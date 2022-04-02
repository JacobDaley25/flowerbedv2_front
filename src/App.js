import {useState, useEffect,} from 'react'
import About from './components/About'
import axios from 'axios'
import{Routes,Route, Link} from 'react-router-dom'
import Profile from './components/Profile'
import Timeline from './components/Timeline'
import Login from './components/Login'
import Post from './components/Post'
import Register from './components/Register'
import Grows from './components/Grows'
import Strains from './components/Strains'
import postimg from './post.png'
const App = (props) => {

const componentDidMount = ()=>{
  this.props.history.push('/about')
}

  return(<>
    <h1>TheFlowerBedv2</h1>
    <div className='container'>
      <Routes>
        <Route path='/strains' element={<Strains user={props.user} />} />
        <Route path='/grows' element={<Grows user={props.user} />} />
        <Route path='/profile' element={<Profile user={props.user}/>} />
        <Route path='/timeline' element={<Timeline user={props.user} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/post' element={<Post user={props.user} />} />
      </Routes>
    </div>
    <nav>
        <Link to='/strains'>Strains</Link>
        <Link to='/grows'>Grows</Link>
        <Link to='/profile'>My Profile</Link>
        <Link to='/timeline'>Home</Link>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
        <Link to='/post'><img className='new-post' src={postimg} alt='New Post' /></Link>
    </nav>


    </>
  )
}

export default App;
