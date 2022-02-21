import React from "react";
import { useHistory, Link } from 'react-router-dom';
import styles from "./Navbar.module.css";
import logo from "../../img/costs_logo.png";
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
        <nav className={styles.navbaradmin}>
            {/*            <Container>*/}

            <input type="checkbox" onChange={(e) => checkBoxChanged(e)} className={ styles.check} id="check"/>

            <Link to="/" > Admin</Link>

            <ul className={`${styles.list} ${ checked==true ? styles.newstyle : styles.oldstyle}`} >
                {/*<li >*/}
                {/*    <Link onClick={checkBoxChanged} to="/" >Home</Link>  */}{/* o Link é renderizado como uma tag <a>*/}
                   
                {/*</li>*/}

                <li >
                    <Link onClick={checkBoxChanged} to="/home2" >Produtos</Link>  {/* o Link é renderizado como uma tag <a>*/}

                </li>

                <li>
                    <Link onClick={checkBoxChanged} to="/ProdutoForm/0" >Novo Produto</Link>
                </li>

                <li>
                    {logged
                        ? <a onClick={logout } >Logout</a>
                        : <Link onClick={checkBoxChanged} to="/login" >Logout</Link>
                    }

                </li>


                </ul>

            <label htmlFor="check" className={styles.checkbtn}>
                < GiHamburgerMenu />
            </label>

        </nav>



    );

}