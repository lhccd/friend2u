import React from 'react';
import {Link} from 'react-router-dom';
import {Form, Row, Col, Button, InputGroup, FormControl, Container} from 'react-bootstrap';
import Page from '../Page';
import styled from 'styled-components'

export class ReportUserPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const Styles = styled.div`
            .btn {
                margin-top: 20px;
            }
            
            .frm {
                font-size: 18px;
                margin: 20px;
                padding: 15px;
            }
           
            .form-control {
                padding: 5px;
                height: 300px;
            }    
            
            .h1 {
                margin-top: 40px;
                text-align:center;
            } 
            
            .row {
                margin-bottom: 30px;
            }
        `
        return (
            <Styles>
                    <h1 className="h1">The user is ...</h1>
                    <Container>
                    <Form className="frm">
                        <Row>
                            <Col>
                        <Form.Check inline label="Seems untrustworthy" type={"checkbox"}/>
                            </Col>
                            <Col>
                        <Form.Check inline label="is positioned in the wrong category" type={"checkbox"}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                        <Form.Check inline label="is used as advertisement" type={"checkbox"}/>
                        </Col>
                        <Col>
                        <Form.Check inline label="is not available anymore" type={"checkbox"}/>
                        </Col>
                        </Row>
                        <Row>
                            <Col>
                        <Form.Check inline label="is spam" type={"checkbox"}/>
                        </Col>
                        <Col>
                        <Form.Check inline label="consists of sexual content" type={"checkbox"}/>
                        </Col>
                        </Row>
                        <Row>
                            <Col>
                        <Form.Check inline label="is forbidden" type={"checkbox"}/>
                        </Col>
                        <Col>
                        <Form.Check inline label="is fraudulent" type={"checkbox"}/>
                        </Col>
                        </Row>
                    </Form>

                    <InputGroup>
                        <FormControl as="textarea" aria-label="With textarea" placeholder="Please write a description to Your report..."/>
                    </InputGroup>
                    </Container>
                    <Button variant="primary">Submit</Button>
            </Styles>
        );
    }
}