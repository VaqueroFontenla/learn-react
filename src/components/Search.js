
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../stylesheets/Search.css';

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
            <form onSubmit={onSubmit}>>
                 {children}
                <input
                    type="text"
                    value={currentFilterValue}
                    onChange={onChangeFilter}
                    ref={el => this.input = el}
                />
                <button type="submit">
                    {children}
                </button>
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
