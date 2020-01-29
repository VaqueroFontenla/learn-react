const updateSetSearchStories = (hits, page) =>

    prevState => {
        const { searchKey, results } = prevState;
        //[searchKey] Asigna valores dinamicamente al objeto
        const oldHits = results && results[searchKey]
            ? results[searchKey].hits
            : [];

        const updatedHits = [
            ...oldHits,
            ...hits
        ];

        return {
            results: {
                ...results,
                [searchKey]: { hits: updatedHits, page }
            },
            isLoading: false
        };
    };

export default updateSetSearchStories;