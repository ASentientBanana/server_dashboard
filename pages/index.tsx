import styles from '../styles/Home.module.css'
import { IParsedResponse, IIncomingResponse } from '../types/repo';
import RepositoryTile from '../components/RepositoryTile';
import RepositoryList from '../components/Repositorylist';

export const getServerSideProps = async () =>{
  const response  = await fetch('https://api.ipify.org?format=json')
  const net = await response.json();

  return{
    props:{
        net
    }
  }
}

const Home = ({ net }:{net:{ip:string}}) => {
  return (
    <div>
      Welcome
    </div>
  )
}

export default Home
