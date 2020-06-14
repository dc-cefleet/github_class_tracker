import React, {useState} from 'react';
import Cohort from "./Cohort";

import DC from '../assets/digitalcrafts-logo.png';
import CohortSelector from './CohortSelector';
import {client_id, client_secret, proxy} from "../config";

const App = () => {
	const [cohort,setCohort] = useState(null)
	const [access_token,setAccess_token] = useState(window.localStorage.getItem("access_token"))

	const query = new URLSearchParams(window.location.search);
	let code = query.get("code")
	
	if(!access_token){
		if(!code){
			return(
				<div>
					<h2>Login</h2>
					<span>You must login to use this app.</span>
					<a href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}`}>Login to Github</a>
				</div>
			)
		}

		if(code && !access_token){
			fetch(`${proxy}https://github.com/login/oauth/access_token`,{
				method:"POST",
				mode:"cors",
				headers: {
					'Content-Type': 'application/json',
					"accept":"application/json"
				},
				body:JSON.stringify({
					client_id:client_id,
					client_secret:client_secret,
					code:code
				})
			})
			.then(res=>res.json())
			.then(json=>{
				setAccess_token(json.access_token)
				if(!json.access_token || json.access_token === 'undefined'){
					window.localStorage.removeItem("access_token")
				} else {
					window.localStorage.setItem("access_token", json.access_token)
				}
				window.location = window.location.replace(`code=${code}`,"")
			})
			return (<div>Logging In ...</div>)
		}
	}

	if(access_token){
		return (
			<div className="App">
				<img src={DC} alt="DigitalCrafts logo" className="dc-logo" />
				<CohortSelector cohortSelected={setCohort} />
				{cohort &&
				<div>
					<h1>
						Cohort - {cohort.name}
					</h1>
					<Cohort cohortId={cohort.id} cohortName={cohort.name} access_token={access_token}/>
				</div>
				}
			</div>
		)
	}
}

export default App