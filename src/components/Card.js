
import React from 'react';
import Button from './Button';
import PropTypes from 'prop-types';
import CONSTANS from '../constants/constants.js';

const Card = ({ item, onDismiss }) => {

    const transformDate = (date) => {
        const newDate = new Date(date);
        const day = newDate.getDate();
        const month = newDate.getMonth()
        const year = newDate.getFullYear();
        const dateFormatted = day + "-" + (month + 1) + "-" + year;
        return dateFormatted;
    }

    const toLink = (url) => {
        window.location.href = url;
    }
    
    return (
        <div className="col-md-2">
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{item.author}</h6>
                    <div className="d-flex">
                        <span className="card-text mb-2"><b>Autor:  </b></span>
                        <span className="card-text mb-2">{item.author}</span>
                    </div>
                    <div className="d-flex">
                        <span className="card-text mb-2"><b>Fecha:  </b></span>
                        <span className="card-text mb-2">{transformDate(item.created_at)}</span>
                    </div>
                    <div className="d-flex flex-wrap justify-content-between">
                        {item._tags.map(tag => <span key={tag} className="badge badge-secondary m-1">{tag}</span>)}
                    </div>
                    <div className="d-flex">
                        <span className="card-text mb-2"><b>Número de comentarios:  </b></span>
                        <span className="card-text mb-2">{item.num_comments}</span>
                    </div>
                    <div className="d-flex">
                        <span className="card-text mb-2"><b>Puntos:  </b></span>
                        <span className="card-text mb-2">{item.points}</span>
                    </div>
                </div>
                <div className="d-flex justify-content-between p-3">
                    <Button
                        onClick={() => onDismiss(item.objectID)}
                        className={CONSTANS.CLASSNAME_OUTLINE_PRIMARY}
                    >
                        Eliminar
                    </Button>
                    <Button
                        className={CONSTANS.CLASSNAME_PRIMARY}
                        onClick={() => toLink(item.url)}
                    >
                        Ir al artículo
                    </Button>
                </div>
            </div>
        </div>

    )
}


Card.propTypes = {
    item: PropTypes.shape({
        objectID: PropTypes.string.isRequired,
        author: PropTypes.string,
        url: PropTypes.string,
        created_at: PropTypes.string,
        tags: PropTypes.array,
    }).isRequired,
    onDismiss: PropTypes.func,
    toLink: PropTypes.func,
};

export default Card;
