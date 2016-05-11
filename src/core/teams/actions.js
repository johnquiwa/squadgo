import {
  CREATE_TEAM_ERROR,
  CREATE_TEAM_SUCCESS,
  DELETE_TEAM_ERROR,
  DELETE_TEAM_SUCCESS,
  UPDATE_TEAM_ERROR,
  UPDATE_TEAM_SUCCESS
} from './action-types';

export function createTeam(teamName) {
	return (dispatch, getState) => {
		const { auth, firebase } = getState();

		firebase.child(`teams/`)
			.push({teamName}, error => {
				if (error) {
					console.error('ERROR @ createTeam :', error);
					dispatch({
						type: CREATE_TEAM_ERROR,
						payload: error
					});
				}
			});
			
		firebase.child(`users/${auth.id}/teams`)
			.push({teamName}, error => {
				if (error) {
					console.error('ERROR @ createTeam :', error);
					dispatch({
						type: CREATE_TEAM_ERROR,
						payload: error
					});
				}
			});

	};
}

export function deleteTeam(teamName) {
	return (dispatch, getState) => {
		const { auth, firebase } = getState();

		firebase.child(`teams/${teamName.key}`)
			.remove({teamName}, error => {
				if (error) {
					console.error('ERROR @ deleteTeam :', error);
					dispatch({
						type: CREATE_TEAM_ERROR,
						payload: error
					});
				}
			});
	};
}

export function updateTeam(teamName, changes) {
  return (dispatch, getState) => {
    const { auth, firebase } = getState();

    firebase.child(`teams/${teamName.key}`)
      .update(changes, error => {
        if (error) {
          console.error('ERROR @ updateTask :', error); // eslint-disable-line no-console
          dispatch({
            type: UPDATE_TASK_ERROR,
            payload: error
          });
        }
      });
  };
}

export function registerListeners() {
	return (dispatch, getState) => {
		const { auth, firebase } = getState();
		const ref = firebase.child(`users/${auth.id}/teams`);

		ref.on('child_added', snapshot => dispatch({
      type: CREATE_TEAM_SUCCESS,
      payload: recordFromSnapshot(snapshot)
    }));

    ref.on('child_changed', snapshot => dispatch({
      type: UPDATE_TEAM_SUCCESS,
      payload: recordFromSnapshot(snapshot)
    }));

    ref.on('child_removed', snapshot => dispatch({
      type: DELETE_TEAM_SUCCESS,
      payload: recordFromSnapshot(snapshot)
    }));

	}
}

function recordFromSnapshot(snapshot) {
  let record = snapshot.val();
  record.key = snapshot.key();
  return record;
}
