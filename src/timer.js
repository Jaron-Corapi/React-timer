import React, {useEffect, useState} from 'react'
import {Howl, Howler} from 'howler';
import victory from './audio/victory.wav'
import './index.css'

const Timer = () => {
  const [seconds, setSeconds] = useState(1500);
  const [rest, setRest] = useState(300)
  const [isActive, setIsActive] = useState(false)
  const [displayMessage, setDisplayMessage] = useState(false)
  const [session, setSession] = useState(seconds)
  const [color, setColor] = useState(false)

  function toggle() {
    setIsActive(!isActive)
  }
  
  function message() {
    return setDisplayMessage(true)
  }

  function reset() {
    setSeconds(1500);
    setRest(300)
    setSession(1500)
    setIsActive(false)
    setDisplayMessage(false)
    setColor(false)
  }

  function decreaseTime() {
    if (isActive) return
    if (seconds < 60) return
    return setSeconds(seconds - 60), setSession(session - 60)
  }

  function increaseTime() {
    if(isActive) return
    return setSeconds(seconds + 60), setSession(session + 60)
  }

  function increaseBreak() {
    if(isActive) return
    return setRest(rest + 60)
  }

  function decreaseBreak() {
    if(isActive) return
    if (rest < 60) return
    return setRest(rest - 60)
  }

  function playSound(src) {
    let sound = new Howl({src})
    if(seconds <= 1){
    sound.play()
    }
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prevTime => prevTime - 1);
      if(seconds === 0 && displayMessage === false){
        message();
        setSeconds(rest)
        setColor(false)
      } else if(seconds === 0 && displayMessage === true){
        setSeconds(session)
        setDisplayMessage(false)
        setColor(false)
      } else if(seconds <= 61){
        setColor(true)
        playSound(victory);
      } 
      }, 1000);
    } else if (!isActive && seconds !== 0){
      clearInterval(interval);
      }
    return () => clearInterval(interval);
  }, [isActive, seconds, color]);

  return (
    <>
    {/* Work timer */}
    <h2>{displayMessage && 'Break Time!'}</h2>
    <div className='container'>
    <h4>Here be the timer: </h4>
    <section style={{color: color ? 'red' : 'black'}}>
    <span>{('0' + Math.floor((seconds / 3600) % 24))} hours, </span>
    <span>{('0' + Math.floor((seconds / 60) % 60)).slice(-2)} minutes, </span>
    <span>{('0' + seconds % 60).slice(-2)} seconds </span>
    </section>
    <button className='main-button' onClick={toggle}>{`${isActive ? 'Pause' : 'Start'}`}</button>
    <button className='main-button' onClick={reset}>
      Reset
    </button>
    </div>

    {/* break timer */}
    <div className='container'>
    <h4>Break:</h4>
    <span>{('0' + Math.floor((rest / 60) % 60)).slice(-2)} minutes, </span>
    <span>{('0' + rest % 60).slice(-2)} seconds</span>
    <button className='break-btn' onClick={increaseBreak}>Increase break length</button>
    <button className='break-btn' onClick={decreaseBreak}>decrease break length</button>
    </div>

    {/* session buttons */}
    <div className='container'>
      <h4>session length</h4>
      <span>{('0' + Math.floor((session / 3600) % 24))} hours, </span>
      <span>{('0' + Math.floor((session / 60) % 60)).slice(-2)} minutes, </span>
      <span>{('0' + session % 60).slice(-2)} seconds </span>
      <button className='btn' onClick={increaseTime}>Increase session length</button>
      <button className='btn' onClick={decreaseTime}>decrease session length</button>
    </div>
    </>
  )
}

//Math.floor just rounds the number down ie 5.6 becomes 5 and -5.05 becomes -6
    

export default Timer