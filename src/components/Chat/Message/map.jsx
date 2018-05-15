import { Map, Marker } from 'yandex-map-react';

export default (map, width, height, zoom) =>
    (
        <Map
            width={width}
            height={height} 
            className="messageBlock__map"
            center={map.center}
            zoom={zoom}>
            <Marker
                lat={map.lat}
                lon={map.lon}
            />
        </Map>
    )
