import {useState, useEffect,} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import{Routes,Route, Link} from 'react-router-dom'
import Profile from './components/Profile'
import Timeline from './components/Timeline'
import Login from './components/Login'
import Post from './components/Post'
import Register from './components/Register'
import Grows from './components/Grows'
import Strains from './components/Strains'
import {Container, Nav, NavDropdown, Offcanvas, Form, FormControl, Button} from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import postimg from './post.png'
const App = (props) => {

const componentDidMount = ()=>{
  this.props.history.push('/about')
}

  return(<>


    <Navbar bg="light" expand={false}>
  <Container fluid>
    <Navbar.Brand href="#">FlowerBedv2</Navbar.Brand>
    <Navbar.Toggle aria-controls="offcanvasNavbar" />
    <Navbar.Offcanvas
      id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel"
      placement="end"
    >
      <Offcanvas.Header closeButton>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="justify-content-end flex-grow-1 pe-3">
        <Link to='/strains'>Strains</Link>
        <Link to='/grows'>Grows</Link>
        <Link to='/profile'>My Profile</Link>
        <Link to='/timeline'>Home</Link>
        <Link to='/post'>New Post</Link>
            <NavDropdown.Divider />
        </Nav>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Offcanvas.Body>
    </Navbar.Offcanvas>
  </Container>
</Navbar>

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


    </>
  )
}

export default App;
