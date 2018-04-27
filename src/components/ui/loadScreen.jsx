import React from 'react';
import dynamic from 'next/dynamic';

const OverlayLoader = dynamic(
    import('react-loading-indicator-overlay/lib/OverlayLoader'),
    { ssr: false }
);


export default props => ((typeof window === 'undefined') ? null :
    <React.Fragment>
        <div style={{ height: `${props.offsetPercentage || 0}%` }}/>
        <OverlayLoader
            color={props.color || '#7e9cda'}
            loader="GridLoader"
            background={props.background || 'white'}
            active={true}
            opacity={props.opacity || 0}
        />
    </React.Fragment>
);
