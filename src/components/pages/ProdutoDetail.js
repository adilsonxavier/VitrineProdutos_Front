﻿import React from "react";
import styles from "./ProdutoDetail.module.css";
import logo from "../../img/costs_logo.png";
import Carrossel from "./Carrossel";
import { useParams } from 'react-router-dom';
import api from "../../api"


export default function ProdutoDetail(props) {

    const { id } = useParams();

    const [values, setValues] = React.useState({});
    const [categorias, setCategorias] = React.useState([]);

    React.useEffect(() => {
        refeshProduto(id);
        refreshCategoriasList(id);
    }, []
    );

    const refeshProduto = (id) => {
        api.get(`/produtos/${id}`)
            .then(resp => {
                setValues(resp.data);
                 })
            .catch(erro => console.log("refresh Produtos erro:" + erro));

    }

    function refreshCategoriasList(id) {
        api.get(`/categorias/GetCategoriasProduto/${id}`)
            .then(resp => setCategorias(resp.data))
            .catch(err => console.log("o erro lina 26 foi : " + err));
    }

    return (
        <section key={id} className={styles.containerprodutos} >

            <div className={styles.esquerda}>
                <section>
                    <Carrossel
                        produtoId={id}
                    />
                </section>
            </div>

            <div className={styles.direita}>
                <h1>{values.produtoNome}</h1>
                <p>{values.produtoDescricao}</p>
                <p className={styles.pvalantigo }> De <span className={styles.oldPrice}>R$ {Number(values.produtoValorAntigo).toFixed(2).replace(".", ",")} </span></p>
                <p className={styles.pvalnovo}> Por <span className={styles.price}>R$  {Number(values.produtoValor).toFixed(2).replace(".", ",")}</span></p>
                <section>
                    <p className={styles.pcategorias}>Categorias:</p>
                    <div >
                        {
                            categorias.length > 0 &&
                             (

                                <ul className={styles.listacategorias}>
                                    {
                                        (
                                            categorias.filter(categoria => categoria.checked == true)
                                                .map(
                                                    (categoria, index) => (

                                                        <div className="left-section" key={categoria.categoriaId}>
                                                            <label htmlFor={categoria.categoriaNome}>{categoria.categoriaNome}</label>
                                                        </div>
                                                    )
                                                )
                                        )
                                    }
                                </ul>
                            )

                        }
                    </div>

                </section>
            </div>
        </section>
        
        );
}

