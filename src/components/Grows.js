import {useState, useEffect} from 'react'
import axios from 'axios'

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

  const handleNewFormSubmit = (event) => {
    event.preventDefault()
    axios.post('https://flowerbedv2back.herokuapp.com/grows', {
      name: newName,
      light: newLight,
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
    <h1>Growing Friends</h1>
    </aside>
    {
      grows.map((grow)=>{
        return <>
        <div className='growCard' key={grow._id}>
        <h3 className='textData'>{grow.name}</h3>
        <img src={grow.image} />
        <p className='growLights'>{grow.lights}</p>
        <p className='location'>{grow.indoorOrOutdoor}</p>
        <p className='growingMedium'>{grow.growingMedium}</p>
        <p className='nutrientsUsed'>{grow.nutrientsUsed}</p>
        <p className='week'>{grow.week}</p>
        <p className='harvest'>{grow.harvestAmount}</p>
        </div>
        </>
      })
    }
  </div>
  )
}

export default Grows
