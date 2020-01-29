import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Table from '../components/Table';

describe('Table', () => {

    const props = {
        list: [
            { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
            { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z' },
        ],
        sortKey: 'TITLE',
        isSortReverse: false,
    };

    // Jest
    it('renders', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Table {...props} />, div);
    });

    test('snapshots', () => {
        const component = renderer.create(
            <Table {...props} />
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    //Enzyme

    // it('shows two items in list', () => {
    //     const element = shallow(
    //         <Table {...props} />
    //     );

    //     expect(element.find('.table-row').length).toBe(2);
    // });

});