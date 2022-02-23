import React from "react";
import api from "../../api"
import Pagination from "../layout/Pagination";
import Loading from "../layout/Loading";
import ProdutoCard from "./ProdutoCard";
import styles from "./NossosProdutos.module.css";

export default function NossosProdutos() {
    //////////// Paginação ///////////
    const PAGESIZE = 6;

    const [currentPage2, setCurrentPage2] = React.useState(1);
    const [totalItens, setTotalItens] = React.useState(0);
    //////////// Paginação fim ///////////

    const [busca, setBusca] = React.useState("");
    const [values, setValues] = React.useState("");
    const [showLoading, setShowLoading] = React.useState(true);


    const [produtoList, setProdutoList] = React.useState([]);

    React.useEffect(() => {
        refreshProdutoList();
    }, [currentPage2, busca]
    );

    function refreshProdutoList() {
        api.get(`/produtos/GetProdutosPaginacao/${currentPage2}/${PAGESIZE}/${busca}`)
            .then(resp => {
                setProdutoList(resp.data); setTotalItens(resp.data[0] != undefined ? resp.data[0].qtdTotalItens : 0);
                setShowLoading(false);
            })
            .catch(err => console.log("o erro lina 26 foi : " + err));
    }


    const handleBusca = () => {
        setBusca(values.busca != undefined ? values.busca : "");
    }

    const handleInputChange = e => {
        setValues(
            {
                ...values,
                [e.target.name]: e.target.value
            }
        );
    }


    return (
        <div className={ styles.contprodutos }>
            <h1>Nossos Produtos </h1>
            <section className={styles.busca}>
                <input type="text" placeholder="busca" name="busca" className={ styles.inputtext} onChange={handleInputChange} />
                <button onClick={handleBusca} >Buscar</button>
                {
                    showLoading &&
                    (
                        <Loading />
                    )
                }
            </section>


            <div style={{ display: "flex", flexDirection: "column" }}>



                <section className={styles.containerProdutos}>
                    {
                        (produtoList.length > 0 &&
                            produtoList.map(produto => (
                                <ProdutoCard
                                    produto={produto}
                                    key={produto.produtoId}
                                />

                            ))
                        )
                    }
                </section>


                <br />
                {totalItens > 0 &&
                    <Pagination 
                        pageSize={PAGESIZE}
                        totalItens={totalItens}
                        currentPage2={currentPage2}
                        setCurrentPage2={setCurrentPage2}
                        setShowLoading={setShowLoading}

                    />

                }
            </div>
        </div>

        );
}
