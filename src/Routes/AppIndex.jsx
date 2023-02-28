import React from "react";
import { Outlet } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import logo from '../img/logo1.png'
import '../Styles/AppStyles.css'
import { useNavigate } from "react-router-dom";
export default function AppIndex(){
    const navigate = useNavigate()
    return(<>
    <Container>
<div>

        <div className="">
            <div className="text-center">
            <img src={logo} alt='bop logo' className="bop_logo mt-5"/>
            </div>
            <div className="menus">
                                <p className="menu_item m-0" onClick={()=>navigate('/home')}>Home</p>
                                <p className="menu_item m-0" onClick={()=>navigate('/about')}>About</p>
                                <p className="menu_item m-0" onClick={()=>navigate('/menus')}>Menu</p>
                                <p className="menu_item m-0" onClick={()=>navigate('/book')}>Book</p>
            </div>
        </div>
        <Outlet/>
        <div className="">
            <Row className="footer_ mt-2">
                <Col md={6}>

        <img src={logo} alt='bop logo' className="bop_logo_footer"/>
                </Col>
                <Col md={6} className=''>
                    {/* <div className="line"></div> */}
                    <p className="m-0" style={{float:'right', fontSize:10}}>All rights reserved - © Mcferri</p>
                </Col>
            </Row>

        
        </div>
</div>
            </Container>
    </>
    )
}