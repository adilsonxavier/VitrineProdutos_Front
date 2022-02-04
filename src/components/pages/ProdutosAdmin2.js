import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function ProdutosAdmin2() {
  


    const [produtoList, setProdutoList] = React.useState([]);

    const [recordForEdit, setRecordForEdit] = React.useState(null);

    React.useEffect(() => {

        refreshProdutoList();
        if (recordForEdit != null) {
            setValues(recordForEdit)
        }
    }, [recordForEdit]
    );

    const produtoAPI = (url = "http://localhost:55366/api/produtos") => {
        return {
            fetchAll: () => axios.get(url),
            fetchByName: (wordkey) => axios.get(url + "/GetProdutoByName/" + wordkey),
            create: (newRecord) => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + "/" + id, updatedRecord),
            delete: (id) => axios.delete(url + "/" + id)
        }
    }

    function refreshProdutoList() {
        console.log("l 28");
        produtoAPI().fetchAll()
            .then(resp => { setProdutoList(resp.data); console.log("resp:"+resp.data) })
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

    return (
        <div>
            <h1> Produtos admin 0253</h1>
            <div style={{display:"flex"}}>
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
                                            <button onClick={(e) => onDelete(e, parseInt(produto.produtoId))} >Deletar</button>
                                        </td>
                                        <td>
                                           
                                            <Link to={`/produtoForm/${produto.produtoId}`} >editar </Link>
                                        </td>
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>

    );
}