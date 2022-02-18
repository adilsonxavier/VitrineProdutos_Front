import React from "react";
import axios from "axios";
import api from "../../api";
import styles from "./Home2.module.css";

import { useHistory, Link } from 'react-router-dom';

import { Context } from "../Contexts/Context1";



export default function Login2() {
    const history = useHistory();
    const { authorized, setAuthorized, baseUrl, token, setToken, logged, setLogged } = React.useContext(Context);
    const [errors, setErrors] = React.useState({});

   async function handleAutenticate (formData) {
        console.log("auth 0755");
       // const user = { name: "maysa", password: "123456" };
       const user = formData;
      // const { data } = await userAPI().authenticate(user);
      // api.defaults.baseURL = 'https://api.example.com';
       const { data } = await api.post("/user/login", user)

      // const { data: { token } } = await api.post("/authenticate");

       const meutoken = JSON.stringify(data.token);
       setToken(meutoken);
       setAuthorized(true); 
     //  localStorage.setItem("token", meutoken);
       
       api.defaults.headers.Authorization = `Bearer ${data.token}`
       localStorage.setItem("token", `Bearer ${data.token}`);
       /* console.log("handle authedafd0502s 36" + data.token + "json"+ JSON.stringify(data.token));*/
       console.log("api def 12300 " + api.defaults.headers.Authorization)
       setLogged(true);
       setAuthorized(true);
       console.log("logged tela login " + logged);
       console.log("authorizedd tela login " + authorized)
      history.push("/ProdutosAdmin");

    }

    const initialFieldValues = {
        name: "",
        password: ""
    }
    const [values, setValues] = React.useState(initialFieldValues);

    const handleFormSubmit = e => {
        e.preventDefault();

        if (validate()) {
            handleAutenticate();
        }
        else {
            console.log("tem erro 57")
        }
    }
    const handleInputChange = e => {
        setValues(
            {
                ...values,
                [e.target.name]: e.target.value
            }

        );
    }

    const validate = () => {
        let temp = {};
        temp.name = values.name == "" ? false : true;
        temp.password = values.password == "" ? false : true;
        setErrors(temp);
        console.log(temp);
        return Object.values(temp).every(x => x == true);


        //O Object.values(temp) retorna um array com os valores dos elementos do objeto tempo ( só os valores sem os nomes das pro-
        // priedades ) no caso [bool, bool]

        // O Array.every(função) checa se todos os valores do array passam pela função dentro do parâmetro e retorna true apenas se
        // todos os valores passarem pelo teste
        // No caso .every(x => x == false); retorna true (todos os campos ok) apenas se o valor de todos os elementos de temp
        // forem false ( sem erro)
    }

    async function handleAutenticate(formData) {
        // rever tratamento de erro

        console.log("aut 0947");
        const resposta = {};
    /*    try {*/
        const { data } = await api.post("/user/login", values)
            .catch(erro => console.log("err 93 " + erro.json()));
              

            const meutoken = JSON.stringify(data.token);
            setToken(meutoken);
            setAuthorized(true);
            api.defaults.headers.Authorization = `Bearer ${data.token}`
            localStorage.setItem("token", `Bearer ${data.token}`);
            setLogged(true);
            setAuthorized(true);
            history.push("/ProdutosAdmin");
       // }
        //catch (e) {
        //    console.log("erro 0924 " + e);
        //    console.log("erro 0924 " + e.message); 
        //}
       
       

    }

    const applyErrorClass = (field) => {
        return (field in errors && errors[field] == false) ? " invalid-field" : ""
    };
    return (
        <div>
            <section>
                <form onSubmit={handleFormSubmit}>
                    <label>Usuário</label>
                    <input type="text" name="name"
                        placeholder="usuário"
                        onChange={handleInputChange}
                    />

                    <label>Senha</label>
                    <input type="password" name="password"
                        placeholder="Senha"
                        onChange={handleInputChange}
                    />

                    <button type="submit" >Submit</button>
                </form>

            </section>
            <h1>Tela de Login buc443454545</h1>
            
            <button onClick={handleAutenticate}>Logar</button>

        </div>

        );
}
