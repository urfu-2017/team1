export default ({ ogdata }) => (
    <div className="metadata">
        <a href={ogdata.url} className="metadata-container">
            {ogdata.image && <img className="metadata-container__img"
                                  src={ogdata.image.url} alt={ogdata.title}/>}
            <div className="metadata-container__title">{ogdata.title}</div>
        </a>
    </div>
);
