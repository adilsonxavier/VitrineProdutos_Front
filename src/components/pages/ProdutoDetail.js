import React from "react";
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
       /* console.log("api getbyid 1310 " + api.defaults.headers.Authorization);*/
        api.get(`/produtos/${id}`)
            //produtoAPI().fetchById(id)
            .then(resp => {
                setValues(resp.data);
               /* console.log("dados: " + resp.data);*/
            })
            .catch(erro => console.log("refresh Produtos erro:" + erro));

    }

    function refreshCategoriasList(id) {
      /*  console.log("refredh cat id " + id)*/
        api.get(`/categorias/GetCategoriasProduto/${id}`)
            .then(resp => setCategorias(resp.data))
            .catch(err => console.log("o erro lina 26 foi : " + err));
    }

    return (
        <section key={id }>
            <p>Detalhe do produto {values.produtoNome}</p>
            <section>
                <Carrossel
                    produtoId={id}
                />
            </section>

            <section>
                <h1>categorias</h1>
                <div >
                    {
                        categorias.length > 0 &&
                        /*<form onSubmit={handleFormSubmit}>*/
                        (

                            <ul>
                                {
                                    (
                                        categorias.filter(categoria => categoria.checked == true)
                                        .map(
                                            (categoria, index) => (

                                                <div className="left-section" key={categoria.categoriaId}>
                                                   <label htmlFor={categoria.categoriaNome}>{categoria.categoriaNome} -indice: {index}</label>
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
        </section>
        
        );
}

            //<tr key={produto.produtoId}>
            //    <td>{produto.produtoId}</td>
            //    <td>{produto.produtoNome}</td>
            //    <td>{produto.produtoDescricao}</td>
            //    <td>{produto.produtoValor}</td>
            //    <td>