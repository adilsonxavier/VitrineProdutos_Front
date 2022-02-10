import React from "react";

export const Context = React.createContext();

export default function ContextProvider(props) {
    const [authorized, setAuthorized] = React.useState(false);
    const [token, setToken] = React.useState("");

    const baseUrl = "http://localhost:55366/api";

    return (
        <Context.Provider value={{ authorized, setAuthorized,token,setToken, baseUrl}}>
            {props.children}
        </Context.Provider>
        );

}