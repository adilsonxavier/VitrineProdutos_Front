﻿import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../../img/costs_logo.png";
import Pagination from "../layout/Pagination";

export default function ProdutosAdmin2() {
    //////////// Paginação ///////////
    const PAGESIZE = 10;
    // const TOTALITENS= 120;
    //const SKIP = 24;
    //const [skip, setSkip] = React.useState(0);
    const [currentPage2, setCurrentPage2] = React.useState(1);
    const [totalItens, setTotalItens] = React.useState(0);

     //////////// Paginação fin ///////////

    const [busca, setBusca] = React.useState("");
    const [values, setValues] = React.useState("");

    const [produtoList, setProdutoList] = React.useState([]);

   // const [recordForEdit, setRecordForEdit] = React.useState(null);

    React.useEffect(() => {

        refreshProdutoList();
        //if (recordForEdit != null) {
        //    setValues(recordForEdit)
        //}
    }, [currentPage2,busca]
    );

    const produtoAPI = (url = "http://localhost:55366/api/produtos") => {
        return {
            fetchAll: () => axios.get(url),
            //fetchByPaginationNome: (wordkey) => axios.get(url + "/GetProdutosPaginacao/" + wordkey),
            fetchByPagination: () => axios.get(`${url}/GetProdutosPaginacao/${currentPage2}/${PAGESIZE}/${busca}`),
            create: (newRecord) => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + "/" + id, updatedRecord),
            delete: (id) => axios.delete(url + "/" + id)
        }
    }

    function refreshProdutoList() {
        console.log("l 28");
        produtoAPI().fetchByPagination()
            .then(resp => {
                setProdutoList(resp.data); setTotalItens(resp.data[0] != undefined ? resp.data[0].qtdTotalItens : 0);
                console.log("47 total itens " + totalItens); console.log("resp:" + JSON.stringify(resp.data[0])) })
            .catch(err => console.log("o erro lina 26 foi : " + err));

        console.log("linha 33" + produtoList.length);

    }

    const onDelete = (e, id) => {
        //e.preventDefault()

        // Como o botão está dentro de uma div que já tinha seu proprio onClick, precisa do stopPropagation senão tanto o click
        // do botão quanto da div serão acionados
        e.stopPropagation();
        if (confirm("tem certeza ?")) {
            produtoAPI().delete(id)
                .then(resp => refreshProdutoList())
                .catch(erro => console.log(erro));
        }

    }

    const handleBusca = () => {
        setBusca(values.busca != undefined ? values.busca : "");
        console.log("78 busca " + busca);
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
        <div>
            <h1> Produtos admin 0253</h1>
            <input type="text" placeholder="busca" name="busca" onChange={handleInputChange} />
            <button onClick={handleBusca} >Buscar</button>

            <div style={{ display: "flex",flexDirection:"column" }}>
                <div>
                    <Link to={"/ProdutoForm/0"} > Novo Produto </Link>
                </div>


                <table border="1px">
                    <tbody>
                        <tr>
                            <td>Prod id</td>
                            <td>Prod nome</td>
                            <td>Prod desc</td>
                            <td>Prod valor</td>
                            <td>Thumbr</td>
                            <td>Deletar</td>
                            <td>Editar</td>
                        </tr>
                        {
                            (produtoList.length > 0 &&
                                produtoList.map(produto => (
                                    <tr key={produto.produtoId}>
                                        <td>{produto.produtoId}</td>
                                        <td>{produto.produtoNome}</td>
                                        <td>{produto.produtoDescricao}</td>
                                        <td>{produto.produtoValor}</td>
                                        <td>

                                            <img src={produto.imageSrc != "http://localhost:55366/images/" ? produto.imageSrc : logo} className="thumb" alt={produto.imageSrc} />
                                        </td>
                                         
                                        <td>
                                            <button onClick={(e) => onDelete(e, parseInt(produto.produtoId))} >Deletar</button>
                                        </td>
                                        <td>

                                            <Link style={{ border: "solid 1px red" }} to={`/produtoForm/${produto.produtoId}`} >editar</Link>
                                        </td>
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                </table>
                <br />
                {totalItens > 0 &&
                    <Pagination
                        pageSize={PAGESIZE}
                        totalItens={totalItens}
                        currentPage2={currentPage2}
                        setCurrentPage2={setCurrentPage2}

                    />

                }
            </div>
        </div>

    );
}