import React, { Component } from 'react';
import Like from './common/like';

class MovieSingle extends Component {
    state = {  
        isLike: false,
    };
    render() { 
        const {_id, title, genre,numberInStock, dailyRentalRate } = this.props.movie;
    
        return (   
            <tr key={_id}>
                <td>{title}</td>
                <td>{genre.name}</td>
                <td>{numberInStock}</td>
                <td>{dailyRentalRate}</td>
                <td>
                    <Like onLike={() => this.handleLike()}
                          like = {this.state.isLike}/>
                </td>
                <td>
                    <button onClick={this.props.onDelete} className="btn btn-danger btn-sm">Delete</button>
                </td>
            </tr>
        );
    }


    handleLike = ()=> {
        this.setState({isLike: true});
    }
}
 
export default MovieSingle;
             
            