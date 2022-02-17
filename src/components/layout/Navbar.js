﻿import React from "react";
import { useHistory, Link } from 'react-router-dom';
import styles from "./Navbar.module.css";
import logo from "../../img/costs_logo.png";
import { Context } from "../Contexts/Context1";

export default function Navbar(props) {
    const { logged, setLogged } = React.useContext(Context);
    const history = useHistory();

    const [checked, setChecked] = React.useState(false);

    const logout = () => {
        localStorage.removeItem("token");
        setLogged(false);
        history.push("/login");
    }

    const checkBoxChanged = () => {
        setChecked(!checked);
    }


    return (
        <nav className={styles.navbar}>
            {/*            <Container>*/}

            <input type="checkbox" onChange={(e) => checkBoxChanged(e) } id="check"/>

            <Link to="/" >Meu logo</Link>

            <ul className={`${styles.list} ${ checked==true ? styles.newstyle : styles.oldstyle}`} >
                <li >
                    <Link onClick={checkBoxChanged} to="/" >Home</Link>  {/* o Link é renderizado como uma tag <a>*/}
                   
                </li>

                <li>
                    <Link onClick={checkBoxChanged } to="/company" >Empresa</Link>
                </li>

                <li>
                    {logged
                        ? <a onClick={logout } >Logout</a>
                        : <Link onClick={checkBoxChanged} to="/login" >Login</Link>
                    }

                </li>


                </ul>

            <label htmlFor="check" className={styles.checkbtn}>
                <i class="fas fa-bars"></i>
            </label>

            {/*            </Container>*/}
        </nav>



    );

}