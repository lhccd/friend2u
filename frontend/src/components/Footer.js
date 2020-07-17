import React from 'react';
import {FaInstagramSquare as Ig, FaTwitterSquare as Tw, FaFacebookSquare as Fb, FaLinkedin as Ln} from 'react-icons/fa'
import {Container, Row, Col} from 'react-bootstrap';

export class Footer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Container fluid style={{backgroundColor:"#333", color:"#fff", fontSize:"30px", marginTop:"0px", marginBottom:"0", padding:"auto", bottom: "0", position: "flexible"}}>
                    <Row className="justify-content-around text-center">
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

