import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { Context } from "../store/appContext";

export const SingleCoach = () => {
	const { store, actions } = useContext(Context);
    const [ education, setEducation ] = useState("")
    const [ experience, setExperience ] = useState("")
    const [ loading, setLoading ] = useState(true);
    const { coachID } = useParams();
    const loggedCoach = JSON.parse(localStorage.getItem("loggedCoach"));

    
    useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			await actions.getSingleCoach(coachID);
			if (store.singleClient.activity_frequency_id) {
				await actions.getSingleActivityFrequency(store.singleClient.activity_frequency_id);
			}
			setLoading(false);
		};
		fetchData();
	}, [coachID]);

    useEffect(() => {
        if (store.singleCoach) {
            if (store.singleCoach.education_id) actions.getSingleEducation(store.singleCoach.education_id);
            else setEducation("");

            if (store.singleCoach.experience_id) actions.getSingleExperience(store.singleCoach.experience_id);
            else  setExperience("");
        }
    }, [store.singleCoach]);

    useEffect(() => {
        if (store.singleCoach.education_id) setEducation(store.singleEducation.rank);
    }, [store.singleEducation]);

    useEffect(() => {
        if (store.singleCoach.experience_id) setExperience(store.singleExperience.time);
    }, [store.singleExperience]);


	return (
        <>
        {loading ? 
            <h2 className="container mt-3">Loading...</h2>
            :
            <div className="container mt-3">
                <h3 className="mb-2">Coach: {store.singleCoach.username}</h3>
                <h5>Some details about me:</h5>
                <ul className="my-3 fs-5">
                    <li>
                        <span className="fw-bold">First name: </span> 
                        {store.singleCoach.first_name}
                    </li>
                    <li>
                        <span className="fw-bold">Last name: </span> 
                        {store.singleCoach.last_name}
                    </li>
                    <li>
                        <span className="fw-bold">Education: </span> 
                        {education}
                    </li>
                    <li>
                        <span className="fw-bold">Experience: </span> 
                        {experience}
                    </li>
                </ul>
                {(loggedCoach && store.singleCoach.id === loggedCoach.id) &&            
                <Link to={`/coach/update/${coachID}`} className="ms-auto my-1">
                        <button className="btn btn-secondary ms-auto fw-bold" >Update</button>					
                </Link>
                }
                {loggedCoach ?                
                <Link to="/client">
                    <button className="btn btn-primary ms-3 fw-bold" >Back to Client list</button>
                </Link>
                :
                <Link to="/coach">
                    <button className="btn btn-primary ms-3 fw-bold" >Back to Coach list</button>
                </Link>
                }    
            </div>
        }
        </>
	);
};
