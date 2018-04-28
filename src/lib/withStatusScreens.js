import React from 'react';

import LoadScreen from '../components/ui/loadScreen';


export default (errorMessage, { color, background, opacity, offsetPercentage }) => Decorated => {
    class Decorator extends Decorated {
        LoadScreen = <LoadScreen {...{ color, background, opacity, offsetPercentage }} />;
        ErrorScreen = <p>{errorMessage}</p>;
    }

    const wrappedName = Decorated.displayName || Decorated.name || 'Component';
    Decorator.displayName = `StatusScreened(${wrappedName})`;

    const forward = (props, ref) => <Decorator {...props} forwardedRef={ref}/>;
    forward.displayName = Decorator.displayName;
    return React.forwardRef(forward);
};
