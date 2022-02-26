import React from "react";
import styles from "./Footer.module.css";
import { FaFacebook, FaInstagram, FaLinkedin} from "react-icons/fa" //Não esquecer de por o /fa no final

export default function Footer() {
    return (

        <footer>
            <ul className={ styles.list }>
                <li><FaFacebook /> </li>
                <li><FaInstagram /> </li>
                <li><a href="https://www.linkedin.com/in/adilsonxavier/"><FaLinkedin /></a> </li>
            </ul>
            <p className={styles.copyright}><span>Adilson Xavier de Souza
            </span> &nbsp; &copy;2022</p>
            <p className={styles.copyright}><span>Linkedin:&nbsp;
                <a href="https://www.linkedin.com/in/adilsonxavier/">https://www.linkedin.com/in/adilsonxavier/</a>
            </span></p>
        </footer>


    );

}