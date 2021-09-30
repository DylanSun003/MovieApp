import React, { Component } from 'react';
import {getMovies, deleteMovie} from "../services/fakeMovieService";
import MovieSingle from './movieSingle';


class Movie extends Component {
    state = {
        movies: getMovies(),
        // listLength: getMovies().length,
    };
    
    render() { 
        // const {listLength} = this.state;
        // if (listLength === 0)
        //     return  <p>There is no movie in the list</p>;

        return (
            <React.Fragment className="container"> 
                {/* <p>Showing <span>{listLength}</span> movies in the database</p> */}
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.movies.map(movie => ( 
                            <MovieSingle key={movie.id}
                                         movie = {movie}
                                         onDelete={() => this.handleDelete(movie)}
                            />
                        ))}
                    </tbody>
                </table>
            </React.Fragment>
        )
    }

    handleDelete = movie => {
        const movieToDelete = deleteMovie(movie._id);
        const newMovieList = this.state.movies.filter(m => m._id !== movieToDelete._id);
        this.setState({movies: newMovieList});
        this.state.listLength--;
    }
      
}
 
export default Movie;