const ScoreList = ({ grades }) => {
  
  const renderScore = grades.map((grade, i) => {
    return <div className="grade-wrapper"><p className="test-grade">Test {i + 1}</p><p className="grade-percent">{grade}%</p></div>
  })

  return (
    <>
      {renderScore}
    </>
  )
}

export default ScoreList