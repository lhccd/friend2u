"use strict";

import React from 'react';
import { ChooseCompanion } from '../components/ChooseCompanion';
import UserService from '../services/AuthService';
import ActivityService from '../services/ActivityService';
export class CompanionView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            participants: []

        }
    }

    componentDidMount() {
        this.getParticipants()

    }

    async getParticipants() {
        let id = this.props.match.params.id;
        let activity = await ActivityService.getActivity(id)
        let participants = []
        for (var i = 0; i < activity.participants.length; i++) {

            var participant = await UserService.getUserInfo(activity.participants[i])
            var today = new Date();
            var birthDate = new Date(participant.birthday);
            var age_now = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age_now--;
            }
            participant.age = age_now;
            participants.push(participant)
        }
        this.setState({ participants: participants })
    }

    ChooseCompanion(participantID) {
        let id = this.props.match.params.id;
        ActivityService.chooseCompanion(participantID, id)
    }
    render() {
        return (
            <ChooseCompanion
                participants={this.state.participants}
                onChoose={(participantID) => this.ChooseCompanion(participantID)}
            />
        );
    }
}
