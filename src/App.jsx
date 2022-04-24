import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DisplayCard from './DisplayCard';

const App = () => {

  const [studentsData, setStudentsData] = useState([])
  const [search, setSearch] = useState("")

  const fetchData = () => {
    axios.get(`https://api.hatchways.io/assessment/students`)
      .then(res => {
        const students = res.data.students
        // console.log(students)
        setStudentsData(students)
      })
  }

  useEffect(fetchData, [])

  const helperFuncAverage = (array) => {
    const sum = array.reduce((prev, cur) => parseInt(prev) + parseInt(cur), 0)
    const average = sum / array.length
    return average
  }
  
  const handleChange = (e) => {
    setSearch(e.target.value)
    console.log(search)
  }

  console.log('no object', studentsData)

  const getFilteredStudents = (e) => {
    let searchTerm = search.toLowerCase()
    return studentsData.filter(s => {
      let firstName = s.firstName.toLowerCase()
      let lastName = s.lastName.toLowerCase()
      return firstName.includes(searchTerm) || lastName.includes(searchTerm)
    })
  }

  const studentData = getFilteredStudents()

  const eachStudent = studentData.map((student, i) => {
    return <DisplayCard student={student} i={i} helperFuncAverage={helperFuncAverage} />
  })

  return (
    <div className='most-outter-wrapper'>
      <div className='wrapper-holder'>
        <div className='search-wrapper'>
          <label htmlFor="student-search"></label>
          <input
            id='student-search'
            type="text"
            placeholder="Search by name"  
            value={search}
            onChange={handleChange}
          />
        </div>

        {/* apply css to this student card */}
        <div className='student-card-wrapper'>
          {eachStudent}
        </div>
      </div>
    </div>
  );
}

export default App;
