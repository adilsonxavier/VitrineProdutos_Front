import React from "react";
import axios from "axios";
import { useHistory, Link } from 'react-router-dom';
import logo from "../../img/costs_logo.png";
import Pagination from "../layout/Pagination";
import Loading from "../layout/Loading";
import { Context } from "../Contexts/Context1";
import api from "../../api";
import styles from "./ProdutosAdmin2.module.css";
import { FaTrash,FaPencilAlt} from "react-icons/fa"


export default function ProdutosAdmin2() {
    //////////// Paginação ///////////
    const PAGESIZE = 6;
    // const TOTALITENS= 120;
    //const SKIP = 24;
    //const [skip, setSkip] = React.useState(0);
    const [currentPage2, setCurrentPage2] = React.useState(1);
    const [totalItens, setTotalItens] = React.useState(0);

     //////////// Paginação fim ///////////

    const history = useHistory();

    const { authorized, setAuthorized, baseUrl, checkExpiredToken,logged} = React.useContext(Context);

  /*  const [token, setToken] = React.useState("");*/

    const [busca, setBusca] = React.useState("");
    const [values, setValues] = React.useState("");
    const [showLoading, setShowLoading] = React.useState(true);

    const [produtoList, setProdutoList] = React.useState([]);

   // const [recordForEdit, setRecordForEdit] = React.useState(null);

    React.useEffect(() => {

        console.log("logged " + logged);
      //  console.log("token refresh 34 " + token);
        //var tokenAtual = localStorage.getItem("token");
        //console.log(" token atual useeffect 1728" + tokenAtual);
        if (checkExpiredToken()) {
            alert("token expirado! \n Faça novo login.");
            history.push("/login");
        }


        //if (!tokenAtual) {
        //    history.push("/login");
        //  }
        //const token = localStorage.getItem("token");
        //if (token) {
        //    api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
        //   // setAuthenticated(true);
        //}
        //setToken(tokenAtual);.

             // console.log("AC.useeffect executado");
            const token = localStorage.getItem("token");
        if (token) {
            api.defaults.headers.Authorization = token;
        }

        refreshProdutoList();
        //if (recordForEdit != null) {
        //    setValues(recordForEdit)
        //}
    }, [currentPage2,busca]
    );

    //const produtoAPI = (url = "http://localhost:55366/api/produtos") => {
    //    return {
    //        fetchAll: () => axios.get(url),
    //        //fetchByPaginationNome: (wordkey) => axios.get(url + "/GetProdutosPaginacao/" + wordkey),
    //        fetchByPagination: (tokenAtual) => axios.get(`${url}/GetProdutosPaginacao/${currentPage2}/${PAGESIZE}/${busca}`, {
    //            headers: {
    //                "Authorization": `Bearer ${tokenAtual}`
    //            }
    //          }),
    //        create: (newRecord) => axios.post(url, newRecord),
    //        update: (id, updatedRecord) => axios.put(url + "/" + id, updatedRecord),
    //        delete: (id) => axios.delete(url + "/" + id, {
    //            headers: {
    //                "Authorization": `Bearer ${tokenAtual}`
    //            }
    //        })
    //    }
    //}

    function refreshProdutoList() {
        console.log("api def prodadm 1202 " + api.defaults.headers.Authorization);
        api.get(`/produtos/GetProdutosPaginacao/${currentPage2}/${PAGESIZE}/${busca}`)
        //produtoAPI().fetchByPagination(JSON.parse(token))
            .then(resp => {
                setProdutoList(resp.data); setTotalItens(resp.data[0] != undefined ? resp.data[0].qtdTotalItens : 0);
                setShowLoading(false);
                console.log("47 total itens " + totalItens); console.log("resp:" + JSON.stringify(resp.data[0])) })
            .catch(err => console.log("o erro lina 26 foi : " + err));

        console.log("linha 33" + produtoList.length);

    }

    const onDelete = (e, id) => {
        //e.preventDefault()

        // Como o botão está dentro de uma div que já tinha seu proprio onClick, precisa do stopPropagation senão tanto o click
        // do botão quanto da div serão acionados
        console.log("delete 85 1251");

        e.stopPropagation();
        if (confirm("tem certeza ?")) {
            api.delete(`/produtos/${id}`)
          //  produtoAPI().delete(id, JSON.parse(token))
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
        <div className={styles.contpagina}>
            <h1> Produtos admin 0253</h1>

            <section className={styles.busca}>
                <div className={styles.esquerda}>
                    <input type="text" placeholder="busca" name="busca" className={styles.inputtext} onChange={handleInputChange} />
                    <button onClick={handleBusca} >Buscar</button>
                    {
                        showLoading &&
                        (
                            <Loading />
                        )
                    }
                </div>
                <div className={styles.direita}>
                    <div>
                        <Link to={"/ProdutoForm/0"} ><button className={styles.nowrapbtn }> Novo Produto </button></Link>
                    </div>
                </div>

            </section>




            <table className={styles.tableprod } >
                    <tbody>
                        <tr>
                        <th className={styles.priority2} style={{ minWidth: "5%" }}> Id</th>
                        <th className={styles.priority0} > Nome</th>
                        <th className={styles.priority3} style={{ minWidth: "35%" }}> Descrição</th>
                        <th className={styles.priority1} style={{ minWidth: "15%" }}> Valor</th>
                        <th className={styles.priority3} style={{ minWidth: "15%" }}> De</th>
                        <th className={styles.priority2} style={{ minWidth: "15%" }}> Thumbr</th>
                        <th className={styles.priority1} style={{ minWidth: "10%" }}> Deletar</th>
                        <th className={styles.priority1} style={{ minWidth: "10%" }}> Editar</th>
                        </tr>
                        {
                            (produtoList.length > 0 &&
                                produtoList.map(produto => (
                                    <tr key={produto.produtoId}>
                                        <td className={styles.priority2} >  {produto.produtoId}</td>
                                        <td className={styles.priority0} >   {produto.produtoNome}</td>
                                        <td className={styles.priority3} >  {produto.produtoDescricao}</td>
                                        <td className={styles.priority1} > R$  {Number(produto.produtoValor).toFixed(2).replace(".",",")}</td>
                                        <td className={styles.priority3}  > R$  {Number(produto.produtoValorAntigo).toFixed(2).replace(".", ",")}</td>
                                        <td className={styles.priority2} >

                                            <img src={produto.imageSrc != "http://adilsonxavier-001-site1.itempurl.com/images/" ? produto.imageSrc : logo} className="thumb" alt={produto.imageSrc} />
                                        </td>
                                         
                                        <td className={`${styles.priority1} ${styles.centered}`}>
                                            <button onClick={(e) => onDelete(e, parseInt(produto.produtoId))} className={ styles.icons} ><FaTrash/></button>
                                        </td>
                                        <td className={`${styles.priority1} ${styles.centered}`}>

                                            <Link className={styles.icons}  to={`/produtoForm/${produto.produtoId}`} ><FaPencilAlt/></Link>
                                        </td>
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                </table>

            <div className={ styles.paginationcontainer } >
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