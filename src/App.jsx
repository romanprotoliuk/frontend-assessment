import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DisplayCard from './DisplayCard';
import ScoreList from './ScoreList';

const App = () => {

  const [studentsData, setStudentsData] = useState([])
  const [tag, setTag] = useState([])
  const [search, setSearch] = useState("")
  const [tagFilter, setTagFilter] = useState("")
  

  const fetchData = () => {
    axios.get(`https://api.hatchways.io/assessment/students`)
      .then(res => {
        const students = res.data.students
        students.forEach((student) => {
          student.tags = []
        })
        setStudentsData(students)
      })
  }

  useEffect(fetchData, [])

  const helperFuncAverage = (array) => {
    const sum = array.reduce((prev, cur) => parseInt(prev) + parseInt(cur), 0)
    const average = sum / array.length
    return average
  }
  console.log(studentsData)
  

  const addTag = (str, i) => {
    const studentDataTag = [...studentsData];
    studentDataTag[i].tags.push(str);
    console.log(studentDataTag[i])
  };

  const handleChangeName = (e) => {
    setSearch(e.target.value)
    console.log(search)
  }

  const handleChangeTag = (e) => {
    setTagFilter(e.target.value)
    console.log(tagFilter)
  }

  const getFilteredStudentsByName = (e) => {
    let searchTerm = search.toLowerCase()
    return studentsData.filter(s => {
      let firstName = s.firstName.toLowerCase()
      let lastName = s.lastName.toLowerCase()
      return firstName.includes(searchTerm) || lastName.includes(searchTerm)
    })
  }

  const getFilteredStudentsByTag = (e) => {
    let searchTerm = tagFilter.toLowerCase()
    let searchTagsArray = []
    let tagExists = false
    
    studentsData.forEach(student => {
      student.tags.forEach((tag) => {
        if (tag.toLowerCase().includes(searchTerm)) {
          tagExists = true
        }
      })

      if (!searchTerm || tagExists) {
        searchTagsArray.push(student)
      }
    })
    return searchTagsArray
  }

  const studentDataByName = getFilteredStudentsByName()
  const studentDataByTag = getFilteredStudentsByTag()
  const combinedFilteredStudents = []

  studentDataByName.forEach((student) => {
    if (studentDataByTag.includes(student)) {
      combinedFilteredStudents.push(student)
    }
  })

  const eachStudent = combinedFilteredStudents.map((student, i) => {
    return <DisplayCard student={student} i={i} helperFuncAverage={helperFuncAverage} tag={tag} setTag={setTag} addTag={addTag}/> 
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
            onChange={handleChangeName}
          />
        </div>
        <div className='search-wrapper'>
          <label htmlFor="student-search"></label>
          <input
            id='student-search'
            type="text"
            placeholder="Search by tag"  
            value={tagFilter}
            onChange={handleChangeTag}
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
