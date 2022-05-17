import React, { Component } from 'react';

class Complete extends Component { 
    render() {
        const { onClick, complete } = this.props;
        return (
            <input
                type='checkbox'
                onClick={onClick}
                style={{ cursor: 'pointer' }}
                defaultChecked={complete}
            />
        );
    }
}
 
export default Complete;