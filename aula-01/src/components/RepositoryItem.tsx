interface RepositoryItemProps {
  repository: {
    name: string;
    description: string;
    html_url: string;
  }
}


function RepositoryItem({ repository } : RepositoryItemProps) {
  return (
    <li className="repository-item">
      <strong className="repository-item__name">{repository.name}</strong>
      <p className="repository-item__description">{repository.description}</p>
      <a className="repository-item__link" href={repository.html_url}>Acessar o repositório</a>
    </li>
  );
}

export default RepositoryItem;