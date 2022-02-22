import React from "react";
import { useHistory, Link } from 'react-router-dom';
import styles from "./Navbar.module.css";
import logo from "../../img/logosite.png";
import { Context } from "../Contexts/Context1";
import { GiHamburgerMenu } from "react-icons/gi";


export default function Navbar(props) {
    const { logged, setLogged } = React.useContext(Context);
    const history = useHistory();

    const [checked, setChecked] = React.useState(false);

    const logout = () => {
        localStorage.removeItem("token");
        setLogged(false);
        history.push("/login");
    }

    const checkBoxChanged = () => {
        setChecked(!checked);
    }


    return (
        <nav className={styles.navbar}>
            {/*            <Container>*/}

            <input type="checkbox" onChange={(e) => checkBoxChanged(e)} className={ styles.check} id="check"/>

            <Link to="/" ><img src={logo } /></Link>

            <ul className={`${styles.list} ${ checked==true ? styles.newstyle : styles.oldstyle}`} >
                <li >
                    <Link onClick={checkBoxChanged} to="/" >Home</Link>  {/* o Link é renderizado como uma tag <a>*/}
                   
                </li>

                <li >
                    <Link onClick={checkBoxChanged} to="/NossosProdutos" >Nossos Produtos</Link>  {/* o Link é renderizado como uma tag <a>*/}

                </li>

                <li>
                    <Link onClick={checkBoxChanged } to="/company" >Empresa</Link>
                </li>

                <li>
                    <Link onClick={checkBoxChanged} to="/login" >Admin</Link>
                </li>


                </ul>

            <label htmlFor="check" className={styles.checkbtn}>
                < GiHamburgerMenu />
            </label>

        </nav>



    );

}