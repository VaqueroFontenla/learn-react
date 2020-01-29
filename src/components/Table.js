
import React, { Component } from 'react';
import { sortBy } from 'lodash';

//Components
import Card from './Card';
import Sort from './Sort';

import PropTypes from 'prop-types';



const SORTS = {
    NONE: list => list,
    TITLE: list => sortBy(list, 'title'),
    AUTHOR: list => sortBy(list, 'author'),
    COMMENTS: list => sortBy(list, 'num_comments').reverse(),
    POINTS: list => sortBy(list, 'points').reverse(),
};

class Table extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sortKey: 'NONE',
            isSortReverse: false,
        };

        this.onSort = this.onSort.bind(this);
    }

    onSort(sortKey) {
        const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
        this.setState({ sortKey, isSortReverse });
    }


    render() {

        const {
            sortKey,
            isSortReverse,
        } = this.state


        const {
            list,
            toLink,
            onDismiss
        } = this.props

        const sortedList = SORTS[sortKey](list);
        const reverseSortedList = isSortReverse
            ? sortedList.reverse()
            : sortedList;

        return (
            <div className="table">
                <div className="table-header">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Ordenar por
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <span className="dropdown-item">
                                <Sort
                                    sortKey={'TITLE'}
                                    onSort={this.onSort}
                                    activeSortKey={sortKey}
                                >
                                    Título
                                </Sort>
                            </span>
                            <span className="dropdown-item">
                                <Sort
                                    sortKey={'AUTHOR'}
                                    onSort={this.onSort}
                                    activeSortKey={sortKey}
                                >
                                    Autor
                                </Sort>
                            </span>
                            <span className="dropdown-item">
                                <Sort
                                    sortKey={'COMMENTS'}
                                    onSort={this.onSort}
                                    activeSortKey={sortKey}
                                >
                                    Comentarios
                                </Sort>
                            </span>
                            <span className="dropdown-item">
                                <Sort
                                    sortKey={'POINTS'}
                                    onSort={this.onSort}
                                    activeSortKey={sortKey}
                                >
                                    Puntos
                                </Sort>
                            </span>

                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        {reverseSortedList.map(item =>
                            <Card
                                toLink={toLink}
                                onDismiss={onDismiss}
                                item={item} />
                        )}
                    </div>
                </div>
            </div>

        );
    }
}



Table.propTypes = {
    list: PropTypes.array.isRequired,
};

export default Table;
