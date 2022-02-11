import React from "react";
import api from "../../api";

export const Context = React.createContext();

export default function ContextProvider(props) {
    const [authorized, setAuthorized] = React.useState(false);
    const [token, setToken] = React.useState("");

    //React.useEffect(() => {
    //    // console.log("AC.useeffect executado");
    //    const token = localStorage.getItem("token");
    //    if (token) {
    //        api.defaults.headers.Authorization = token;
    //    }
    //}, []);

    return (
        <Context.Provider value={{ authorized, setAuthorized,token,setToken}}>
            {props.children}
        </Context.Provider>
        );

}