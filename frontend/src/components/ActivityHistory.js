
import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import styled from 'styled-components'
import { ActivityListCards } from './ActivityListCards'
export class ActivityHistory extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
           
        }
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
                <h1 className="h1">My Activity History</h1>
                <Tabs defaultActiveKey="activityhistory" id="activityhistory" onSelect={this.handleSelect} >
                    <Tab eventKey="Created" title="Created">
                        <ActivityListCards
                            activities={this.props.createdactivities}
                            mode="Created"
                        />
                    </Tab>
                    <Tab eventKey="Joined" title="JoinedActivity">
                        <ActivityListCards
                            activities={this.props.joinedactivities}   
                            mode="Joined"
                        />
                    </Tab>
                    <Tab eventKey="Histories" title="Histories">
                        <ActivityListCards
                            activities={this.props.historyactivities}
                            mode="Histories"
                        />
                    </Tab>
                </Tabs>
        
                
            </Styles>
        );
    }
}

