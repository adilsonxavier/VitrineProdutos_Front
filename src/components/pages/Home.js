import React from "react";
import styles from "../estilos/Home.module.css";
import savings from "../../img/savings.svg";
import { Link } from "react-router-dom";

function Home() {
    return (
        <section className={styles.home_container}>
            <h1>Bem vindo ao site Vitrine de Produtos</h1>
            <h2 style={{fontSize:"1rem"}}>Projeto pessoal em React.js com back-end utilizando API em C# (.Net 5) com Entity Framework Core e Authenticação JWT</h2>
            <p style={{ marginTop: "1rem", marginBottom: "0" }}>Login da área adminstrativa:</p>
            <p style={{ marginTop: "1rem", marginBottom: "0" }}><strong>usuário: </strong> maysa</p>
            <p style={{ marginTop: "1em", marginBottom: "0" }}><strong>senha: </strong>henrique123</p>

            
       </section>

        );
}
export default Home;