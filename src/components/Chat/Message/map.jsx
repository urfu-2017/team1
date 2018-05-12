import { Map, Marker } from 'yandex-map-react';

export default map =>
    (
        <Map
            // style={{ width: '100%', height: '200px' }}
            width={'100%'}
            height={'200px'} 
            className="messageBlock__map"
            onAPIAvailable={() => console.info('Map API loaded')}
            center={map.center}
            zoom={map.zoom}>
            <Marker
                lat={map.lat}
                lon={map.lon}
            />
        </Map>
    )
