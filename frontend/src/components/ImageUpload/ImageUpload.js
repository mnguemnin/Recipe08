import axios from 'axios'
import React, {useState} from 'react'

export default function ImageUpload() {
    const [image, setImage]=useState('')
    function handleImage(e){
        console.log(e.target.files)
        setImage(e.target.files)
    }
    const handleApi=()=>{
        const formData=new FormData()
        formData.append('image', image)
        axios.post('url', formData)
    }
  return (
    <div>
        <input
        type='file'
        name='file'
        onChange={handleImage}/>
        <button onClick={handleApi}>Submit</button>
    </div>
  )
}
