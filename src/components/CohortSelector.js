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
            <div>
                <label></label>
                <input placeholder="Enter Cohort Name" onChange={evt=>setNewName(evt.target.value)} />
                <button onClick={saveCohort}>Save New Cohort</button>
            </div>
        )

    return (
        <div style={{padding:"6px"}}>
            <label style={{display:"block"}}>Select Cohort</label>
            <select style={{padding:"6px"}} onChange={(evt)=>cohortSelected(cohorts[evt.target.value])} value={"select"}>
                <option value="select">---Choose a cohort---</option>
                {cohorts.map((c,idx)=><option key={idx} value={idx}>{c.name}</option>)}
            </select>
            <button  style={{display:"block"}} onClick={e=>setIsCreating(true)}>Creat New Cohort</button>
        </div>
    )
}

export default CohortSelector;