export default pictures =>
    !pictures.length && null ||
    pictures.map(src => (
        <img
            src={src}
            className="messageBlock__picture"
            alt=""
        />)
    );
