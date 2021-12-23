import { useEffect, useState } from "react";
import RepositoryItem from "./RepositoryItem";

import '../styles/repositories.scss';

interface Repository {
  name: string;
  description: string;
  html_url: string;
}

function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    fetch('https://api.github.com/orgs/rocketseat/repos')
    .then( response => response.json())
    .then( data => setRepositories(data))
  }, [])

  return (
    <section className="repository">
      <h1 className="repository__title">Lista de repositórios</h1>

      <ul className="repository__list">
        {repositories.map( repository => (
          <RepositoryItem key={repository.name} repository={repository} />
        ))}
      </ul>
    </section>
  );
}

export default RepositoryList;