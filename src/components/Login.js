import {createContext, useRef, useState, useEffect, useContext, useMemo} from 'react'
import AuthContext from '../context/AuthProvider'
import App from '../App'
import Profile from './Profile'
import axios from 'axios'
const LOGIN_URL = '/auth'


const UserContext = createContext('')

const Login = () => {
  const {setAuth} = useContext(AuthContext)
  const userRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)
  const [currentUser, setCurrentUser] = useState('')
  const [registerCheck, setRegisterCheck] = useState(false)
  const value = useMemo(
    () => ({currentUser, setCurrentUser}),
    [currentUser]
  )
  useEffect(()=> {
    userRef.current.focus()
  }, [])

  useEffect(()=> {
    setErrMsg('')
  }, [user, password])
  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const response = await axios.post('https://flowerbedv2back.herokuapp.com/auth',
      {
        username: user,
        password: password

      }
    )
    console.log(JSON.stringify(response?.data));
    if (response.data.username!==user){
      setErrMsg('Username/Password is Incorrect')
    }else{
      setCurrentUser(user)
      setPassword('')
      setSuccess(true)
    }
  } catch (err) {
    if (!err?.response) {
      setErrMsg('No Server Response')
    }
    else if (err.response?.status === 400){
      setErrMsg('Missing Username or Password')
    }
    else if (err.response?.status === 401){
      setErrMsg('Unauthorized')
    }
    else {
      setErrMsg('Login Attempt Failed')
    }
    errRef.current.focus()
  }
  }

  return (
    <>
      {success ? (
        <section>
        <UserContext.Provider value={{currentUser, setCurrentUser}}>
          <App user={currentUser} />
        </UserContext.Provider>
        </section>
      ): (
        <section>
          <p ref={errRef} className={errMsg? 'errmsg': 'offscreen'} aria-live='assertive'>{errMsg}</p>
          <h1>Welcome to TheFlowerBedv2</h1>
          <h2>Please sign in or create an account!</h2>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='username'>Username: </label>
          <input
            type='text'
            id='username'
            ref={userRef}
            autoComplete='off'
            onChange={(e)=> setUser(e.target.value)}
            value={user}
            required
            />
            <br />
            <label htmlFor='password'>Password: </label>
            <input
            type='password'
            id='password'
            onChange={(e)=> setPassword(e.target.value)}
            value={password}
            required
            />
            <br />
            <button>Sign In</button>
          </form>
            <p> Need an Account?<br />
            </p>
          </section>
      )
    }
  </>
  )
}
export default Login
