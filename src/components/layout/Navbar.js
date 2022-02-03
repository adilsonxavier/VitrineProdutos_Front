import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../img/costs_logo.png";

export default function Navbar(props) {
    return (
        <nav className={styles.navbar}>
            {/*            <Container>*/}
            <Link to="/" ><img src={logo} alt="meu logo" /></Link>

            <ul className={styles.list}>
                <li>
                    <Link to="/" >Home</Link>  {/* o Link é renderizado como uma tag <a>*/}
                </li>

                <li>
                    <Link to="/company" >Empresa</Link>
                </li>

                <li>
                    <Link to="/admin/produtosAdmin" >Admin</Link>
                </li>


            </ul>

            {/*            </Container>*/}
        </nav>

    );

}