"use strict";

import React from 'react';
import { Link } from 'react-router-dom'
import { FaFlag, FaUserSlash, FaUserShield, FaCrown, FaShieldAlt } from "react-icons/fa";
import { Button, ButtonGroup, Card , Row, Col, Form, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap';
import ActivityService from '../services/ActivityService'
import ReportService from '../services/ReportService'
import AdminService from '../services/AdminService'
import { ReportUserModal } from './ReportUserModal';

import { ServerError } from './ServerError';
import { AlertMessage } from './AlertMessage';
import { SuccessMessage } from './SuccessMessage';


const style = { maxWidth: 500 };

export class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
			reports: [],
            showModal: false,
            likes: '',
            dislikes: ''
        }
        
        this.id = this.props.id
		this.banUser = this.banUser.bind(this);
		this.getReportListById = this.getReportListById.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.getVotes = this.getVotes.bind(this);
        this.makeModerator = this.makeModerator.bind(this);
        this.revokeModerator = this.revokeModerator.bind(this);
		
		if(this.props.role === 'moderator'){
			this.getReportListById(this.id)
        }
        this.getVotes(this.id)
		
    }
    
    async banUser(id, time){
		try{
			let reports = await ReportService.banUser(id,time)
		}
		catch(err){
            console.error(err);
            this.setState({
                error: err
            });
		}
    }
    
    async getVotes(id){
		try{
            let votes = await ActivityService.getVotes(id)
            this.setState({
                likes: votes.upVotes
            });
            this.setState({
                dislikes: votes.downVotes
            });

		}
		catch(err){
            console.error(err);
            this.setState({
                error: err
            });
        }
	}
	
	async getReportListById(id){
		try{
			let reports = await ReportService.getReportList('users',id,null,null)
			this.setState({reports: reports.reports})
		}
		catch(err){
            console.error(err);
            this.setState({
                error: err
            });
		}
	}
	
	toggleModal(show,id,username,idx) {
		if(show){
			this.getReportListById(this.id, username)
			this.setState({showModal: true})
		}
		else this.setState({reports: [], showModal: false})
	}
	
	async makeModerator(){
		try{
			let ret = await AdminService.makeModerator(this.props.id)
			console.log(ret)
			//this.setState({success: 'The user is now a moderator'})
			this.props.updateUser(this.props.id)
		}
		catch(err){
            console.error(err);
            this.setState({
                error: err
            });
		}
	}
	
	async revokeModerator(){
		try{
			let ret = await AdminService.revokeModerator(this.props.id)
			console.log(ret)
			//this.setState({success: 'The user is no longer a moderator'})
			this.props.updateUser(this.props.id)
		}
		catch(err){
            console.error(err);
            this.setState({
                error: err
            });
		}
	}


    render() {
		let user = this.props.user
		if(!user) {
			return <ServerError />
		}
		let { username, name, surname, age, gender, bio, profilePicture, role } = user
		let wholeName = `${name} ${surname}`
		
		console.log(role)
		
        return (
			<Card style={{border: 'none', height: '100%'}}>
				<Card.Header className="display-3">
					<div class="row">
						<div class="col-sm-" style={{"margin-left": "15px"}}>
							{username}
						</div>
						<div class="col-sm-3">
							{role === 'moderator'?<OverlayTrigger placement='top' overlay={<Tooltip>This user is a moderator</Tooltip>}>
													<FaUserShield color={'#37cf23'} size={40}/>
												</OverlayTrigger>:null}
							{role === 'admin'?<OverlayTrigger placement='top' overlay={<Tooltip>This user is an admin</Tooltip>}>
													<FaCrown color={'#37cf23'} size={40}/>
												</OverlayTrigger>:null}
							{!this.props.editable && role !== 'admin'?<OverlayTrigger placement='top' overlay={<Tooltip>Report this user</Tooltip>}>
													<Button style={{color: 'grey'}} variant="link">
														<Link to={`/report/user/${this.props.id}`} style={{color: 'grey'}} className="md-cell">
															<FaFlag size={30}/>
														</Link>
													</Button>
												</OverlayTrigger>:null}
							{!this.props.editable && this.props.role === 'moderator'?
													<OverlayTrigger placement='top' overlay={<Tooltip>See the reports of this user</Tooltip>}>
														<Button style={{color: 'grey'}} variant="link" onClick={() => {this.toggleModal(true)}}>
															<FaUserSlash size={40}/>
														</Button>
													</OverlayTrigger>:null}
							{!this.props.editable && this.props.role === 'admin' && role === 'user'?
													<OverlayTrigger placement='top' overlay={<Tooltip>Promote to moderator</Tooltip>}>
														<Button variant="link" onClick={() => {this.makeModerator(true)}}>
															<FaShieldAlt color={"green"} size={40}/>
														</Button>
													</OverlayTrigger>:null}
							{!this.props.editable && this.props.role === 'admin' && role === 'moderator'?
													<OverlayTrigger placement='top' overlay={<Tooltip>Demote to user</Tooltip>}>
														<Button variant="link" onClick={() => {this.revokeModerator(true)}}>
															<FaShieldAlt color={"#85241d"} size={40}/>
														</Button>
													</OverlayTrigger>:null}
						</div>
					</div>
				</Card.Header>
				<Card.Body>
					<div class="row">
						<div class="col-sm-3">
							<div class="row">
								<div class="col-sm-12 d-flex align-items-center">
									<img src={profilePicture} style={{"margin": "10px", height: '300px',width: '400px',}}/>
								</div>
							</div>
							<div class="row">
								<div class="col-sm-12 d-flex align-items-center">
									<p> You have got {this.state.likes} 👍 and {this.state.dislikes} 👎 from other people.  </p>
								</div>
							</div>
						</div>
						<div class="col-sm-7" style={{minHeight: '500px'}}>
							<Form.Group as={Row} >
								<Form.Label column sm="2">
									Name:
								</Form.Label>
								<Col sm="10">
								  <Form.Control plaintext readOnly defaultValue={wholeName} />
								</Col>
							</Form.Group>
							
							<Form.Group as={Row} >
								<Form.Label column sm="2">
									Age:
								</Form.Label>
								<Col sm="10">
								  <Form.Control plaintext readOnly defaultValue={age} />
								</Col>
							</Form.Group>
							
							{gender !== 'notDeclared'? <Form.Group as={Row} >
														<Form.Label column sm="2">
															Gender:
														</Form.Label>
														<Col sm="10">
														  <Form.Control plaintext readOnly defaultValue={gender} />
														</Col>
													</Form.Group>:''}
							
							<Form.Group as={Row}>
								<Form.Label column sm="2">
									About me:
								</Form.Label>
								<Col sm="10">
								  <Form.Control as="textarea" style={{resize: 'none'}} plaintext readOnly defaultValue={bio} />
								</Col>
							</Form.Group>
							
							{this.props.editable?<Form.Group as={Row}>
									<ButtonGroup className="mr-2">
										<Link to={'/editProfile'}>
											<Button >
												Edit yout profile
											</Button>
										</Link>
									</ButtonGroup>
								</Form.Group>:null}

						</div>
					</div>
					<AlertMessage>{this.state.error ? `${this.state.error}` : ''}</AlertMessage>
					<SuccessMessage>{this.state.error ? `${this.state.success}` : ''}</SuccessMessage>
				</Card.Body>
				<Card.Footer>
					<small className="text-muted">Friend2U loves U</small>
				</Card.Footer>
				{this.props.role === 'moderator'?<ReportUserModal
									banUser={this.banUser}
									modalReported={{id: this.id, name: username}}
									show={this.state.showModal}
									toggleModal={this.toggleModal}
									reports={this.state.reports}
									userProfile={true}
								/>:null}
			</Card>
        );
    }
}
