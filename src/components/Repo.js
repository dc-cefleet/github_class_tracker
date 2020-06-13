import React from "react";

const Repo = ({repo})=>{
    return(
        <li>
            <a href={repo.url.replace('https://api.github.com/repos/', 'https://github.com/')}><h5>{repo.name}</h5></a>
            <p>{repo.description}</p>
		</li>
    )
}
export default Repo;