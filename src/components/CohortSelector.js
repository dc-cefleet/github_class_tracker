import React, {useEffect, useState} from "react";
import uuid from "../helpers/uuid";

const CohortSelector = ({cohortSelected})=>{
    const [isCreating,setIsCreating] = useState(false)
    const [cohorts, setCohorts] = useState([])
    const [newName,setNewName]= useState()

    useEffect(()=>{
        let c = window.localStorage.getItem("cohorts")
        if(c){
            setCohorts(JSON.parse(c))
        }
    },[isCreating])

    const saveCohort = ()=>{
        const id = uuid()
        window.localStorage.setItem(id, JSON.stringify([]))
        window.localStorage.setItem("cohorts", JSON.stringify([...cohorts, {id:id,name:newName}]))
        setIsCreating(false)
    }

    if(isCreating)
        return (
            <div className='controller'>
                <input placeholder="Enter Cohort Name" onChange={evt=>setNewName(evt.target.value)} />
                <button onClick={saveCohort}>Save New Cohort</button>
            </div>
        )

    return (
        <div className='controller'>
            <label>Select Cohort</label>
            <select onChange={(evt)=>cohortSelected(cohorts[evt.target.value])} value={"select"}>
                <option value="select">---Choose a cohort---</option>
                {cohorts.map((c,idx)=><option key={idx} value={idx}>{c.name}</option>)}
            </select>
            <button onClick={e=>setIsCreating(true)}>Create New Cohort</button>
        </div>
    )
}

export default CohortSelector;