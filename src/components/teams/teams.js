import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TeamsList from './teams-list';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

// Modules
import { teamsActions } from 'core/teams';

// Components

export class Teams extends Component {

	componentWillMount() {
		this.props.registerListeners();
	}

	componentWillUnmount() {
		this.props.clearState();
	}

	handleSubmit() {
		let teamName = this.refs.teamName.getValue();
		this.props.createTeam(teamName);
	}

	render() {
		const {
			createTeam,
			teams
		} = this.props;

		return (
			<div className="g-row">
        <div className="g-col">
        	<TextField ref="teamName"></TextField><RaisedButton label="Create Team" onMouseDown={this.handleSubmit.bind(this)} />
        	<TeamsList teams={teams} {...this.props}/>
        </div>
      </div>
		);
	}
}

export default connect(state => ({
	teams: state.teams.list
}), teamsActions)(Teams);
