import React from 'react'
import { Card, Col, Row } from 'reactstrap'
function BookHere() {
  return (
    <>
      <Card className="card__ p-3 mt-3">
        <h1 className="about_title">Make a reservation</h1>
        <Row>
          <Col md={6}>
            <div>
              <input placeholder="First Name" className="input_field" />
            </div>
            <div>
              <input placeholder="Last Name" className="input_field" />
            </div>
            <div>
              <input placeholder="Guest Name" className="input_field" />
            </div>
            <div>
              <textarea placeholder="Comment" className="input_field" />
            </div>
            <div>
              <button className="primary_btn mb-4">Submit</button>
            </div>
          </Col>
          <Col md={6}>
            <div class="videowrap">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902.778894532748!2d8.539579814325924!3d11.989795638903932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11ae8108556d09b7%3A0x29c4b1806c5a19ce!2sBites%20of%20paradise!5e0!3m2!1sen!2sng!4v1677264663563!5m2!1sen!2sng"
                style={{ border: 0, width: '100%', height: '300px' }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </Col>
        </Row>
      </Card>
    </>
  )
}
export default BookHere
