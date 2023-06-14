import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col, Row } from "reactstrap";
import ms from '../../img/new_menu/Minestrone Soup.JFIF'
import cs from '../../img/new_menu/Chicken Sweet corn creamy.JPEG'
import ps from '../../img/new_menu/Peking Soup.JFIF'
function Soup(){
    const navigate = useNavigate()
    const SoupMenu = [
{
    image:<img src={ms} alt='' className="sub_item_image"/>,
    title:'Minestrone Soup',
    price:'₦1500.00'
},
{
    image:<img src={cs} alt='' className="sub_item_image"/>,
    title:'Chicken Sweet corn creamy',
    price:'₦1500.00'
},{
    image:<img src={ps} alt='' className="sub_item_image"/>,
    title:'Peking Soup',
    price:'₦1500.00'
}
    ]
    return(
        <>

          <Card className="card__ p-3 mt-3">

      
        <span style={{fontSize:15, cursor:'pointer', color:'red'}} onClick={()=>navigate(-1)}>/Go Back</span>
    <h1 className="about_title">Soup</h1>
    <Row>
        {SoupMenu.map((item)=>(

            <Col md={3}>
                <Card className="p-2 submenu_card mb-3 shadow-sm">

                {item.image}
                <p className="item_title m-0">
                    {/* {if(item.title.length>16){
                      item.title.substring(0,16)...  
                    }else{
                        item.title
                    }} */}
{item.title.length>23?`${item.title.substring(0,23)}...`:item.title}

                </p>
                <p className="item_price">

{item.price}
                </p>
                </Card>
        </Col>
            ))}
        </Row>
        </Card>
        </>
    )
}
export default Soup