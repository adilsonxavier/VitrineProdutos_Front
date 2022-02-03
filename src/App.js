import React from "react";
import { BrowserRouter as Router, Route, Switch,Link } from "react-router-dom"
import Home from "./components/pages/Home";
import Company from "./components/pages/Company";
import Container from "./components/layout/Container";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Login from "./components/pages/login";
import ProdutosAdmin from "./components/pages/ProdutosAdmin";

export default function App() {
    return (
        <Router >


            <Header />

            <Container >
            <Switch>

                    <Route exact path="/">
                        <Home />
                    </Route>

                    <Route  path="/company">
                        <Company />
                    </Route>

                    <Route path="/admin">
                        <Login />
                    </Route>

                    <Route  path="/produtosAdmin">
                        <ProdutosAdmin />
                    </Route>
              
             </Switch>

            </Container>
          <Footer/>
        </Router>

    );
}