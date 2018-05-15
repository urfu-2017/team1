import { Map, Marker } from 'yandex-map-react';

export default replyMap =>
    (
        <Map
            width={'50%'}
            height={'100px'} 
            className="messageBlock__map"
            onAPIAvailable={() => console.info('Map API loaded')}
            center={replyMap.center}
            zoom={replyMap.zoom}>
            <Marker
                lat={replyMap.lat}
                lon={replyMap.lon}
            />
        </Map>
    )
