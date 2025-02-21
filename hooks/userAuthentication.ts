import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const auth = getAuth();

export function UserAuthenticaiton(){
    const [user,setUser] = useState<User>()
    useEffect(()=>{
        const unsubscribeFromAuthStatusChanged = onAuthStateChanged(auth,(user)=>{
            if(user){
                setUser(user);
            }else{
                setUser(undefined);
            }
        })
        return unsubscribeFromAuthStatusChanged;
    },[])
    return {user};
}