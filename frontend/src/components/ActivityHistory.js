
import React from 'react';
import { Tabs, Tab, ListGroupItem, Button } from 'react-bootstrap';
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ActivityListCards } from './ActivityListCards'
export class ActivityHistory extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const emptycreated = this.props.createdactivities.length == 0
        const emptyjoined = this.props.joinedactivities.length == 0
        const emptyhis = this.props.historyactivities.length == 0
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
                        {emptycreated ?
                            <ListGroupItem className="list-group-item-info"> currently you have not created any ongoing activities.<br />
                                <Link to={'/activities/create'}>
                                    <Button>
                                        Create your own activity
                                            </Button>
                                </Link>       </ListGroupItem> : null}

                    </Tab>
                    <Tab eventKey="Joined" title="JoinedActivity">
                        <ActivityListCards
                            activities={this.props.joinedactivities}
                            mode="Joined"
                        />
                        {emptyjoined ?
                            <ListGroupItem className="list-group-item-info"> currently you have not joined any ongoing activities.<br />
                                <Link to={'/activities/search'}>
                                    <Button>
                                        Search for activites
                                            </Button>
                                </Link>       </ListGroupItem> : null}
                    </Tab>
                    <Tab eventKey="Histories" title="Histories">
                        <ActivityListCards
                            activities={this.props.historyactivities}
                            mode="Histories"
                        />         {emptyhis ?
                            <ListGroupItem className="list-group-item-info"> currently you have not participated in any activities.<br />
                                <div><Link to={'/activities/create'}>
                                    <Button>
                                        Create your own activity
                                            </Button>
                                </Link>
                                    &nbsp;&nbsp;&nbsp;
                                            <Link to={'/activities/search'}>
                                        <Button>
                                            Search for activites
                                            </Button>
                                    </Link>  </div>   </ListGroupItem> : null}
                    </Tab>

                </Tabs>


            </Styles>
        );
    }
}

