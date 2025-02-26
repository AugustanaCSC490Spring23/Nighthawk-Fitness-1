import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate} from "react-router-dom";
import {db } from "../Firebase/firebase";
import {doc, updateDoc} from 'firebase/firestore';
import { useAuth } from "../contexts/AuthContext";
import  Form from './form/Form'
import User from "./user/User";

function Profile() {
    const [userData, setUserData] = useState(() => {
        const savedUserData = localStorage.getItem('userData');
        return savedUserData ? JSON.parse(savedUserData) : null
    });

    const [w, setW] = useState(0)
    const {currentUser} = useAuth();
    const navigate = useNavigate();

    function handleSubmit(formData)  {
    
        setUserData(formData);
        localStorage.setItem('userData', JSON.stringify(formData))
    }

    

    useEffect(()=> {
        setW();
    },[userData])
    async function fetchCalories() {
        try {
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '3bc8b2aff1mshe263971d1b8ac5bp112b3djsn7d5749482f80',
                    'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
                }
            };
            const height =  userData.information.height.ft * 30.48 + userData.information.height.inch * 2.54
            const response = await fetch(`https://fitness-calculator.p.rapidapi.com/dailycalorie?age=${userData.information.age}&gender=male&height=${height}&weight=${(userData.information.weight[userData.information.weight.length-1].w)/2.205}&activitylevel=${userData.information.activity_level}`, options)
            const data = await response.json();
            // console.log(data.data.goals['maintain weight']);
            const currentDoc = doc(db, 'users', userData.docID);
            
            await updateDoc(currentDoc, {
                dailyCal: {
                    BMR: data.data.BMR,
                    maintain_cal: data.data.goals['maintain weight'],
                    lose_cal: data.data.goals['Weight loss'].calory,
                    gain_cal: data.data.goals['Weight gain'].calory
                }
                
            })

            const updateData = {
                ...userData,
                dailyCal: {
                    BMR: data.data.BMR,
                    maintain_cal: data.data.goals['maintain weight'],
                    lose_cal: data.data.goals['Weight loss'].calory,
                    gain_cal: data.data.goals['Weight gain'].calory
                }
            };
            setUserData(updateData);
            localStorage.setItem('userData', JSON.stringify(updateData));
             
        }catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if(userData.isFilled && !userData.dailyCal)  {
            fetchCalories();
        }
        
    },[userData.isFilled, userData.dailyCal])


    
    return (
        <div className="container">
            <div className="title">profile</div>
            {userData.isFilled ? <User setUserData={setUserData} userData={userData}/> : <Form onSubmit={handleSubmit}/>}
            
        </div>
            
    );
}
export default Profile;