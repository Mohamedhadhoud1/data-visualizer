import { createContext } from 'react';
export const UserContext = createContext({user:{
   
  id: "",
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  role: ""

  },setUser:(user:object)=>{}});
