import React from 'react';
import dynamic from 'next/dynamic';

const OverlayLoader = dynamic(
    import('react-loading-indicator-overlay/lib/OverlayLoader'),
    { ssr: false }
);


export default props => ((typeof window === 'undefined') ? null :
    <React.Fragment>
        <div style={{ position: 'absolute', top: '50%', left:'50%', transform: 'translate(-50%)' }}>
            <OverlayLoader
                color={props.color || '#5682a3'}
                loader="GridLoader"
                background={props.background || 'white'}
                active={true}
                opacity={props.opacity || 0}
            />
        </div>
    </React.Fragment>
);
