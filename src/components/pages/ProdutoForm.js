import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import styles from "./ProdutoForm.module.css";
import { Link } from "react-router-dom";
import api from "../../api"
import { FaCamera} from "react-icons/fa"

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

        if (id != "0") {
            refeshProduto(id);
        }
        refreshCategoriasList(id);
    }, []
    );

    

    const refeshProduto = (id) => {
        api.get(`/produtos/${id}`)
            .then(resp => {
                setValues(resp.data);
            })
            .catch(erro => console.log("refresh Produtos erro:"+ erro ));

    }
    const handleInputChange = e => {

        setValues(
            {
                ...values,
                [e.target.name]: e.target.value
            }

        );
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

        }
        else {
            console.log("tem erro - linha 72 ")
        }
    }

    const resetForm = () => {
        setValues(initialFieldValues);
        setErrors({});
    }
    const validate = () => {
        let temp = {};
        temp.produtoNome = values.produtoNome == "" ? false : true;
        let produtoValor = values.produtoValor.toString().replace(",", ".");
        temp.produtoValor = produtoValor == "" || isNaN(produtoValor) || parseFloat(produtoValor) <= 0 ? false : true;
        setErrors(temp);
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
       
        if (formData.get("produtoId") == "0") {

            api.post("/produtos/", formData)
                .then(response => { return response.data } )
                .then(data => {
                    api.put(`/categorias/PutCategoriasProduto/${data.produtoId}`, categorias)
                        .then(resp => {
                             alert("Produto inserido com sucesso ");
                            history.push(`/produtoForm/${data.produtoId}`);
                        })
                        .catch(erro => console.log(erro))

                })
                .catch((err) => { "erro el 19 " + console.log(err) });
        }
        else {
            api.put(`/produtos/${formData.get("produtoId")}`, formData)
                .then(resp => {
                    api.put(`/categorias/PutCategoriasProduto/${id}`,categorias)
                        .then(resp => {
                               alert("Produto " + formData.get("produtoId") + " atualizado");
                                 history.push("/produtosAdmin");
                        })
                        .catch(erro => console.log(erro))
                })
                 .catch((err) => { "erro el 60 " + console.log(err) });
        }
    }


   ///////comp ProdutoForm final//////////****************************************
    //#endregion


    //#region categorias
    /////// checklist categorias inicio /////////cccccccccccccccccccccccccccccccccccccc
    const [categorias, setCategorias] = React.useState([]);

    function refreshCategoriasList(id) {
        api.get(`/categorias/GetCategoriasProduto/${id}`)
            .then(resp => setCategorias(resp.data))
            .catch(err => console.log("o erro lina 146 foi : " + err));

    }


    const handleOnChangeCategorias = (e, index) => {

        const updatedCheckedState = categorias.map((categoria, position) => {
            let updateElement = {
                ...categoria,
                checked: position == index ? !categoria.checked : categoria.checked
            }
            return updateElement;
        });
        setCategorias(updatedCheckedState);
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
                                <Link to={`/Fotos/${id}`} >
                                <div className={styles.divfotos}>
                                    <span className={styles.icocamera}><FaCamera /></span>&nbsp;
                                    <span>Fotos</span>
                                </div>
                            </Link>
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