import React, { Component } from 'react';
import { Carousel, Jumbotron, Container, Button, Table, OverlayTrigger, Tooltip, Media } from 'react-bootstrap';
import './styles.css';
import api from '../../services/api';

class Consult extends Component {


    constructor(props) {
        super(props);
        this.state = {
            apikey: '58b1af4c9bd7ad3a77f5fd8d9c97dcaa',
            date: new Date().toLocaleString(),
            type: 'movie',
            movie: {},
            serie: {},
            cast: {},
            review: {},
        };

        console.log('listar', this.state);
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        const { type } = this.props.match.params;

        this.getEntertainment(this.state.apikey, id, type);
    }

    getEntertainment = async (apikey, id, type) => {
        if (type === 'movie') {
            const responseDetails = await api.get(`/movie/${id}?api_key=${apikey}`);
            this.setState({ movie: responseDetails.data });

            const responseCredits = await api.get(`/movie/${id}/credits?api_key=${apikey}`);
            this.setState({ cast: responseCredits.data.cast });

            const responseReviews = await api.get(`/movie/${id}/reviews?api_key=${apikey}`);
            this.setState({ review: responseReviews.data.results });
        } else {
            const responseDetails = await api.get(`/tv/${id}?api_key=${apikey}`);
            this.setState({ movie: responseDetails.data });

            const responseCredits = await api.get(`/tv/${id}/credits?api_key=${apikey}`);
            this.setState({ cast: responseCredits.data.cast });

            const responseReviews = await api.get(`/tv/${id}/reviews?api_key=${apikey}`);
            this.setState({ review: responseReviews.data.results });
        }

        //console.log('getList()', responseReviews.data.results);
    }

    
    renderLisCast() {
        const { cast } = this.state;
        return (
            <Table striped bordered hover className="listBasic">
                <thead>
                    <tr>
                        <th>Photo</th>
                        <th>Character</th>
                        <th>Actor</th>
                    </tr>
                </thead>
                <tbody>
                    {cast.length > 0 ? (
                        cast.map((item, key) => (
                        <tr key={key}>
                            <td><img
                            width={45}
                            height={68}
                            className="ml-3"
                            src={item.profile_path ? "http://image.tmdb.org/t/p/w45" + item.profile_path : '/noimage.png'}
                            alt={item.name}
                        /></td>
                            <td>{item.character}</td>
                            <td>{item.name}</td>
                        </tr>
                        ))
                    ) : (
                        <tr className="nenhum">
                            <td colSpan={3}>No Cast</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        );
    }

    renderLisReview() {
        const { review } = this.state;
        return (
            <Table bordered className="listBasic">
                <tbody>
                    {review.length > 0 ? (
                        review.map((item, key) => (
                            key <= 2 && (
                        <tr key={key}>
                            <td>
                                <p>{item.content}</p>
                                <p><strong>{item.author}</strong></p>
                            </td>
                        </tr>
                        )))
                    ) : (
                        <tr className="nenhum">
                            <td >No Review at the moment</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        );
    }

    render() {
        const { movie } = this.state;
        return (
            <Container>
                <Carousel controls="false">
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={movie.backdrop_path ? "http://image.tmdb.org/t/p/w780" + movie.backdrop_path : '/noimage.png'}
                            alt={movie.tagline}
                        />
                        <Carousel.Caption>
                            <h3>{movie.title}</h3>
                            <p>{movie.tagline}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>

                <Jumbotron>
                    <Media>
                        <Media.Body>
                            <h5>{movie.title}</h5>
                            <br />
                            <p><strong>Description:</strong> <br />{movie.overview}</p>
                            <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
                            <p><strong>Rating:</strong> {movie.vote_average}</p>

                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip> Click to add to favorites</Tooltip>}
                            >
                                <Button variant="warning" size="sm" onClick={() => this.props.addFavMovie(movie)} block>+ Add to Favorites</Button>
                            </OverlayTrigger>
                        </Media.Body>
                        <img
                            width={185}
                            height={278}
                            className="ml-3"
                            src={movie.poster_path ? "http://image.tmdb.org/t/p/w185" + movie.poster_path : '/noimage.png'}
                            alt={movie.tagline}
                        />
                    </Media>

                    {this.renderLisCast()}

                    {this.renderLisReview()}
                </Jumbotron>
            </Container>
        )
    }
    /*
        o Image or trailer as a banne
    o Name movie or series;
    o Full Description;
    o Time;
    o Rating;
    o Cast(picture and name);
    o Trailers;
    o Top three reviews;
    o Add or Remove favorite
    */

}

export default Consult;