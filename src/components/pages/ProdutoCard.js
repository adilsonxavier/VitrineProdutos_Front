import React from "react";
import styles from "./ProdutoCard.module.css";
import logo from "../../img/costs_logo.png";
import { Link } from "react-router-dom";

export default function ProdutoCard(props) {
    return (
        <article className={styles.item } >
            <Link to={`/ProdutoDetail/${props.produto.produtoId}`} > 

                <div className={styles.image}>
                    <img src={props.produto.imageSrc != "http://adilsonxavier-001-site1.itempurl.com/images/" ? props.produto.imageSrc : logo} alt={props.produto.imageSrc} />
                </div>
                <p className={styles.name}>{props.produto.produtoNome}</p>
                <p>{props.produto.produtoDescricao}</p>
                <p> De <span className={styles.oldPrice}>R$ {Number(props.produto.produtoValorAntigo).toFixed(2).replace(".", ",")} </span></p>
                <p> Por <span className={styles.price}>R$  {Number(props.produto.produtoValor).toFixed(2).replace(".", ",")}</span></p>

            </Link>
        </article>
        
        );
}
