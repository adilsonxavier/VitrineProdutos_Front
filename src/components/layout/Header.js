import React from "react";
import styles from "./Header.module.css";
import Navbar from "./Navbar";
import NavbarAdmin from "./NavbarAdmin"
import { Context } from "../Contexts/Context1";


export default function Header() {

    const { logged } = React.useContext(Context);
    console.log("comp header " + logged);

    return (

        <header className={logged == true ? styles.myheaderadmin : styles.myheader }>
            {logged == true
                ? <NavbarAdmin />
                : <Navbar />
            }
        </header>

    );
    /*Mesmo sendo booleano precisa do "logged == true " , se for só logged retorna sempre false*/ 
}