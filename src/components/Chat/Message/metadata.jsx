export default ({ metadata }) => (
    <div className="metadataBlock">
        <div className="metadata">
            <a href={metadata.url || metadata.canonical} className="metadata-container">
                <div className="metadata-container-info">
                    {(metadata.site_name || metadata.canonical) &&
                        <div className="info__siteName">
                            {metadata.site_name || String(metadata.canonical).slice(8)}
                        </div>
                    }
                    {metadata.title !== metadata.site_name &&
                        <div className="info__title">{metadata.title}</div>
                    }
                    <div className="info__description">{metadata.description}</div>
                </div>
                {metadata.image && 
                    <img className="metadata-container__img"
                    src={metadata.image.url} alt={metadata.title}/>
                }
            </a>
        </div>
    </div>
);
