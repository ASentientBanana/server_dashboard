import { IParsedResponse } from '../../types/repo';
import style from './styles.module.scss'
const RepositoryTile = ({ project }: { project: IParsedResponse }) => {

  return (
    <div className={style.container} >
      <span>id:{project.id}</span>
      <br />
      <span>Project: {project.name}</span>
      <br />
      <span>is private: {project.private}</span>
      <br />
      <span>language: {project.language}</span>
      <br />
      <span>Date Updated: {'Some date'}</span>
      <hr />
    </div>
  )
}

export default RepositoryTile;
