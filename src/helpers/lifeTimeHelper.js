import Timer from 'material-ui/svg-icons/image/timer';
import Select from 'react-select';

export const getTimerOrLifeTime = lifeTime => {
    return (!lifeTime.seconds) ?
    (<Timer className="icon" />) : (lifeTime.alias)
}

export const getTiming = (selectTiming, handleSelectLifeTime) => {
    return (selectTiming) ?
        <Select
            onBlurResetsInput={false}
            onSelectResetsInput={false}
            autoFocus
            value={'off'}
            onChange={handleSelectLifeTime}
            options={[
                { value: { alias: 'off', seconds: null }, label: 'Off' },
                { value: { alias: '1 s', seconds: 1 }, label: '1 second' },
                { value: { alias: '2 s', seconds: 2 }, label: '2 seconds' },
                { value: { alias: '5 s', seconds: 5 }, label: '5 seconds' },
                { value: { alias: '10 s', seconds: 10 }, label: '10 seconds' },
                { value: { alias: '30 s', seconds: 30 }, label: '30 seconds' },
                { value: { alias: '1 m', seconds: 60 }, label: '1 minute' },
                { value: { alias: '1 h', seconds: 3600 }, label: '1 hour' }   
            ]}
        /> :
        ''
}