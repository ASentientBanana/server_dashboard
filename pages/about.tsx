import { exec } from 'child_process'


export const getServerSideProps = async () =>{

  exec('bash $(pwd)/scripts/start.sh',(err,out,sterr)=>{
    console.log(out);
  })

 
  return{
    props:{

    }
  }
}


const Home = () => {

  return(
      <>
        <h1>about</h1>
      </>
  )
}
  export default Home
  