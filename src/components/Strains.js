import {useState, useEffect} from 'react'
import axios from 'axios'

const Strains = () => {
  const [strains, setStrains]=useState([])
  const [newName, setNewName]=useState('')
  const [newType, setNewType]=useState('')
  const [newBody, setNewBody] = useState('')
  const [newImage, setNewImage] = useState('')

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
    <h1>Strains of the Weed World</h1>
    </aside>
    {
      strains.map((strain)=>{
        return <>
        <div className='strainCard' key={strain._id}>
        <h3 className='textdata'>{strain.name}</h3>
        <img src={strain.image} />
        <p className='strainType'>{strain.type}</p>
        <p className='description'>{strain.body}</p>
        </div>
        </>
  })
  }
  </div>)
}




export default Strains
