import {useRef, useState, useEffect} from 'react'
import axios from 'axios'
import{Routes,Route, Link} from 'react-router-dom'
import {Form,Button }from 'react-bootstrap'
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_].{3,23}$/gm;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/gm;
const REGISTER_URL = '/users';

const Register = () => {
  const userRef = useRef()
  const errorRef = useRef()

  const [user, setUser] = useState('')
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)

  const [matchPassword, setMatchPassword] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [errorMsg, setErrorMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(()=> {
    const result = USER_REGEX.test(user)
    console.log(result);
    console.log(user);
    setValidName(result)
  }, [user])

  useEffect(()=>{
    const result = PASSWORD_REGEX.test(password)
    console.log(result);
    console.log(password);
    setValidPassword(result)
    const match = password === matchPassword
    setValidMatch(match)
  }, [password, matchPassword])
  useEffect(()=> {
    setErrorMsg('')
  }, [user, password, matchPassword])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const v1 = USER_REGEX.test(user)
    const v2 = PASSWORD_REGEX.test(password)
    if(!v1||!v2){
      setErrorMsg('invalid entry')
      return
    }
    try{
      const response = await axios.post('https://flowerbedv2back.herokuapp.com/users', {
        username: user,
        password: password
      }
    )
    console.log(response.data);
    setSuccess(true)
  } catch(error) {
    if(!error?.response) {
      setErrorMsg('no server response')
    }else if (error.response?.status === 400){
      setErrorMsg('Username Taken')
    }else {
      setErrorMsg('Registration Failed')
    }
    errorRef.current.focus()
  }
  }

  return(
    <>
    {success ? (
      <section>
        <h1>Success!</h1>
        <p>
        <Link to='/login'>Login</Link>
        </p>
      </section>
    ) : (
      <section>
        <p ref={errorRef} className={errorMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>{errorMsg}</p>
        <h1>Register</h1>
        <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='formBasicUsername'>
        <Form.Label>Username:</Form.Label>
        <Form.Control
        type='text'
        id='username'
        ref={userRef}
        autoComplete='off'
        onChange={(e)=> setUser(e.target.value)}
        required
        onFocus={()=> setUserFocus(true)}
        onBlur={()=> setUserFocus(false)}
      />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
        <Form.Label>Password:</Form.Label>
        <Form.Control
        type='password'
        id='password'
        onChange={(e)=> setPassword(e.target.value)}
        required
        aria-invalid={validMatch? 'false' : 'true'}
        aria-describedby='passwordnote'
        onFocus={()=> setPasswordFocus(true)}
        onBlue={()=> setPasswordFocus(false)}
        />
        <p>Password Requires an Uppercase,Number, and Special Character </p>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicConfirm'>
        <Form.Label>Confirm Password: </Form.Label>
        <Form.Control
        type='password'
        id='confirm_password'
        onChange={(e)=> setMatchPassword(e.target.value)}
        required
        aria-invalid={validMatch ? 'false' : 'true'}
        aria-describedby='confirmed'
        onFocus={()=>setMatchFocus(true)}
        onBlur={()=>setMatchFocus(false)}
        />
        </Form.Group>
        <Button varient='primary' type='submit'>Sign Up</Button>

      </Form>
      <Link to='/login'>
      Already Registered?</Link>
      <span className='line'>
      </span>
      </section>

    )}
    </>
  )
}
export default Register
