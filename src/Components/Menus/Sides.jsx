import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Col, Row } from 'reactstrap'
import ff from '../../img/new_menu/French Fries.JFIF'
import mp from '../../img/new_menu/Mashed Potatoes.JFIF'
import hp from '../../img/new_menu/Herbed Potatoes.JFIF'
function Sides() {
  const navigate = useNavigate()
  const sidesmenus = [
    {
      image: <img src={ff} alt="" className="sub_item_image" />,
      title: 'French Fries',
      price: '₦500.00',
    },
    {
      image: <img src={hp} alt="" className="sub_item_image" />,
      title: 'Herbed Potatoes',
      price: '₦1300.00',
    },
    {
      image: <img src={mp} alt="" className="sub_item_image" />,
      title: 'Mashed Potatoes',
      price: '₦600.00',
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
        <h1 className="about_title">Sides</h1>
        <Row>
          {sidesmenus.map((item) => (
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
export default Sides
