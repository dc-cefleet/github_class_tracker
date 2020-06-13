import React, {useState, useEffect} from "react";
import User from "./User";
import AddUser from "./AddUser";

const Cohort = ({cohortName, cohortId, access_token})=>{
    const [cohort, setCorhort] = useState([])

    useEffect(()=>{
        let c = JSON.parse(window.localStorage.getItem(cohortId));
        if(!c) {
            c = []
        }
        setCorhort(c)
    },[cohortName])
    
    const onUserAdded = (updated) =>{
        setCorhort(updated)
    }

	const list = cohort
		.sort((a, b) => {
			if (a.github.toLowerCase() < b.github.toLowerCase()) return -1;
			if (a.github.toLowerCase() > b.github.toLowerCase()) return 1;
			return 0;
		})
        .map(user => <User user={user} key={user.github} access_token={access_token}/>);
    
        return (
            <div>
                <AddUser onSave={onUserAdded} cohortId={cohortId} />
                <ul>{list}</ul>
            </div>
        )
}

export default Cohort;