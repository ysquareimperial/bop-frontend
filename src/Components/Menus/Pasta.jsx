import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Col, Row } from 'reactstrap'
import sm from '../../img/new_menu/Spaghetti & Meatballs sauce.jpg'
import ss from '../../img/new_menu/Stir Fried Spaghetti.jpg'
import sb from '../../img/new_menu/Spaghetti Bolognese.jpg'
import sss from '../../img/new_menu/sss.jpg'

function Pasta() {
  const navigate = useNavigate()
  const Pastamenus = [
    {
      image: <img src={sm} alt="" className="sub_item_image" />,
      title: 'Spaghetti & Meatballs sauce',
      price: '₦3000.00',
    },
    {
      image: <img src={ss} alt="" className="sub_item_image" />,
      title: 'Stir Fried Spaghetti',
      price: '₦800.00',
    },
    {
      image: <img src={sb} alt="" className="sub_item_image" />,
      title: 'Spaghetti Bolognese',
      price: '₦2000.00',
    },
    {
      image: <img src={sss} alt="" className="sub_item_image" />,
      title: 'Spaghetti Lomein',
      price: '₦2500.00',
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
        <h1 className="about_title">Pasta & Spaghetti</h1>
        <Row>
          {Pastamenus.map((item) => (
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
export default Pasta
