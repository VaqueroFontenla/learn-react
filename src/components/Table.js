
import React from 'react';

//Components
import Card from './Card';
import Sort from './Sort';

import PropTypes from 'prop-types';


const Table = ({list, onDismiss, onSort}) => {
        return (
            <div className="table">
                <div className="btn-group mb-3" role="group" aria-label="Sort by">
                    <div >
                        <Sort
                            sortKey={'title'}
                            onSort={onSort}  
                        >
                            Título
                        </Sort>
                    </div>
                    <div >
                        <Sort
                            sortKey={'author'}
                            onSort={onSort}  
                        >
                            Autor
                        </Sort>
                    </div>
                    <div >
                        <Sort
                            sortKey={'num_comments'}
                            onSort={onSort}  
                        >
                            Número de comentarios
                        </Sort>
                    </div>
                    <div >
                        <Sort
                            sortKey={'points'}
                            onSort={onSort}  
                        >
                            Puntos
                        </Sort>
                    </div>
                </div>
                <div className="row">
                    {list.map(item =>
                        <Card
                            onDismiss = {onDismiss}
                            item={item} />
                    )}
                </div>
            </div>
        );
    
}



Table.propTypes = {
    list: PropTypes.array.isRequired,
};

export default Table;
