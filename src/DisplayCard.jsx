import ScoreList from "./ScoreList"
import { useState } from "react"

const DisplayCard = ({ student, i, helperFuncAverage }) => {

  const [open, setOpen] = useState(false)

  const handleOnClick = () => {
    setOpen(!open)

  }

  return (
    <>
      <div onClick={handleOnClick} className='outter-wrapper'>
        <div className='wrapper-student' key={i} >
          <div className="img-and-name">
            <div>
              <img className='img' src={student.pic} alt={`picture for ${student.firstName}`} />
            </div>
            <div className='fullname-inline'>
              <div className="name-inline">
                <h2 className='firstName'>{student.firstName}</h2>
                <h2 className='lastName'>{student.lastName}</h2>
              </div> 
              <div className='wrapper-inner-content'>
                <p className='content'>Email: {student.email}</p>
                <p className='content'>Company: {student.company}</p>
                <p className='content'>Skill: {student.skill}</p>
                <p className='content last-average'>average: {helperFuncAverage(student.grades)}%</p>
                <div className="test-scores">
                  { open ? <ScoreList grades={student.grades} /> : ''}
                </div>
              </div>
            </div>

          </div>
          <div>
            <div className="open-wrapper" onClick={() => console.log('click')}>
              <div className="line-horizontal"></div>
              {open ? <div className="line-vertical" style={{visibility: 'hidden'}}></div>  : <div className="line-vertical"></div>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DisplayCard