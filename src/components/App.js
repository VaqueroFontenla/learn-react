
import React, { Component } from 'react';

//COMPONENTS
import Search from './Search';
import Table from './Table';
import Button from './Button';
import withLoading from './WithLoading';
//SERVICES
import FetchSearchStories from '../services/fetchSearchStories'
import UpdateSetSearchStories from '../services/updateData.js'
//STYLES
import '../stylesheets/App.css';
//CONSTANS
import CONSTANS from '../constants/constants.js';


class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			results: null,
			err: null,
			searchKey: '',
			currentFilterValue: CONSTANS.DEFAULT_QUERY,
			currentPage: CONSTANS.DEFAULT_PAGE,
			currentHitsPerPage: CONSTANS.DEFAULT_HPP,
			isLoading: false,
		};

		this.onDismiss = this.onDismiss.bind(this);
		this.onChangeFilter = this.onChangeFilter.bind(this);
		this.onSearchSubmit = this.onSearchSubmit.bind(this);
		this.onPagination = this.onPagination.bind(this);
		this.onFetchSearchStories = this.onFetchSearchStories.bind(this);
		this.setSearchStories = this.setSearchStories.bind(this);
	}

	// Llamar a la API
	onFetchSearchStories(currentFilterValue, page, currentHitsPerPage) {
		this.setState({ isLoading: true });
		FetchSearchStories(currentFilterValue, page, currentHitsPerPage)
			.then(result => this.setSearchStories(result))
			.catch(err => this.setState({ error: err }));
	}

	componentDidMount() {
		const { currentFilterValue, currentPage, currentHitsPerPage } = this.state;
		this.onFetchSearchStories(currentFilterValue, currentPage, currentHitsPerPage)
	}

	// No sobreescribir la búsqueda anterior
	setSearchStories(result) {
		const { hits, page } = result;
		this.setState(UpdateSetSearchStories(hits, page));
	}

	onDismiss(id) {
		const { searchKey, results } = this.state;
		const { hits, page } = results[searchKey];
		const updatedHits = hits.filter(item => item.objectID !== id);

		this.setState({
			results: {
				...results,
				[searchKey]: { hits: updatedHits, page }
			}
		});
	}

	toLink(url) {
		window.location.href = url;
	}


	onChangeFilter(event) {
		this.setState({
			currentFilterValue: event.target.value
		})
	}

	onSearchSubmit(event) {
		event.preventDefault();
		const { currentFilterValue, currentPage, currentHitsPerPage } = this.state;
		this.setState({
			currentFilterValue: event.target.value,
			searchKey: currentFilterValue,
		})
		this.onFetchSearchStories(currentFilterValue, currentPage, currentHitsPerPage);
	}

	onPagination(event, page) {
		event.preventDefault();
		const { currentFilterValue, currentPage, currentHitsPerPage } = this.state;
		this.setState({
			currentPage: page + 1
		})
		this.onFetchSearchStories(currentFilterValue, currentPage, currentHitsPerPage)
	}

	render() {
		const {
			results,
			currentFilterValue,
			searchKey,
			isLoading,
			error,
			currentHitsPerPage
		} = this.state;

		const page = (
			results &&
			results[searchKey] &&
			results[searchKey].page
		) || 0;

		const list = (
			results &&
			results[searchKey] &&
			results[searchKey].hits
		) || [];

		return (
			<div className="container-fluid">
				<div className="col-12 d-flex flex-column justify-content-center align-items-center mt-5">
					<div className="row">
						<Search
							value={currentFilterValue}
							onChangeFilter={this.onChangeFilter}
							onSubmit={this.onSearchSubmit}
						>
							Search
						</Search>
					</div>
					<div className="row">
						{error
							? <div className="interactions">
								<p>Something went wrong.</p>
							</div>
							: <Table
								list={list}
								toLink={this.toLink}
								onDismiss={this.onDismiss} />
						}
					</div>
					<div className="row">
						<ButtonWithLoading
							className={CONSTANS.CLASSNAME_SECONDARY_LG}
							isLoading={isLoading}
							onClick={() => this.onFetchSearchStories(searchKey, page + 1, currentHitsPerPage)}
						>
							More
					</ButtonWithLoading>
					</div>
				</div>

			</div>
		);
	}
}

const ButtonWithLoading = withLoading(Button);

export default App;
