const DisplayCard = ({ student, i, helperFuncAverage }) => {
  return (
    <>
      <div className='outter-wrapper'>
        <div className='wrapper-student' key={i} >
          <img className='img' src={student.pic} alt={`picture for ${student.firstName}`} />
          <div>
            <div className='fullname-inline'>
              <h2 className='firstName'>{student.firstName}</h2>
              <h2 className='lastName'>{student.lastName}</h2></div>
            <div className='wrapper-inner-content'>
              <p className='content'>Email: {student.email}</p>
              <p className='content'>Company: {student.company}</p>
              <p className='content'>Skill: {student.skill}</p>
              <p className='content'>average: {helperFuncAverage(student.grades)}%</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DisplayCard