import React from "react";
import styles from "./ProdutoCard.module.css";
import logo from "../../img/costs_logo.png";
import { Link } from "react-router-dom";

export default function ProdutoCard(props) {
    return (
        <article >
            <Link to={`/ProdutoDetail/${props.produto.produtoId}`} > 
                <p>{props.produto.produtoNome}</p>
                <img src={props.produto.imageSrc != "http://adilsonxavier-001-site1.itempurl.com/images/" ? props.produto.imageSrc : logo} alt={props.produto.imageSrc} />
            </Link>
        </article>
        
        );
}
