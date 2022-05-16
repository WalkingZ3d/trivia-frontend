import React from 'react';
import GameSettings from '../../components/GameSettings';


const ExamplePage = () => {

    let RepoData = {
        name: 'hello',
        forks: 1,
        html_url: 'http://example.com',
        stargazers_count: 1,
        language: 'English',
        visibility: 'public',
        subscribers_count: 1,
        default_branch: 'master'
    }

    return ( 
        <>
            <GameSettings name={RepoData.name} forks={RepoData.forks} url={RepoData.html_url} stargazers={RepoData.stargazers_count} language={RepoData.language} visibility={RepoData.visibility} subscribe={RepoData.subscribers_count} branch={RepoData.default_branch}/>
            
            <br/>
            <br/>
               
        </>
        
    )
           
}


export default ExamplePage;