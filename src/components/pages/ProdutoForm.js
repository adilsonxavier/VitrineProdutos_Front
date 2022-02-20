import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import styles from "./ProdutoForm.module.css";
import { Link } from "react-router-dom";
import api from "../../api"

export default function ProdutoForm() {

    const history = useHistory();

    const { id } = useParams();
    //#region ProdutoForm 
    ///////comp ProdutoForm inicio//////////******************************

    const initialFieldValues = {
        produtoId: "0",
        produtoNome: "",
        produtoDescricao: "",
        produtoValor: "0",
        produtoValorAntigo: "0"
     }

    const [values, setValues] = React.useState(initialFieldValues);

    React.useEffect(() => {

        //refreshProdutoList();
        if (id != "0") {
            refeshProduto(id);
        }
        refreshCategoriasList(id);
        //if (recordForEdit != null) {
        //    setValues(recordForEdit)
        //}
    }, []
    );

    const produtoAPI = (url = "http://localhost:55366/api/produtos") => {
        return {
            fetchAll: () => axios.get(url),
            fetchByName: (wordkey) => axios.get(url + "/GetProdutoByName/" + wordkey),
            //fetchById: (id) => axios.get(url + "/" + id),
            create: (newRecord) => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + "/" + id, updatedRecord),
            delete: (id) => axios.delete(url + "/" + id)
        }
    }

    const refeshProduto = (id) => {
        console.log("api getbyid 1310 " + api.defaults.headers.Authorization);
        api.get(`/produtos/${id}`)
        //produtoAPI().fetchById(id)
            .then(resp => {
                setValues(resp.data);
                console.log("dados: " + resp.data);
            })
            .catch(erro => console.log("refresh Produtos erro:"+ erro ));

    }
    const handleInputChange = e => {
        //const [name, value] = e.target;
        console.log(e.target.name)

        setValues(
            {
                ...values,
                [e.target.name]: e.target.value
            }

        );
        console.log(values);

    }

    const handleFormSubmit = e => {
        e.preventDefault();

        if (validate()) {
            const formData = new FormData();
            formData.append("produtoId", values.produtoId);
            formData.append("produtoNome", values.produtoNome);
            formData.append("produtoDescricao", values.produtoDescricao);
            formData.append("produtoValor", values.produtoValor.toString().replace(".", ",")); // precisa ir com vírgula senão chega como int na api
            formData.append("produtoValorAntigo", values.produtoValorAntigo.toString().replace(".", ","));

            addOrEdit(formData, resetForm);

            console.log("ok 54")
        }
        else {
            console.log("tem erro 57")
        }
    }

    const resetForm = () => {
        setValues(initialFieldValues);
        console.log("reset form - success")
        setErrors({});
    }
    const validate = () => {
        let temp = {};
        temp.produtoNome = values.produtoNome == "" ? false : true;
        let produtoValor = values.produtoValor.toString().replace(",", ".");
        temp.produtoValor = produtoValor == "" || isNaN(produtoValor) || parseFloat(produtoValor) <= 0 ? false : true;
        setErrors(temp);
        console.log(temp);
        return Object.values(temp).every(x => x == true);


        //O Object.values(temp) retorna um array com os valores dos elementos do objeto tempo ( só os valores sem os nomes das pro-
        // priedades ) no caso [bool, bool]

        // O Array.every(função) checa se todos os valores do array passam pela função dentro do parâmetro e retorna true apenas se
        // todos os valores passarem pelo teste
        // No caso .every(x => x == false); retorna true (todos os campos ok) apenas se o valor de todos os elementos de temp
        // forem false ( sem erro)
    }
    const [errors, setErrors] = React.useState({});

    const applyErrorClass = (field) => {
        return (field in errors && errors[field] == false) ? " invalid-field" : ""
    };

    const addOrEdit = (formData, onSuccess) => {
       
       // create: (newRecord) => axios.post(url, newRecord),
        if (formData.get("produtoId") == "0") {

            api.post("/produtos/", formData)
           // produtoAPI().create(formData)
                .then(response => { return response.data
                   // resp.json()
                  //  console.log("150" + response.json());
                    //console.log(resp); onSuccess(); /* refreshProdutoList()*/;
                    //alert("Produto inserido com sucesso ");
                    //history.push("/produtosAdmin");
                }
                )
                .then(data => {
                    api.put(`/categorias/PutCategoriasProduto/${data.produtoId}`, categorias)
                    //categoriasAPI().update(data.produtoId, categorias)
                        .then(resp => {
                            console.log("1002 1404")
                             alert("Produto inserido com sucesso ");
                            history.push(`/produtoForm/${data.produtoId}`);
                        })
                        .catch(erro => console.log(erro))

                })
                .catch((err) => { "erro el 19 " + console.log(err) });
        }
        else {
            //update: (id, updatedRecord) => axios.put(url + "/" + id, updatedRecord),
            api.put(`/produtos/${formData.get("produtoId")}`, formData)
           // produtoAPI().update(formData.get("produtoId"), formData)
                .then(resp => {
                    //console.log("erro foi " + resp); onSuccess(); /*refreshProdutoList()*/;
                    //alert("Produto " + formData.get("produtoId") + " atualizado");
                    //history.push("/produtosAdmin");
                    //update: (id, updatedRecord) => axios.put(url + "/PutCategoriasProduto/" + id, updatedRecord),
                    api.put(`/categorias/PutCategoriasProduto/${id}`,categorias)
                   // categoriasAPI().update(id, categorias)
                        .then(resp => {
                            console.log("1002 1400")
                               alert("Produto " + formData.get("produtoId") + " atualizado");
                                 history.push("/produtosAdmin");
                        })
                        .catch(erro => console.log(erro))
                })
                 .catch((err) => { "erro el 60 " + console.log(err) });
        }
    }

    //////////////
    //categoriasAPI().update(id, categorias)
    //    .then(data => console.log(data))
    //    .catch(erro => console.log(erro));
    /////////////


   ///////comp ProdutoForm final//////////****************************************
    //#endregion


    //#region categorias
    /////// checklist categorias inicio /////////cccccccccccccccccccccccccccccccccccccc
    const [categorias, setCategorias] = React.useState([]);
    const categoriasAPI = (url = "http://localhost:55366/api/categorias") => {
        return {
            fetchAll: () => axios.get(url),
            fetchAllByProduto: (id) => axios.get(url + "/GetCategoriasProduto/" + id),
            create: (newRecord) => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + "/PutCategoriasProduto/" + id, updatedRecord),
            delete: (id) => axios.delete(url + "/" + id),

        }
    }

    function refreshCategoriasList(id) {
        console.log("refredh cat id " + id)
        api.get(`/categorias/GetCategoriasProduto/${id}`)
      //  categoriasAPI().fetchAllByProduto(id)
            .then(resp => setCategorias(resp.data))
            .catch(err => console.log("o erro lina 26 foi : " + err));
       // console.log("213 : "+ JSON.stringify(categorias));
        // setValues({ ...values, categorias: categorias });
    }


    const handleOnChangeCategorias = (e, index) => {

        const updatedCheckedState = categorias.map((categoria, position) => {
            let updateElement = {
                //categoriaId: categoria.categoriaId,
                //categoriaName : categoria.categoriaName,
                ...categoria,
                checked: position == index ? !categoria.checked : categoria.checked
            }
            return updateElement;
        });
        setCategorias(updatedCheckedState);
       // console.log("227 " + JSON.stringify(categorias));
        //setValues({ ...values, categorias: categorias });
        //console.log("227 " + JSON.stringify(categorias));
    }

     /////// checklist categorias fim /////////cccccccccccccccccccccccccccccccccccccc
     //#endregion

    return (
  
        <div className={styles.contpagina} >
            <h1>{ id != "0" ? "Editando produto " + id : "Novo produto" }</h1>
            <div >
                {/*<!----- produto form inicio ------->*/}
                <div >
                    <form onSubmit={handleFormSubmit}>
                        <div className={styles.contcadastro }>

                            <div className={styles.mainitens}>

                                <div className={styles.item} >
                                    <label>Nome do produto</label>
                                    <input type="text" name="produtoNome"
                                        value={values.produtoNome}
                                        onChange={handleInputChange}
                                        placeholder="produto nome"
                                        className={`${applyErrorClass("produtoNome")} ${styles.inputtext}`}
                                    />
                                </div>


                                <div className={styles.item} >
                                    <label>Descrição</label>
                                    <textarea type="text" name="produtoDescricao"
                                        value={values.produtoDescricao}
                                        onChange={handleInputChange}
                                        placeholder="descricao"
                                        className={`${applyErrorClass("produtoNome")} ${styles.inputtextarea}`}
                                    />
                                </div>

                                <div className={styles.item}>
                                    <label>Valor</label>
                                    <input type="text" name="produtoValor"
                                        value={values.produtoValor}
                                        onChange={handleInputChange}
                                        placeholder="valor"
                                        className={applyErrorClass("produtoValor")}
                                    />
                                </div>
                            <div className={styles.item}>
                                    <label>Valor Antigo</label>
                                    <input type="text" name="produtoValorAntigo"
                                        value={values.produtoValorAntigo}
                                        onChange={handleInputChange}
                                        placeholder="valor"
                                        className={applyErrorClass("produtoValorAntigo")}
                                    />
                                </div>
                            </div>

                            <section className={styles.sectioncategorias }>
                                    <h1>categorias</h1>
                                    <div >
                                    {
                                        categorias.length > 0 &&
                                        /*<form onSubmit={handleFormSubmit}>*/
                                        (

                                            <ul className={ styles.categoriaslist }>
                                                    {
                                                        (
                                                            categorias.map(
                                                                (categoria, index) => (

                                                                    <li key={categoria.categoriaId}>
                                                                        <input
                                                                            type="checkbox"
                                                                            id={categoria.categoriaId}
                                                                            name={categoria.categoriaNome}
                                                                            value={categoria.categoriaNome}
                                                                            checked={categoria.checked}
                                                                            onChange={(e) => handleOnChangeCategorias(e, index)}
                                                                        />
                                                                        <label htmlFor={categoria.categoriaNome}> {categoria.categoriaNome}</label>
                                                                    </li>
                                                                )
                                                            ))
                                                    }
                                                </ul>
                                            )

                                        }
                                    </div>

                                </section>

                            </div>

                        <div className={styles.divsubmit}>
                            <button type="submit" >{id != "0" ? "Atualizar" : "Cadastrar"}</button>
                        </div>
                        <div className={styles.divlinks}>
                            {id != 0 &&
                                <Link to={`/Fotos/${id}`} >fotos </Link>
                            }
                            &nbsp;
                            <Link to="/produtosAdmin" >Voltar</Link>
                        </div>
                    </form>
                </div >
                {/*<!----- produto form fim ------->*/}
            </div>
        </div >
       
        );

}