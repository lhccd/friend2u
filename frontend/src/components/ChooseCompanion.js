
import React from 'react';
import styled from 'styled-components'
import { CompanionCards } from './CompanionCards';
export class ChooseCompanion extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
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
                <h1 className="h1">Choose Companion</h1>
                <CompanionCards
                    participants = {this.props.participants}
                    onChoose = {this.props.onChoose}
                />
            </Styles>
        );
    }
}