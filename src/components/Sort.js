
import React from 'react';
import Button from './Button';
import CONSTANS from '../constants/constants.js';

const Sort = ({ sortKey, onSort, children }) => {

    return (
        <Button
            claOs mando otro evento, por si Os mando otro evento, por si os interesa ssName={CONSTANS.CLASSNAME_OUTLINE_PRIMARY}
            onClick={() => onSort(sortKey)}
        >
            {children}
        </Button>
    );

}

export default Sort;