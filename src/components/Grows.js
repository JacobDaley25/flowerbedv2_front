import {useState, useEffect} from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/button'
import Form from 'react-bootstrap/form'
import Card from 'react-bootstrap/card'

const Grows = () => {
  const [grows, setGrows] = useState([])
  const [newName, setNewName] = useState('')
  const [newLight, setNewLight] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [newImage, setNewImage] = useState('')
  const [newMedium, setNewMedium] = useState('')
  const [newNutrients, setNewNutrients] = useState('')
  const [newWeek, setNewWeek] = useState(0)
  const [newHarvestAmount, setNewHarvestAmount] = useState('')
  const [addCheck, setAddCheck] = useState(false)

  useEffect(()=>{
    axios
      .get('https://flowerbedv2back.herokuapp.com/grows').then((response)=>{
        setGrows(response.data)
      })
  }, [])

  const showAddForm = () => {
    setAddCheck(!addCheck)
  }

  const handleNewFormSubmit = (event) => {
    event.preventDefault()
    axios.post('https://flowerbedv2back.herokuapp.com/grows', {
      name: newName,
      lights: newLight,
      indoorOrOutdoor: newLocation,
      image: newImage,
      growingMedium: newMedium,
      nutrientsUsed: newNutrients,
      week: newWeek,
      harvestAmount: newHarvestAmount
    }).then((response)=>{
      axios.get('https://flowerbedv2back.herokuapp.com/grows')
      .then((response)=>{
        setGrows(response.data)
        setNewName('')
        setNewLight('')
        setNewLocation('')
        setNewImage('')
        setNewMedium('')
        setNewNutrients('')
        setNewWeek(0)
        setNewHarvestAmount('')
      })
    })
  }
  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNewLightChange = (event) => {
    setNewLight(event.target.value)
  }
  const handleNewLocationChange = (event) => {
    setNewLocation(event.target.value)
  }
  const handleNewImageChange = (event) => {
    setNewImage(event.target.value)
  }
  const handleNewMediumChange = (event) => {
    setNewMedium(event.target.value)
  }
  const handleNewNutrientsChange = (event) => {
    setNewNutrients(event.target.value)
  }
  const handleNewWeekChange = (event) => {
    setNewWeek(event.target.value)
  }
  const handleNewHarvestAmount = (event) => {
    setNewHarvestAmount(event.target.value)
  }
  return(
    <div className='growing-container'>
    <aside>
    <h1>Growing Friends <Button onClick={showAddForm} variant='success'>+</Button></h1>
    { addCheck ? (
      <Form onSubmit={handleNewFormSubmit}>
    <Form.Group className='mb-3' controlId='formBasicGrow'>
      <Form.Label>Strain Name</Form.Label>
      <Form.Control type = 'text' placeholder='Pineapple Express' onChange={handleNewNameChange} />
    </Form.Group>

    <Form.Group className='mb-3' controlId='formBasicLight'>
      <Form.Label>Lights</Form.Label>
      <Form.Control type = 'text' placeholder='SF1000D' onChange={handleNewLightChange} />
    </Form.Group>

    <Form.Group className='mb-3' controlId='formBasicLocation'>
      <Form.Label>Grow Location</Form.Label>
      <Form.Control type = 'text' placeholder='indoor or outdoor' onChange={handleNewLocationChange} />
    </Form.Group>

    <Form.Group className='mb-3' controlId='formBasicImage'>
      <Form.Label>Image</Form.Label>
      <Form.Control type = 'text' placeholder='Image link' onChange={handleNewImageChange} />
    </Form.Group>

    <Form.Group className='mb-3' controlId='formBasicMedium'>
      <Form.Label>Grow Medium</Form.Label>
      <Form.Control type = 'text' placeholder='Coco Coir' onChange={handleNewMediumChange} />
    </Form.Group>

    <Form.Group className='mb-3' controlId='formBasicNutrients'>
      <Form.Label>Nutrients Used</Form.Label>
      <Form.Control type = 'text' placeholder='FF Trio' onChange={handleNewNutrientsChange} />
    </Form.Group>

    <Form.Group className='mb-3' controlId='formBasicWeek'>
      <Form.Label>Current Week</Form.Label>
      <Form.Control type = 'number' placeholder='1' onChange={handleNewWeekChange} />
    </Form.Group>

    <Form.Group className='mb-3' controlId='formBasicHarvest'>
      <Form.Label>Harvest Amount</Form.Label>
      <Form.Control type = 'text' placeholder='206 gs' onChange={handleNewHarvestAmount} />
    </Form.Group>
    <Button varient='primary' type='submit'>Submit</Button>
    </Form>
  ):null}
    </aside>
    {
      grows.map((grow)=>{
        return <>
        <Card className='growCard' key={grow._id}>
        <Card.Img src={grow.image} />
        <Card.Body>
        <Card.Title className='textData'>Breeder and Strain: {grow.name}</Card.Title>
        <Card.Text>
        <p className='growLights'>Lights:{grow.lights}</p>
        <p className='location'>Location:{grow.indoorOrOutdoor}</p>
        <p className='growingMedium'>Growing Medium:{grow.growingMedium}</p>
        <p className='nutrientsUsed'>Nutrients Used:{grow.nutrientsUsed}</p>
        <p className='week'>Week:{grow.week}</p>
        <p className='harvest'>Harvest Amount:{grow.harvestAmount}</p>
        </Card.Text>
        </Card.Body>
        </Card>
        </>
      })
    }
  </div>
  )
}

export default Grows
