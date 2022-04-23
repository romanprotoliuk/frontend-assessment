import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const App = () => {

  const [studentsData, setStudentsData] = useState([])

  const fetchData = () => {
    axios.get(`https://api.hatchways.io/assessment/students`)
      .then(res => {
        const students = res.data.students
        setStudentsData(students)
      })
  }

  useEffect(fetchData, [])

    const helperFuncAverage = (array) => {
      const sum = array.reduce((prev, cur) => parseInt(prev) + parseInt(cur), 0)
      const average = sum / array.length
      
      return average
    }
    
  const eachStudent = studentsData.map((student, i) => {
    return <div className='outter-wrapper'><div className = 'wrapper-student' key = { i } ><img className='img' src={student.pic} alt={`picture for ${student.firstName} ${student.lastName}`} /><div><div className='fullname-inline'><h2 className='firstName'>{student.firstName}</h2><h2 className='lastName'>{student.lastName}</h2></div><div className='wrapper-inner-content'><p className='content'>Email: {student.email}</p><p className='content'>Company: {student.company}</p><p className='content'>Skill: {student.skill}</p><p className='content'>average: {helperFuncAverage(student.grades)}%</p></div></div></div></div>
  })
  
  


  return (
    <div className='most-outter-wrapper'>
      <div className='wrapper-holder'>
        {eachStudent}
      </div>
    </div>
  );
}

export default App;
