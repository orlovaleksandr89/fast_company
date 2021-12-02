import React from 'react'
import useMockData from '../utilits/mockData'
const Main = () => {
  const { error, initialize, progress, status } = useMockData()
  const handleClick = () => {
    initialize()
  }

  return (
    <div className="container mt-5">
      <h1>Main</h1>
      <ul>
        <li>Status {status}</li>
        <li>Progress {progress}%</li>
        {error && <li>error {error}</li>}
      </ul>
      <button className="btn-primary" onClick={handleClick}>
        Инициализировать
      </button>
    </div>
  )
}

export default Main
