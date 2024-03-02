import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    // Fetch doctors data
    axios.get('https://doc-back.onrender.com/doctors')
      .then(response => setDoctors(response.data))
      .catch(error => console.error('Error fetching doctors:', error));

    // Fetch patients data
    axios.get('https://doc-back.onrender.com/patients')
      .then(response => setPatients(response.data))
      .catch(error => console.error('Error fetching patients:', error));
  }, []);

  const handleDoctorChange = (e) => {
    const selectedDoctorId = parseInt(e.target.value, 10);
    const doctor = doctors.find(doc => doc.id === selectedDoctorId);
    setSelectedDoctor(doctor);
  };

  return (
    <div>
      <h1>Doctor & Patient Information</h1>
      <label htmlFor="doctorSelect">Select a Doctor:</label>
      <select id="doctorSelect" onChange={handleDoctorChange} value={selectedDoctor ? selectedDoctor.id : ''}>
        <option value="">Select Doctor</option>
        {doctors.map(doctor => (
          <option key={doctor.id} value={doctor.id}>
            {doctor.name}
          </option>
        ))}
      </select>

      <div>
        {selectedDoctor ? (
          <div>
            <h2>Selected Doctor: {selectedDoctor.name}</h2>
            <h3>Patients Assigned:</h3>
            <ul>
              {patients
                .filter(patient => patient.doctor === selectedDoctor.name)
                .map(patient => (
                  <li key={patient.id}>
                    {patient.name} - {patient.disease}
                  </li>
                ))}
            </ul>
          </div>
        ) : (
          <div>
            <h2>All Doctors</h2>
            <ul>
              {doctors.map(doctor => (
                <li key={doctor.id}>
                  {doctor.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

// import React from 'react'
// import { BrowserRouter,Routes,Route } from 'react-router-dom'
// import Home from './Home/Home'
// import Navigation from './Navigation'
// import Doctor from './Doctors/Doctor'
// import Patient from './Patients/Patient'
// import './App.css'

// export default function App() {
//   return (
//     <div>
//       <BrowserRouter>
//       <Navigation/>
//         <Routes>
//           <Route path="/" element={<Home/>}/>
//           <Route path="/doctor" element={<Doctor/>}/>
//           <Route path="/patient" element={<Patient/>}/>
//         </Routes>
//       </BrowserRouter>
//     </div>
//   )
// }

