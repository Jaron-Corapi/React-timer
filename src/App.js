import React, {useEffect, useState} from 'react'
import Timer from './timer'

function App () {

  return (
    <>
    <div>
      <h1>Pomodoro Clock</h1>
    </div>
    <div>
      <Timer />
    </div>
    </>
  );
};

export default App