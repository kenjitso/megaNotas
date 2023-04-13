import React from "react"
import { Container} from "react-bootstrap"
import { Outlet } from "react-router-dom"
import { MenuMega } from "../MenuMega"


export default function PageUsuario() {



    return (
        <React.Fragment>
            <MenuMega />
           
            <Container style={{marginTop:"30px"}}>
                <Outlet />
            </Container>

        </React.Fragment>)

}