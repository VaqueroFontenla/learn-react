
import React from 'react';
import CONSTANS from '../constants/constants.js';
import PropTypes from 'prop-types';

const  Search = ({onSubmit, currentFilterValue, onChangeFilter, children}) => {
   
    return (
        <form onSubmit={() => onSubmit()}>
            <div className="input-group input-group-lg mb-3">
                <input type="text"
                    className="form-control"
                    aria-label="Search by title"
                    value={currentFilterValue}
                    onChange={onChangeFilter}
                />
                <div className="input-group-append">
                    <button className={CONSTANS.CLASSNAME_OUTLINE_PRIMARY} type="button" selected id="button-addon2" onClick={() => onSubmit()}>{children}</button>
                </div>
            </div>
        </form>

    );
    
}


Search.propTypes = {
    currentFilterValue: PropTypes.string,
    children: PropTypes.node.isRequired,
    onSubmit: PropTypes.func
};


export default Search;
