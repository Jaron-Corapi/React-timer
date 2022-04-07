import React, {useEffect, useState} from 'react'
import './index.css'

const Timer = () => {
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)

  function toggle() {
    setIsActive(!isActive)
  }

  function reset() {
    setSeconds(0);
    setIsActive(false)
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prevTime => prevTime + 1); //10
      }, 1000); //10
    } else if (!isActive && seconds !== 0){
      clearInterval(interval);
      }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <>
    <div className='container'>
    <h4>Here be the timer: </h4>
    <span>{('0' + Math.floor((seconds / 3600) % 24))} hours, </span>
    <span>{('0' + Math.floor((seconds / 60) % 60)).slice(-2)} minutes, </span>
    <span>{('0' + seconds % 60).slice(-2)} seconds, </span>
    </div>
    <button className='btn' onClick={toggle}>{`${isActive ? 'Pause' : 'Start'}`}</button>
    <button className='btn' onClick={reset}>
      Reset
    </button>
    </>
  )
}

//Math.floor just rounds the number down ie 5.6 becomes 5 and -5.05 becomes -6
    

export default Timer