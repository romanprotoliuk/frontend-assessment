import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const App = () => {

  const [studentsData, setStudentsData] = useState([])

  const fetchData = () => {
    axios.get(`https://api.hatchways.io/assessment/students`)
      .then(res => {
        const students = res.data.students
        console.log(students)
        setStudentsData(students)
      })
  }

  useEffect(fetchData, [])

    const helperFuncAverage = (array) => {
      const sum = array.reduce((prev, cur) => parseInt(prev) + parseInt(cur), 0)
      const arrLength = array.length
      const average = sum / arrLength
      
      return average
    }
    
  const eachStudent = studentsData.map((student, i) => {
    return <div className='wrapper-student' key={i}><img src={student.pic} alt={`picture for ${student.firstName} ${student.lastName}`} /> <div className='fullname-inline'><h2 className='firstName'>{student.firstName}</h2><h2 className='lastName'>{student.lastName}</h2></div><p>Email: {student.email}</p><p>Company: {student.company}</p><p>Skill: {student.skill}</p><p>average: {helperFuncAverage(student.grades)}%</p></div> 
  })
  
  


  return (
    <>
      {eachStudent}
    </>
  );
}

export default App;
