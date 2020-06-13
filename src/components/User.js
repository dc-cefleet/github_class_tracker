import React, {useEffect, useState} from 'react';
import Repo from "./Repo";

const User = ({user,access_token})=> {
	
	const [githubUser, setGithubUser] = useState()
	const [repos,setRepos] = useState([])
	const [showRepos, setShowRepos] = useState(false)

	useEffect(()=>{
		fetch(`https://cors-anywhere.herokuapp.com/https://api.github.com/users/${user.github}`,{
			"Authorization":`token ${access_token}`
		})
			.then(res => res.json())
			.then(u => setGithubUser(u));
	
		fetch(`https://cors-anywhere.herokuapp.com/https://api.github.com/users/${user.github}/repos`,{
			"Authorization":`token ${access_token}`
		})
			.then(res => res.json())
			.then(rep => setRepos(rep))
	},[])

	if(!githubUser)
		return(<div>Loading User...</div>)

	return (
		<div className="container">
			<div className="User">
				<div className="User-card">
					<img src={githubUser.avatar_url} alt={user.github} />
					<a href={`https://github.com/${user.github}`}>
						<h3 className="User-header">{`${user.realName} - ${user.github}`}</h3>
					</a>
				</div>

				<div className="User-info">
					<img
						src={`http://ghchart.rshah.org/${user.github}`}
						alt={`${user.realName}'s Github chart`}
					/>
					<h4>Bio</h4>
					<p style={{borderRadius:"4px", padding:'6px', background:"#efefef"}}>{githubUser.bio}</p>
					<h4>Repos</h4>
					
						{!showRepos &&
							<button onClick={()=>setShowRepos(true)}>Show Repos</button>
						}
						{showRepos &&
							<React.Fragment>
							<button onClick={()=>setShowRepos(false)}>Hide Repos</button>
							<ul>
								{repos.map((repo,idx)=><Repo key={idx} repo={repo}/>)}
							</ul>
							</React.Fragment>
						}
				</div>
			</div>
		</div>
	);
}

export default User;