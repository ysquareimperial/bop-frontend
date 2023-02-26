import React from "react";
import { Card, Col, Row } from "reactstrap";
import about from '../img/mario-and-adrian.jpg'

export default function About(){
    return(
        <>
        <Card className="card__ p-3 mt-3">

      <Row>
<Col md={6}>
    <h1 className="about_title">About Us</h1>
<p>Based in Kano City, Bites of Paradise is a family owned restaurant, focused on traditional and continental recipes served with a modern twist.
</p>
<p>
    The chefs draw inspiration from Italian, English, Arabian and Hausa culture and have a menu of that suits all times of the day and season.
    </p>
<p>

The Bites of Paradise has a rustic and relaxed atmosphere with moderate prices, making it a popular place for a meal any time of the day.
</p>
<p>
Bites of Paradise two Kano sisters, Hajiya and Hajjo, who are passionate about owning a restaurant that offers a tantalizing receipe and service that will be delightful and memorable to their customers.
    </p>
<p>
To craft the menu, Hajiya relies on family recipes and her experience as a chef in Italy.
</p>
<p>
Hajjo does all the marketing for the restaurant and led the effort to expand the menu beyond classic local to incorporate additional cuisines from the other continents.</p>
</Col>
<Col md={6}>
<figure class="figure">
          <img
            src={about}
            alt="Mario and Adrian"
            className="about_image"
          />
          <figcaption class="figure-caption">
            Bites of Paradise owners Hajiya and Hajjo.
          </figcaption>
        </figure>
</Col>
        </Row>
        </Card>
        </>
    )
}



