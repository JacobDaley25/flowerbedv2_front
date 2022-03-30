import {useState, useEffect,} from 'react'
import About from './components/About'
import{Routes,Route, Link} from 'react-router-dom'
import Profile from './components/Profile'
import Timeline from './components/Timeline'
import Login from './components/Login'
import Register from './components/Register'
const App = () => {

  const componentDidMount = ()=>{
    this.props.history.push('/about')
  }

  return(<>
    <h1>hi</h1>
    <nav>
      <ul>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/profile'>My Profile</Link></li>
        <li><Link to='/timeline'>Home</Link></li>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/register'>Register</Link></li>
      </ul>
    </nav>

    <div className='main'>
      <Routes>
        <Route path='/about' component={About} />
        <Route path='/profile' component={Profile} />
        <Route path='/timeline' component={Timeline} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </Routes>
    </div>
    </>
  )
}

export default App;
