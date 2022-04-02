import {useState, useEffect} from 'react'
import axios from 'axios'

const Grows = () => {
  const [grows, setGrows] = useState([])
  const [newName, setNewName] = useState('')
  const [newLight, setNewLights] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [newImage, setNewImage] = useState('')
  const [newMedium, setNewMedium] = useState('')
  const [newNutrients, setNewNutrients] = useState('')
  const [newWeek, setNewWeek] = useState('')
  const [newHarvestAmount, setNewHarvestAmount] = useState('')
}

export default Grows
