
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './Search';
import Table from './Table';
import Button from './Button';
import withLoading from './WithLoading';
import '../stylesheets/App.css';
import CONSTANS from '../constants/constants.js';
import Loading from './Loading';

const App = () => {

	const currentHitsPerPage = CONSTANS.DEFAULT_HPP;
	const [currentPage, setCurrentPage] = useState(CONSTANS.DEFAULT_PAGE);
	const [currentFilterValue, setCurrentFilterValue] = useState(CONSTANS.DEFAULT_QUERY);
	const [data, setData] = useState([]);
	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(null);
	const [searchKey, setSearchKey] = useState('');

	// Pendiente creación de función loadin con condicional
	const makeUrl = (searchValue, page, hitsPerPage) => {
		const url = `${CONSTANS.PATH_BASE}${CONSTANS.PATH_SEARCH}?${CONSTANS.PARAM_SEARCH}${searchValue}&${CONSTANS.PARAM_PAGE}${page}&${CONSTANS.PARAM_HPP}${hitsPerPage}`
		return url;
	}

	useEffect(() => {
		const fechtData = async () => {
			setError(false);
			setIsLoading(true);

			try {
				const result = await axios(makeUrl(currentFilterValue, currentPage, currentHitsPerPage));
				setData(result.data.hits)

			} catch (error) {
				setError(true);
			}

			setIsLoading(false)
		};

		fechtData();
	}, [searchKey, currentPage ]);


	if (isLoading) {

	}

	const onChangeFilter = (e) => {
		setCurrentFilterValue(e.target.value)
	}

	const onSubmit = () => {
		setSearchKey(currentFilterValue)
	}

	const onDismiss = id => {
		const updatedList = data.filter(item => item.objectID !== id);
		setData(updatedList)
	}

	const onSort = sortKey => {
		const updatedSortList = data.sort((a, b) => {
			if (sortKey === "points" || sortKey === "num_comments") {
				return b[sortKey] - a[sortKey]
			} else if (sortKey === "title" || sortKey === "author") {
				const aString = a[sortKey].toLowerCase();
				const bString = b[sortKey].toLowerCase();
				if (aString < bString) {
					return -1
				} else if (aString > bString) {
					return 1
				} else {
					return 0
				}
			}
		});
		setData(updatedSortList);
	}

	return (
		<div className="container-fluid">
			<div className="col-12 d-flex flex-column justify-content-center align-items-center mt-5">
				<div className="row">
					<Search
						currentFilterValue={currentFilterValue}
						onChangeFilter={onChangeFilter}
						onSubmit={onSubmit}
					>
						Search
						</Search>
				</div>
				<div className="row">
					{error &&
						<div className="interactions">
							<p>Something went wrong.</p>
						</div>
					}
					{isLoading && <Loading />}
					{!isLoading && <Table
						onSort={onSort}
						onDismiss={onDismiss}
						list={data} />}

				</div>
				<div className="row">
					<ButtonWithLoading
						className={CONSTANS.CLASSNAME_SECONDARY_LG}
						isLoading={isLoading}
						onClick={() => setCurrentPage(currentPage + 1)}
					>
						More
					</ButtonWithLoading>
				</div>
			</div>
		</div>
	);
}

const ButtonWithLoading = withLoading(Button);

export default App;


