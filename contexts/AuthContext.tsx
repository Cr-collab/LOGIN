import { useRouter } from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/apiClient";

type User = {
  email: string;
  permissions: string[];
  roles: string[];
}

type SignInCredentials = {
  email: string
  password: string
}

export function signOut(){
  destroyCookie(undefined, 'nextauth.token')
  destroyCookie(undefined, 'nextauth.refreshToken')

     useRouter().push('/')
 
}

type AuthContextData = {
    signIn(credentials : SignInCredentials): Promise<void>;
    isAuthenticated: boolean;
    user: User;
};

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData);


export function AuthProvider({children}: AuthProviderProps ){
  const [user, setUser] = useState<User>()
  const router =  useRouter()
  const isAuthenticated = !!user;

  useEffect(()=>{
        const { 'nextauth.token': token } = parseCookies()


        if(token){
          api.get('/me',).then(response =>{
             const { email , permissions, roles } = response.data

             setUser({
               email ,
               permissions,
               roles,
             })
          }).catch(err => {
          
              signOut()
            
          })
        }

  },[])

  async function signIn({email, password} : SignInCredentials){
     try{
      const response =  await api.post('sessions', {
        email,
        password
      })

      const {token,  refreshToken ,permissions , roles } = await response.data

      setCookie(undefined, 'nextauth.token', token,{
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })
      setCookie(undefined, 'nextauth.refreshToken', refreshToken,{
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })
      
      setUser({
        email,
        permissions,
        roles
      })


      api.defaults.headers['Authorization'] = `Bearer ${token}`

       router.push('/dashboard')

     }catch(err){
       console.log(err);
     }
  }

  return (
    <AuthContext.Provider value={{signIn, isAuthenticated, user}}>
      {children}
    </AuthContext.Provider>
  )
}