import React from "react";
import logo from "../../img/costs_logo.png";
import styles from  "./Carrossel.module.css";
import chevronright from "../../static/images/chevronright.png";
import api from "../../api"


export default function Carrossel(props) {
    const [fotos, setFotos] = React.useState([])
    const carouselRef = React.useRef(null)

    React.useEffect((
    ) => {
        refreshFotosList();
    }, []);

    function refreshFotosList() {
        api.get(`/fotos/GetFotosProduto/${props.produtoId}`, props.produtoId)
            //fotosAPI().fetchAllByProduto(id)
            .then(resp => { setFotos(resp.data); console.log(resp.data) })
            .catch(err => console.log("o erro lina 26 foi : " + err));

    }

    if (!fotos || !fotos.length) { return false; }

    const handleLeftClick = (e) => {
        e.preventDefault();
        console.log(carouselRef.current.offsetWidth);
        console.log(carouselRef.current.offsetHeight);
        carouselRef.current.scrollLeft -= carouselRef.current.offsetWidth 
    }

    const handleRightClick = (e) => {
        e.preventDefault();
        carouselRef.current.scrollLeft += carouselRef.current.offsetWidth 
    }

    return (
        (fotos &&
            (
            <div className={styles.bodycaroulsel}>
                <div className={styles.container}>
                    <div className={styles.carousel} ref={carouselRef}>
                        {fotos.map((foto) => {
                            return (
                                <div className={styles.item} key={foto.fotoId}>
                                    <div className={styles.image}>
                                        <img src={foto.imageSrc} alt="shoe" />
                                    </div>
                                    <div className={styles.info}>
                                        <span className={styles.name}>{foto.description}</span>
                                    </div>
                                </div>)
                        })}


                    </div>
                    <div className={styles.buttons} >
                        <button onClick={handleLeftClick}> <img src={chevronright} alt="scroll left" /> </button>
                        <button onClick={handleRightClick} > <img src={chevronright} alt="scroll right" /> </button>
                    </div>
                </div>
            </div>
            )
        )
    );
}

