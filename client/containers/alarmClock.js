import { connect } from 'react-redux';
import AlarmClock from '../components/alarmClock';

import { addAlarmClock } from '../actions/actions';

const mapStateToProps = (state, props) => ({
    user: state.currentInfo.currentUser
});

const mapDispatchToProps = dispatch => (
    {
        addAlarmClock: alarmClock => {
            dispatch(addAlarmClock(alarmClock));
        }
    }
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AlarmClock);
