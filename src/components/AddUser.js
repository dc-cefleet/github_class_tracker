import React, {useState} from 'react';

const AddUser = ({onSave})=>{
    
    const [github,setGithub] = useState("")
    const [realName,setRealName] = useState("")

    const addUser = ()=>{
        let cohort = JSON.parse(window.localStorage.getItem("current")) || []
        cohort.push({realName:realName,github:github})
        let jCohort = JSON.stringify(cohort)
        window.localStorage.setItem("current", jCohort)
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
