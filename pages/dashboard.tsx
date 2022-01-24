import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

export default function Dasboard(){
  const {user} = useContext(AuthContext)
  
  return (
    <h1> Esta logado :{user?.email} </h1>
  )
}