import React from "react";
import api from "../../api";
import styles from "./Login.module.css";

import { useHistory } from 'react-router-dom';

import { Context } from "../Contexts/Context1";



export default function Login() {
    const history = useHistory();
    const { authorized, setAuthorized, baseUrl, token, setToken, logged, setLogged } = React.useContext(Context);
    const [errors, setErrors] = React.useState({});

   async function handleAutenticate (formData) {
       const user = formData; 
       const { data } = await api.post("/user/login", user)

       const meutoken = JSON.stringify(data.token);
       setToken(meutoken);
       setAuthorized(true); 
       
       api.defaults.headers.Authorization = `Bearer ${data.token}`
       localStorage.setItem("token", `Bearer ${data.token}`);
       setLogged(true);
       setAuthorized(true);
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
            console.log("tem erro 45")
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

        try {
            const { data } = await api.post("/user/login", values);
            const meutoken = JSON.stringify(data.token);
            const mensagem = JSON.stringify(data.mensagem);

            if (mensagem == '"ok"') {
                setToken(meutoken);
                setAuthorized(true);
                api.defaults.headers.Authorization = `Bearer ${data.token}`
                localStorage.setItem("token", `Bearer ${data.token}`);
                setLogged(true);
                setAuthorized(true);
                history.push("/ProdutosAdmin");
            }
            else {
                alert(mensagem);
            }

        }
        catch (e) {
            alert(e);
        }
       
       

    }

    const applyErrorClass = (field) => {
        return (field in errors && errors[field] == false) ? " invalid-field" : ""
    };
    return (
        <div className={styles.container}>
 

            <section className={styles.containerlogin}>
                <form onSubmit={handleFormSubmit}>
                    <h1>Tela de Login</h1>
                    <div >
                        <label>Usuário</label>
                        <input type="text" name="name"
                            placeholder="usuário"
                            onChange={handleInputChange}
                            className={styles.inputtext}
                        />
                    </div>
                    <div>
                        <label>Senha</label>
                        <input type="password" name="password"
                            placeholder="Senha"
                            onChange={handleInputChange}
                            className={styles.inputtext}
                        />
                    </div>
                    <div className={styles.divbutton}>
                        <button type="submit" className={styles.buttonlogin} >Logar</button>
                    </div>
                </form>

            </section>
        </div>

        );
}
