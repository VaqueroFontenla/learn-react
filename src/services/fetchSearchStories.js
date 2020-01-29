//CONSTANS
import CONSTANS from '../constants/constants.js';

const url = `${CONSTANS.PATH_BASE}${CONSTANS.PATH_SEARCH}?${CONSTANS.PARAM_SEARCH}`

const fetchSearchStories = (searchValue, page, hitsPerPage) =>

    fetch(`${url}${searchValue}&${CONSTANS.PARAM_PAGE}${page}&${CONSTANS.PARAM_HPP}${hitsPerPage}`)
        .then(response => response.json())
        .then (result => result)
        .catch(err => err)



export default fetchSearchStories;
