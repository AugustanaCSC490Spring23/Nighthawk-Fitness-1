import {MdAddCircle} from 'react-icons/md'
import { Button, Icon, IconButton } from '@mui/material';
import NewWorkout from './workoutDates/months/newWorkout';
import React, { useEffect, useState, useContext, createContext } from "react";
import './workoutLog.css'
import StyledWorkout from './workoutDates/months/styledWorkout';
import { set } from 'date-fns';

// import WorkoutMonth from './logCalendar/workoutMonth';
// import WorkoutWeek from "./logCalendar/workoutWeek"
function WorkoutLog() {

  const [userData, setUserData] = useState(() => {
    const savedUserData = localStorage.getItem('userData');
    return savedUserData ? JSON.parse(savedUserData) : null
});

const [changeCheck, setChange] = useState("")

const [arrayMap, setArray] = useState([])

useEffect(() =>{
  setArray([])
   userData.allWorkouts.map((workout, index) => {
    setArray([...arrayMap, workout])})
    console.log(arrayMap)
}, [userData.allWorkouts.length])


var workoutCheck = null

  const [added, addWorkout] = useState(false)
    return( 
    <div className='workoutLog-ctn'>
    <div className='containerGreeting'>
      <div className='workoutLog-Greeting'>
      <div className="notebook"></div><h1 id="welcome">Welcome to your workout log</h1>
      <div className='month'>
      </div>
      </div>
      <IconButton id="add-btn" aria-label="Log a workout" 
        onClick={()=>addWorkout(!added)}>
          <MdAddCircle/>
        </IconButton>
        {added && <NewWorkout 
        userData={userData}
        setUserData={setUserData}
        />}
      </div>
      <div className='workoutObj'>
      <>{userData.allWorkouts.map((workout, index) => {
               return(
           <div key={index}>
               <StyledWorkout
                   date={workout.date}
                   name={workout.name}
                   reps={workout.reps}
                   weight={workout.weight}/>
           </div>
               );})}
           </>
           </div>
        </div>
    )
}

export default WorkoutLog