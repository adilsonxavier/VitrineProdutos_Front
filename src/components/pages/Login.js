import React from "react";
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function Login() {
    const history = useHistory();

    //const handleLogar = e => {
    //   e.preventDefault();
    //    console.log("btn2");
    //    history.push("/admin/produtosAdmin");
    //}


    const redirect = () => {
        console.log("redir0216" + new Date().toLocaleTimeString());
        history.push("/produtosAdmin");
    }
    return (
        <div>
            <h1>Tela de Login buc443454545</h1>
            <Link to="/produtosAdmin"> Logar</Link>
            <button onClick={redirect}>Logar</button>

        </div>

        );
}
