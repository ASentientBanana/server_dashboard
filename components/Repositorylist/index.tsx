import { ReactNode } from "react";
import styles from './styles.module.scss';

const RepositoryList = ({children}:{children:ReactNode | ReactNode[]}) =>  {
  return (
    <div className={styles.container}>
        {children}
    </div>
  )
}

export default RepositoryList;
