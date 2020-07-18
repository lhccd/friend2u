import React from 'react';
import {FaInstagramSquare as Ig, FaTwitterSquare as Tw, FaFacebookSquare as Fb, FaLinkedin as Ln} from 'react-icons/fa'
import {Container, Row, Col, Popover, OverlayTrigger, Button} from 'react-bootstrap';

const popover = (
    <Popover id="popover-basic">
        <Popover.Title as="h3">Impressum</Popover.Title>
        <Popover.Content>
            <strong>Friend2U GmbH</strong><br/><br/>
            Boltzmannstraße 3<br/>
            85748 Garching bei München<br/><br/><br/>
            <p><strong>Contact</strong><br/>
                E-Mail: friend2u@gmail.com<br/><br/>

                <strong>Management Board</strong><br/>
                Riccardo Pagliuca, Hendrik Bothe, Zeyu Zhou & Lorenz Dang<br/><br/>

                <strong>Responsible for Content</strong><br/>
                Riccardo Pagliuca, Hendrik Bothe, Zeyu Zhou & Lorenz Dang<br/><br/>

                The pictures on our website were used from the following sources:<br/>
                <ul>
                    <li>Getty Images</li>
                    <li>iStock</li>
                    <li>LifeArt Images</li>
                    <li>Flickr</li>
                </ul>
                </p>
        </Popover.Content>
    </Popover>
);

const Impressum = () => (
    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
        <Button variant="light">Impressum</Button>
    </OverlayTrigger>
);

export class Footer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Container fluid style={{backgroundColor:"#333", color:"#fff", fontSize:"30px", marginTop:"0px", marginBottom:"0", padding: "10px", bottom: "0", position: "flexible"}}>
                    <Row className="justify-content-around text-center">
                        <Col>
                            <h1 style={{color:"white"}}>Friend2U</h1>
                        </Col>
                        <Col>
                            <Impressum/>
                        </Col>
                        <Col>
                            <Ig/>
                        </Col>
                        <Col>
                            <Tw/>
                        </Col>
                        <Col>
                            <Fb/>
                        </Col>
                        <Col>
                            <Ln/>
                        </Col>
                    </Row>
                    <div>
                        <p className="text-center" style={{color:"#fff"}}>© F2U - Friend to You. All rights reserved.</p>
                    </div>
                </Container>
            </React.Fragment>
        );
    }
}

