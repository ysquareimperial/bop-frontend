import React from "react";
import { Card, Col, Row } from "reactstrap";
import beef from '../img/menu/beef.jpg'
import soup from '../img/menu/soup.jpg'
import pasta from '../img/menu/pasta1.jpg'
import appetizers from '../img/menu/appetizers.jpg'
import sides from '../img/menu/sides.jpg'
import lunch from '../img/menu/lunch.jpg'
import englishbreakfast from '../img/menu/EbToast.jpg'
import breakfast from '../img/menu/breakfast.jpg'
import { useNavigate } from "react-router-dom";
export default function Menus(){
    const navigate = useNavigate()
    const menu=[
        {image:<img className="menu_img" src={breakfast}/>, title:'Breakfast' ,link:'/menus/breakfast'},
        {image:<img className="menu_img" src={englishbreakfast}/>, title:'English Breakfast' ,link:'/menus/englishbreakfast'},
        {image:<img className="menu_img" src={lunch}/>, title:'Lunch' ,link:'/'},
        {image:<img className="menu_img" src={pasta}/>, title:'Pasta' ,link:'/'},
        {image:<img className="menu_img" src={beef}/>, title:'Beef' ,link:'/'},
        {image:<img className="menu_img" src={sides}/>, title:'Sides' ,link:'/'},
        {image:<img className="menu_img" src={appetizers}/>, title:'Appetizers' ,link:'/'},
        {image:<img className="menu_img" src={soup}/>, title:'Soup'}
    ]
    return(
        <>
        <Card className="card__ p-3 mt-3">

      
    <h1 className="about_title">Menu</h1>
    <Row>
        {menu.map((item)=>(

            <Col md={3}>
                <Card className="menu_card p-2 shadow-sm mb-4" onClick={()=>navigate(item.link)}>

{item.image}
<p className="menu_title">{item.title}</p>

                </Card>

        </Col>
            ))}
    </Row>
<Row>

</Row>
    </Card>
        </>
    )
}