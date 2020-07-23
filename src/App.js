import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories',
      {
        "title": `Novo repositório ${Date.now()}`,
        "url": "https://github.com/Flavio-Vicentini/GoStack-Desafio02-NodeJS",
        "techs": "JavaScript, Node"
      })
    const repository = response.data;
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`)
    if (response.status === 204) {
      const index = repositories.findIndex(repository => repository.id === id)
      setRepositories(repositories.filter (repository => repository.id !== id))
    }
  }

  return (
    <div>
       <ul data-testid="repository-list">
      {repositories.map(repository => (
        <React.Fragment key={repository.id}>
            <li>
              <p>{repository.title}</p>
              <button onClick={() => handleRemoveRepository(repository.id)}> Remover </button>
            </li>          
        </React.Fragment>
      ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
