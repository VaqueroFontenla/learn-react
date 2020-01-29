
import React, { Component } from 'react';
import { sortBy } from 'lodash';

//Components
import Card from './Card';
import Sort from './Sort';

import PropTypes from 'prop-types';
import CONSTANS from '../constants/constants';



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
                <div className="btn-group mb-3" role="group" aria-label="Sort by">
                    <div className={CONSTANS.CLASSNAME_PRIMARY}>
                        <Sort
                            sortKey={'TITLE'}
                            onSort={this.onSort}
                            activeSortKey={sortKey}
                        >
                            Título
                        </Sort>
                    </div>
                    <div className={CONSTANS.CLASSNAME_PRIMARY}>
                        <Sort
                            sortKey={'AUTHOR'}
                            onSort={this.onSort}
                            activeSortKey={sortKey}
                        >
                            Autor
                        </Sort>
                    </div>
                    <div className={CONSTANS.CLASSNAME_PRIMARY}>
                        <Sort
                            sortKey={'COMMENTS'}
                            onSort={this.onSort}
                            activeSortKey={sortKey}
                        >
                            Comentarios
                        </Sort>
                    </div>
                    <div className={CONSTANS.CLASSNAME_OUTLINE_PRIMARY}>
                        <Sort
                            sortKey={'POINTS'}
                            onSort={this.onSort}
                            activeSortKey={sortKey}
                        >
                            Puntos
                        </Sort>
                    </div>
                </div>
                <div className="row">
                    {reverseSortedList.map(item =>
                        <Card
                            key={item.objectID}
                            toLink={toLink}
                            onDismiss={onDismiss}
                            item={item} />
                    )}
                </div>
            </div>
        );
    }
}



Table.propTypes = {
    list: PropTypes.array.isRequired,
};

export default Table;
