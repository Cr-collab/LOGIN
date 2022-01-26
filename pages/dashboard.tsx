import { useContext, useEffect } from "react"
import { Can } from "../components/Can"
import { AuthContext } from "../contexts/AuthContext"
import { useCan } from "../hooks/useCan"
import { setupAPIClient } from "../services/api"
import { api } from "../services/apiClient"
import { withSSRAuth } from "../utils/withSSRAuth"

export default function Dasboard(){
  const {user} = useContext(AuthContext)

  const userCanSeeMetrics = useCan({
    permissions: ['metrics.list']
  })

  useEffect(()=>{
       api.get('/me')
       .then(response => {console.log(response)})
       .catch(err => {console.log(err)})
  })
  
  return (
    <>
     <h1> Esta logado :{user?.email} </h1>

     {
       userCanSeeMetrics && <div> Métricas </div>
     }
    
    
    <Can permissions={['metrics.list']}>
      <div> User </div>
     </Can>
    </>
  )
}


export const getServerSideProps  = withSSRAuth(async (ctx) => {
 console.log(ctx)
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/me');
  

  return {
    props: {}
  }
});
