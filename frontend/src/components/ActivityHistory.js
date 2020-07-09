
import React from 'react';
import { Tabs, Tab} from 'react-bootstrap';
import styled from 'styled-components'
import Page from './Page';
import { ActivityListCards } from './ActivityListCards'

export class ActivityHistory extends React.Component {

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
                <Page>
                    <h1 className="h1">My Activity History</h1>
                    <Tabs defaultActiveKey="activityhistory" id="activityhistory" onSelect={this.props.handleSelect}>
                        <Tab eventKey="created" title="Created">
                            <ActivityListCards
                            activities = {this.props.activities}
                            />
                        </Tab>
                        <Tab eventKey="joinedactivity" title="JoinedActivity">
                        </Tab>
                        <Tab eventKey="histories" title="Histories">
                        </Tab>
                    </Tabs>
                </Page>
            </Styles>
        );
    }
}