import React from 'react';
import { Jumbotron as Jumbo, Container} from 'react-bootstrap';
import styled from 'styled-components';
import jumbotronBg from '../media/jumbotronBg.jpg';

const Styles = styled.div`
    .jumbo {
        background: url(${jumbotronBg});
        background-size: cover;
        color: #efefef;
        text-align: center;
        height: 200px;
        position: relative;
    }
    
    .overlay {
        background-color: #000;
        opacity: 0.2;
        position: absolute; 
        top: 0; 
        left: 0;
        bottom: 0; 
        right: 0; 
     } 
`;

export const Jumbotron = () => (
        <Styles>
            <Jumbo fluid className="jumbo">
                <div className="overlay"></div>
                <Container>
                    <h1>Welcome to Friend2U</h1>
                    <p>Friend2U is an activity-based innovative meeting platform!</p>
                </Container>
            </Jumbo>
        </Styles>
)