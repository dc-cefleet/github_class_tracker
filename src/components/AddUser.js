import React, {useState} from 'react';

const AddUser = ({onSave, cohortId})=>{
    
    const [github,setGithub] = useState("")
    const [realName,setRealName] = useState("")

    const addUser = ()=>{
        let cohort = JSON.parse(window.localStorage.getItem(cohortId)) || []
        cohort.push({realName:realName,github:github})
        let jCohort = JSON.stringify(cohort)
        window.localStorage.setItem(cohortId, jCohort)
        setGithub("")
        setRealName("")
        onSave(cohort)
    }

    return(
        <div>
            <label>
                Add User to Cohort
            </label>
                <div style={{margin:"6px"}}>
                    <input style={{padding:"6px"}} placeholder="Github Username" onChange={e=>setGithub(e.target.value)} value={github} />
                </div>
                <div style={{margin:"6px"}}>
                    <input style={{padding:"6px"}} placeholder="Real Name" onChange={e=>setRealName(e.target.value)} value={realName} />
                </div>
            <button onClick={addUser}>Add User</button>
        </div>
    )
}

export default AddUser;
