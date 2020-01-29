
import React, { Component } from 'react';
//CONSTANS
import CONSTANS from '../constants/constants.js';

import PropTypes from 'prop-types';

// Componente funcional
// const Search = ({
//     value,
//     onChange,
//     onSubmit,
//     children
//   }) => {
//     let input;

//     return (
//       <form onSubmit={onSubmit}>
//         <input
//           type="text"
//           value={value}
//           onChange={onChange}
//           ref={el => input = el}
//         />
//         <button type="submit">
//           {children}
//         </button>
//       </form>
//     );
//   }

//Componente de clase
class Search extends Component {

    componentDidMount() {
        if (this.input) {
            this.input.focus();
        }
    }

    render() {
        const { currentFilterValue, onChangeFilter, children, onSubmit } = this.props;
        return (
            <form onSubmit={onSubmit}>
                <div className="input-group  input-group-lg mb-3">
                    <input type="text"
                        className="form-control"
                        aria-label="Search by title or author"
                        value={currentFilterValue}
                        onChange={onChangeFilter}
                        ref={el => this.input = el}
                    />
                    <div className="input-group-append">
                        <button className={CONSTANS.CLASSNAME_OUTLINE_PRIMARY} type="button" selected id="button-addon2" onClick={onSubmit}>{children}</button>
                    </div>
                </div>
            </form>

        );
    }
}


Search.propTypes = {
    currentFilterValue: PropTypes.string,
    onChangeFilter: PropTypes.func,
    children: PropTypes.node.isRequired,
    onSubmit: PropTypes.func
};


export default Search;
