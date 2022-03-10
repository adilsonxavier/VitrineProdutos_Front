import React from "react";
import styles from "../estilos/Home.module.css";
import savings from "../../img/savings.svg";
import { Link } from "react-router-dom";

function Home() {
    return (
        <section className={styles.home_container}>

            <h1>Bem vindo ao site Vitrine de Produtos</h1>
            <p style={{ marginTop: "1.5em", marginBottom: "0" }}>Login da área adminstrativa:</p>
            <p style={{ marginTop: "1.5em", marginBottom: "0" }}><strong>usuário: </strong> maysa</p>
            <p style={{ marginTop: "1em", marginBottom: "0" }}><strong>senha: </strong>henrique123</p>

            
       </section>

        );
}
export default Home;