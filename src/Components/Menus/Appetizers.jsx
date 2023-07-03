import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Col, Row } from 'reactstrap'
import sc from '../../img/new_menu/Samosa ChickenBeefs.jpg'
import sp from '../../img/new_menu/Springrolls ChickenVeg.jpg'
import bw from '../../img/new_menu/Buffalo Wings.jpg'

function Appetizers() {
  const navigate = useNavigate()
  const appetizersmenus = [
    {
      image: <img src={sc} alt="" className="sub_item_image" />,
      title: 'Samosa Chicken/Beefs',
      price: '₦100.00',
    },
    {
      image: <img src={sp} alt="" className="sub_item_image" />,
      title: 'Springrolls Chicken/Veg',
      price: '₦100.00',
    },
    {
      image: <img src={bw} alt="" className="sub_item_image" />,
      title: 'Buffalo Wings (pack of 4)',
      price: '₦1500.00',
    },
    
  
    
  ]
  return (
    <>
      <Card className="card__ p-3 mt-3">
        <span
          style={{ fontSize: 15, cursor: 'pointer', color: 'red' }}
          onClick={() => navigate(-1)}
        >
          /Go Back
        </span>
        <h1 className="about_title">Appetizers</h1>
        <Row>
          {appetizersmenus.map((item) => (
            <Col md={3}>
              <Card className="p-2 submenu_card mb-3 shadow-sm">
                {item.image}
                <p className="item_title m-0">{item.title}</p>
                <p className="item_price">{item.price}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </>
  )
}
export default Appetizers
