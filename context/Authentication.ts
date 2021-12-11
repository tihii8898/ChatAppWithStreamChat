import { createContext } from "react";


const AuthContext = createContext({
    userId: '',
    setUserId: (newUserId:string) => {},
    // pw: '',
    // setPw: (newPw:string) => {},
})



export default AuthContext;