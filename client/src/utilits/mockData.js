import { useEffect, useState } from 'react'
import professions from '../mockData/professions.json'
import qualities from '../mockData/qualities.json'
// import users from '../mockData/users.json'
import httpServise from '../services/http.service'

const useMockData = () => {
  const statusConst = {
    idle: 'Not Started',
    pending: 'In Process',
    success: 'Ready',
    error: 'Error occured'
  }
  const [error, setError] = useState(null)
  const [status, setStatus] = useState(statusConst.idle)
  const [progress, setProgress] = useState(0)
  const [count, setCount] = useState(0)

  const summaryCount = professions.length + qualities.length

  const incrementCount = () => {
    setCount((prev) => prev + 1)
  }

  const updateProgress = () => {
    if (count !== 0 && status === statusConst.idle) {
      setStatus(statusConst.pending)
    }
    const newProgress = Math.floor((count / summaryCount) * 100)
    if (progress < newProgress) {
      setProgress(() => newProgress)
    }
    if (newProgress === 100) {
      setStatus(statusConst.success)
    }
  }
  useEffect(() => {
    updateProgress()
  }, [count])

  async function initialize() {
    try {
      for (const prof of professions) {
        await httpServise.put('profession/' + prof._id, prof)
        incrementCount()
      }
      // for (const user of users) {
      //   await httpServise.put('user/' + user._id, user)
      //   incrementCount()
      // }
      for (const quality of qualities) {
        await httpServise.put('quality/' + quality._id, quality)
        incrementCount()
      }
    } catch (error) {
      setError(error)
      setStatus(statusConst.error)
    }
  }

  return { error, initialize, progress, status }
}

export default useMockData
