import React from "react";
import { useHistory, Link } from 'react-router-dom';
import api from "../../api"
import Pagination from "../layout/Pagination";
import Loading from "../layout/Loading";
import ProdutoCard from "./ProdutoCard";
import styles from "./Home2.module.css";

export default function Home2() {
    //////////// Paginação ///////////
    const PAGESIZE = 6;
    // const TOTALITENS= 120;
    //const SKIP = 24;
    //const [skip, setSkip] = React.useState(0);
    const [currentPage2, setCurrentPage2] = React.useState(1);
    const [totalItens, setTotalItens] = React.useState(0);
    //////////// Paginação fim ///////////

    const [busca, setBusca] = React.useState("");
    const [values, setValues] = React.useState("");
    const [showLoading, setShowLoading] = React.useState(true);


    const history = useHistory();

    const [produtoList, setProdutoList] = React.useState([]);

    React.useEffect(() => {
        refreshProdutoList();
    }, [currentPage2, busca]
    );

    function refreshProdutoList() {
      /*  console.log("api def prodadm 1202 " + api.defaults.headers.Authorization);*/
        api.get(`/produtos/GetProdutosPaginacao/${currentPage2}/${PAGESIZE}/${busca}`)
            //produtoAPI().fetchByPagination(JSON.parse(token))
            .then(resp => {
                setProdutoList(resp.data); setTotalItens(resp.data[0] != undefined ? resp.data[0].qtdTotalItens : 0);
                setShowLoading(false);
               /* console.log("47 total itens " + totalItens); console.log("resp:" + JSON.stringify(resp.data[0]))*/
            })
            .catch(err => console.log("o erro lina 26 foi : " + err));
    }


    const handleBusca = () => {
        setBusca(values.busca != undefined ? values.busca : "");
       /* console.log("78 busca " + busca);*/
    }

    const handleInputChange = e => {
        // const [name, value] = e.target;
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
