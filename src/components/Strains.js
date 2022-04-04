import {useState, useEffect} from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/button'
import Form from 'react-bootstrap/form'
import Card from 'react-bootstrap/card'
import Row from 'react-bootstrap/row'
import Col from 'react-bootstrap/col'
import Carousel from 'react-bootstrap/carousel'
import bannerimg1 from '../bannerimg1.png'
import bannerimg2 from '../bannerimg2.png'
import bannerimg3 from '../bannerimg3.png'
const Strains = () => {
  const [strains, setStrains]=useState([])
  const [newName, setNewName]=useState('')
  const [newType, setNewType]=useState('')
  const [newBody, setNewBody] = useState('')
  const [newImage, setNewImage] = useState('')
  const [addCheck, setAddCheck] = useState(false)


  useEffect(()=>{
    axios
      .get('https://flowerbedv2back.herokuapp.com/strains').then((response)=>{
        setStrains(response.data)
      })
  },[])
  const showAddForm = () => {
    setAddCheck(!addCheck)
  }

  const handleNewFormSubmit = (event) => {
    event.preventDefault()
    axios.post('https://flowerbedv2back.herokuapp.com/strains',
  {
    name: newName,
    type: newType,
    image: newImage,
    body: newBody
  }).then((response)=>{
    axios
      .get('https://flowerbedv2back.herokuapp.com/strains')
      .then((response)=>{
        setStrains(response.data)
        setNewName('')
        setNewType('')
        setNewBody('')
        setNewImage('')
      })
  })
  }

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNewTypeChange = (event) => {
    setNewType(event.target.value)
  }
  const handleNewBodyChange = (event) => {
    setNewBody(event.target.value)
  }
  const handleNewImageChange = (event) => {
    setNewImage(event.target.value)
  }

  return (
    <div className='strain-container'>
    <aside>
    <h1>Strains of the Weed World <Button onClick={showAddForm} variant="success">+</Button></h1>
    {
      addCheck ? (
        <Form onSubmit={handleNewFormSubmit}>
  <Form.Group className="mb-3" controlId="formBasicStrain">
    <Form.Label>Strain Name</Form.Label>
    <Form.Control type="text" placeholder="OG Kush" onChange={handleNewNameChange} />
    <Form.Text className="text-muted">
      Let's work together to index all of the worlds strains.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicType">
    <Form.Label>Type</Form.Label>
    <Form.Control type="text" placeholder="Indica/Sativa/Hybrid" onChange={handleNewBodyChange} />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicImage">
    <Form.Label>Image</Form.Label>
    <Form.Control type="text" placeholder="Image Link Here" onChange={handleNewImageChange} />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicBody">
    <Form.Label>About</Form.Label>
    <Form.Control type="text" placeholder="About the Strain" onChange={handleNewBodyChange} />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
) : null
    }
    </aside>
    <Carousel>
  <Carousel.Item interval={1000}>
    <img
      className="d-block w-100"
      src={bannerimg1}
      alt="First slide"
    />
    <Carousel.Caption>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={500}>
    <img
      className="d-block w-100"
      src={bannerimg2}
      alt="Second slide"
    />
    <Carousel.Caption>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={bannerimg3}
      alt="Third slide"
    />
    <Carousel.Caption>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
    {
      strains.map((strain)=>{
        return <>
        <Row xs={2} md={2} className="g-4">
  {Array.from({ length: 2 }).map((_, idx) => (
    <Col>
        <Card className='strainCard' key={strain._id}>
          <Card.Img varient='top' className='strain-img' src={strain.image} />
          <Card.Body>
            <Card.Title className='textdata'>{strain.name}</Card.Title>
            <Card.Text>
            <p className='strainType'>{strain.type}</p>
            <p className='description'>{strain.body}</p>
            </Card.Text>
          <Button varient='success'>About Me</Button>
          </Card.Body>
        </Card>
        </Col>
  ))}
</Row>
        </>
  })
  }
  </div>)
}




export default Strains
