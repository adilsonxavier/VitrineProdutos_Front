import React from "react";
import Foto from "./Foto";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import api from "../../api"
import styles from "./Fotos.module.css";
import { FaTrash } from "react-icons/fa"



export default function Fotos() {
    const { id } = useParams()
    const [fotos, setFotos] = React.useState([]);
    const [recordForEdit, setRecordForEdit] = React.useState(null);

        React.useEffect(() => {
        // console.log("AC.useeffect executado");
        const token = localStorage.getItem("token");
        if (token) {
            api.defaults.headers.Authorization = token;
        }
    }, []);


    React.useEffect(() => {
        console.log("fotos 1844");
        refreshFotosList();
    }, []
    );

    function refreshFotosList() {
        api.get(`/fotos/GetFotosProduto/${id}`, id)
            .then(resp => { setFotos(resp.data); console.log(resp.data) })
    }

    const onDelete = (e, id) => {
        e.preventDefault() 

        e.stopPropagation();
        if (confirm("Tem certeza que quer deletar a imagem?")) {
            api.delete(`/fotos/${id}`)
                .then(resp => refreshFotosList())
                .catch(erro => console.log(erro));
        }

    }

    const estiloimagem = {
        width: "200px",
        height: "200px"
    }

    return (
        <div className={styles.contpagina}>
            <div className={styles.fotosheader}>
                        <Link  to={`/produtoForm/${id}`} >Voltar</Link> 
                        <h1 className="display-4">Fotos do Produto {id}</h1>
            </div>

            <div className={styles.contcadastrofotos}>

                <div className={styles.esquerda}>
                    <div >
                        <Foto
                            produtoId={id}
                            refreshFotosList={refreshFotosList}
                        />
                    </div>
                </div>

                <div className={styles.direita}>
                        {
                            fotos.length > 0 &&
                            <ul className={styles.listafotos}>
                                {
                                    (
                                        fotos.map(
                                            (foto) => (
                                                <li key={foto.fotoId}>
                                                    <img src={foto.imageSrc} className="card-img-top rounded-circle" style={estiloimagem} ></img>
                                                    <button onClick={(e) => onDelete(e, parseInt(foto.fotoId))} className={styles.icons} > <FaTrash /> </button>

                                                </li>
                                            )
                                        ))
                                }
                            </ul>
                        }
                </div>
            </div>

            <div style={{ display: "flex" }}>

           

            </div>



        </div>
    );
}

