import React, { useState } from 'react'
import axios from 'axios'

export default function Patient() {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [doctor, setDoctor] = useState("")
  const [disease, setDisease] = useState("")
  const [weight, setWeight] = useState("")
  function addPatient() {
    if (name && age && gender && weight && disease && doctor) {
      axios.post("https://doc-back.onrender.com/patients", {
        name, age, disease, gender, doctor, weight
      })
        .then((res) => {
          if (res.status === 201)
            alert("Data stored successfully")
        })
        setName("")
        setAge("")
        setGender("")
        setDisease("")
        setDoctor("")
        setWeight("")
    }
    else {
      alert("Fill all details")
    }
  }
  return (
    <div className='patient-details'>
      <p>
        <input
          placeholder='Enter patient name'
          value={name}
          onChange={(e) => setName(e.target.value)} />
      </p>
      <p>
        <input
          placeholder='Enter patient age'
          value={age}
          onChange={(e) => setAge(e.target.value)} />
      </p>
      <p>
        <input
          placeholder='Enter gender'
          value={gender}
          onChange={(e) => setGender(e.target.value)} />
      </p>
      <p>
        <input
          placeholder='Enter patient disease'
          value={disease}
          onChange={(e) => setDisease(e.target.value)} />
      </p>
      <p>
        <input
          placeholder='Enter patient weight'
          value={weight}
          onChange={(e) => setWeight(e.target.value)} />
      </p>
      <p>
        <input
          placeholder='Enter prefered doctor name'
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)} />
      </p>
      <button onClick={addPatient}>Add Patient</button>
    </div>
  )
}
