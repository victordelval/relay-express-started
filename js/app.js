import React from 'react';
import ReactDOM from 'react-dom';

import Quote from './quote';

class QuotesList extends React.Component {

    state = { allQuotes: [] };

    componentDidMount() {
        // Load the quotes list into this.state.allQuotes
        fetch(
            `/graphql?query={
                allQuotes {
                    id,
                    text,
                    author
                }
            }`)
        .then(response => response.json())
        .then(json => this.setState(json.data))
        .catch(ex => console.error(ex))
    }

    render() {
        return (
            <div className="quotes-list">
                {this.state.allQuotes.map(quote =>
                    <Quote key={quote.id} quote={quote} />
                )}
            </div>
        )
    }
}

ReactDOM.render(
    <QuotesList />,
    document.getElementById('react')
);