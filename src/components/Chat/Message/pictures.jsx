import React from 'react';


export default pictures =>
    !pictures.length && null ||
    pictures.map(src => (
        <img
            key={src}
            src={src}
            className="messageBlock__picture"
            alt=""
        />)
    );
