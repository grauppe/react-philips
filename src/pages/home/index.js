import React, { Component } from 'react';
//import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel, Jumbotron, Container, Button, Table, ButtonToolbar, OverlayTrigger, Tooltip, Media, Row, Col, Tabs, Tab } from 'react-bootstrap';
import './styles.css';
import api from '../../services/api';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            apikey: '58b1af4c9bd7ad3a77f5fd8d9c97dcaa',
            listMovies: [],
            listSeries: [],
            date: new Date().toLocaleString(),
            sort: 'popularity.desc',
            mode: 'movies',
        };

        console.log('listar', this.state);
    }

    componentDidMount() {
        this.getEntertainment(this.state.apikey,this.state.sort);
        console.log('componentDidUpdate()', this.props);
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.getEntertainment(this.state.apikey,this.state.sort);
        }
        console.log('componentDidUpdate()', this.state);
    }

    getEntertainment = async (apikey,sort) => {

        const responseMovies = await api.get(`/discover/movie?api_key=${apikey}&sort_by=${sort}`);

        this.setState({ listMovies: responseMovies.data.results });

        const responseSeries = await api.get(`/discover/tv?api_key=${apikey}&sort_by=${sort}&include_null_first_air_dates=false&first_air_date_year=2018`);

        this.setState({ listSeries: responseSeries.data.results });

        console.log('getList()', responseMovies.data.results);

    }

    setMode(condition) {
        this.setState({
            mode: condition
        });
    }
    setSort(condition) {
        this.getEntertainment(this.state.apikey,this.state.sort);

        this.setState({
            sort: condition
        });
        console.log(this.state.sort);
    }

    seeMore(idMovie,type) {
        this.props.history.push(`/consult/${type}/${idMovie}`);
    }

    renderTable() {
        if (this.state.mode === 'movies') {
            return (
                this.state.listMovies.length > 0 ? (
                    this.state.listMovies.map((item, key) => (
                        /*
                        adult: false
                        backdrop_path: "/hpgda6P9GutvdkDX5MUJ92QG9aj.jpg"
                        genre_ids: [28]
                        id: 384018
                        original_language: "en"
                        original_title: "Fast & Furious Presents: Hobbs & Shaw"
                        overview: "A spinoff of The Fate of the Furious, focusing on Johnson's US Diplomatic Security Agent Luke Hobbs forming an unlikely alliance with Statham's Deckard Shaw."
                        popularity: 456.135
                        poster_path: "/keym7MPn1icW1wWfzMnW3HeuzWU.jpg"
                        release_date: "2019-08-02"
                        title: "Fast & Furious Presents: Hobbs & Shaw"
                        video: false
                        vote_average: 6.5
                        vote_count: 568
                        */
                        <tr key={key}>
                            <td>{item.vote_average}</td>
                            <td>{item.title}</td>
                            <td>{item.original_language}</td>
                            <td>{item.release_date}</td>
                            <td>
                                <ButtonToolbar>
                                    <OverlayTrigger
                                        placement="left"
                                        overlay={<Tooltip>See more about this movie</Tooltip>}
                                    >
                                        <Button variant="info" size="sm" onClick={() => this.seeMore(item.id,'movie')}>More</Button>
                                    </OverlayTrigger>

                                    {' '}

                                    <OverlayTrigger
                                        placement="left"
                                        overlay={<Tooltip> Click to add to favorites</Tooltip>}
                                    >
                                        <Button variant="warning" size="sm" onClick={() => this.props.addFavMovie(item)}>Fav</Button>
                                    </OverlayTrigger>
                                </ButtonToolbar>
                            </td>
                        </tr>
                    ))
                ) : (
                        <tr className="nenhum">
                            <td colSpan={5}>There are no movies to list.</td>
                        </tr>
                    )
            )
        } else {
            return (
                this.state.listSeries.length > 0 ? (
                    this.state.listSeries.map((item, key) => (
                        /*
                        backdrop_path: "/jC1KqsFx8ZyqJyQa2Ohi7xgL7XC.jpg"
                        first_air_date: "2014-10-07"
                        genre_ids: (2) [18, 10765]
                        id: 60735
                        name: "The Flash"
                        origin_country: ["US"]
                        original_language: "en"
                        original_name: "The Flash"
                        overview: "After a particle accelerator causes a freak storm, CSI Investigator Barry Allen is struck by lightning and falls into a coma. Months later he awakens with the power of super speed, granting him the ability to move through Central City like an unseen guardian angel. Though initially excited by his newfound powers, Barry is shocked to discover he is not the only "meta-human" who was created in the wake of the accelerator explosion -- and not everyone is using their new powers for good. Barry partners with S.T.A.R. Labs and dedicates his life to protect the innocent. For now, only a few close friends and associates know that Barry is literally the fastest man alive, but it won't be long before the world learns what Barry Allen has become...The Flash."
                        popularity: 261.77
                        poster_path: "/fki3kBlwJzFp8QohL43g9ReV455.jpg"
                        vote_average: 6.6
                        vote_count: 2791
                        */
                        <tr key={key}>
                            <td>{item.vote_average}</td>
                            <td>{item.original_name}</td>
                            <td>{item.original_language}</td>
                            <td>{item.first_air_date}</td>
                            <td>
                                <ButtonToolbar>
                                    <OverlayTrigger
                                        placement="left"
                                        overlay={<Tooltip>See more about this serie</Tooltip>}
                                    >
                                        <Button variant="info" size="sm" onClick={() => this.seeMore(item.id,'serie')}>More</Button>
                                    </OverlayTrigger>

                                    {' '}

                                    <OverlayTrigger
                                        placement="left"
                                        overlay={<Tooltip> Click to add to favorites</Tooltip>}
                                    >
                                        <Button variant="warning" size="sm" onClick={() => this.props.addFavSerie(item)}>Fav</Button>
                                    </OverlayTrigger>
                                </ButtonToolbar>
                            </td>
                        </tr>
                    ))
                ) : (
                        <tr className="nenhum">
                            <td colSpan={5}>There are no series to list.</td>
                        </tr>
                    )

            )
        }
    }

    renderButton() {
        return (
            <>
                <Button variant="dark" onClick={() => { this.state.mode === 'movies' ? this.setMode('series') : this.setMode('movies') }}>
                    Show {this.state.mode === 'movies' ? 'TV Series' : 'Movies'}
                </Button>
                {' '}
                <Button variant="dark" onClick={() => { this.state.sort === 'popularity.desc' ? this.setSort('release_date.asc') : this.setSort('popularity.desc') }}>
                    Show {this.state.sort === 'popularity.desc' ? 'Release Date' : 'Popularity'}
                </Button>
            </>
        )
    }

    renderTab() {
        return (
            <Tabs className="tab_top_list">
                {this.state.listMovies.length > 0 && (
                    <Tab eventKey="movie" title="Top Movie" className="node_tab">
                        <Media>
                            <Media.Body>
                                <br />
                                <h5>{this.state.listMovies[0].original_title}</h5>
                                <br />
                                <p>{this.state.listMovies[0].overview}</p>

                                <Button variant="info">
                                    More...
                                </Button>
                            </Media.Body>
                            <img
                                width={185}
                                height={278}
                                className="ml-3"
                                src={this.state.listMovies[0].poster_path ? "http://image.tmdb.org/t/p/w185" + this.state.listMovies[0].poster_path : '/noimage.png'}
                                alt={this.state.listMovies[0].original_name}
                            />
                        </Media>
                    </Tab>
                )}
                {this.state.listSeries.length > 0 && (
                    <Tab eventKey="serie" title="Top TV Serie" className="node_tab">
                        <Media>
                            <Media.Body>
                                <br />
                                <h5>{this.state.listSeries[0].original_name}</h5>
                                <br />
                                <p>{this.state.listSeries[0].overview}</p>

                                <Button variant="info">
                                    More...
                                </Button>
                            </Media.Body>
                            <img
                                width={185}
                                height={278}
                                className="ml-3"
                                src={this.state.listSeries[0].poster_path ? "http://image.tmdb.org/t/p/w185" + this.state.listSeries[0].poster_path : '/noimage.png'}
                                alt={this.state.listSeries[0].original_name}
                            />
                        </Media>
                    </Tab>
                )}
            </Tabs>
        )
    }

    renderBanner() {
        return (
            <Carousel>
                {this.state.listMovies.length > 0 && (
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={this.state.listMovies[0].backdrop_path ? "http://image.tmdb.org/t/p/w780" + this.state.listMovies[0].backdrop_path : '/noimage.png'}
                            alt={this.state.listMovies[0].overview.substring(0, 130)}
                        />
                        <Carousel.Caption>
                            <h3>{this.state.listMovies[0].title}</h3>
                            <p>{this.state.listMovies[0].overview.substring(0, 130)}...</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                )}
                {this.state.listSeries.length > 0 && (
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={this.state.listSeries[0].backdrop_path ? "http://image.tmdb.org/t/p/w780" + this.state.listSeries[0].backdrop_path : '/noimage.png'}
                            alt={this.state.listSeries[0].overview.substring(0, 130)}
                        />
                        <Carousel.Caption>
                            <h3>{this.state.listSeries[0].original_name}</h3>
                            <p>{this.state.listSeries[0].overview.substring(0, 130)}...</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                )}
            </Carousel>
        )
    }

    renderLisFav() {
        return (
        <>
            <table className="listBasic">
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Nome</td>
                        <td>Cargo</td>
                        <td>Salário</td>
                        <td>Ações</td>
                    </tr>
                </thead>
                <tbody>
                    {this.props.listFavorites.listmovie.length > 0 ? (
                        this.props.listFavorites.listmovie.map((item, key) => (
                        <tr key={key}>
                            <td>{item.id}</td>
                            <td>{item.nome}</td>
                            <td>{item.cargo}</td>
                            <td>R$ {item.salario}</td>
                            <td>
                                <button type="button" onClick={() => this.props.removerNovoFuncionario(item)} > Excluir </button>
                                <button type="button" onClick={() => this.setFuncionarioSelecionado(item)} > Alterar </button>
                            </td>
                        </tr>
                        ))
                    ) : (
                        <tr className="nenhum">
                            <td colSpan={5}>Nenhum cadastro informado</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
        );
    }

    render() {
        return (
            <Container>
                
                {this.renderBanner()}

                <br />

                <Jumbotron>
                    <h2>Welcome to YBMs</h2>
                    <p>This is how to build a website with React, React-Router</p>
                    <Link to="/about">
                        <Button variant="primary">
                            About YBMs
                        </Button>
                    </Link>
                </Jumbotron>

                <Row>
                    <Col sm={8}>
                        <h3>{this.state.mode === 'movies' ? 'Movie' : 'TV series'} List</h3>
                    </Col>
                    <Col sm={4}>
                        {this.renderButton()}
                    </Col>
                </Row>

                <Table striped bordered hover className="listBasic">
                    <thead>
                        <tr>
                            <th>Vote</th>
                            <th>Title</th>
                            <th>Language</th>
                            <th>Release Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTable()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={5}>DB by themoviedb.org API - {this.state.date} </td>
                        </tr>
                    </tfoot>
                </Table>

                {/*this.renderTab()*/}


            </Container>
        );
    }
}
/*
const mapStateToProps = state => ({
    listFavorites: state.listFavorites,
});

const mapDispatchToProps = dispatch => ({
    addFavMovie: (movie) => dispatch({ type: 'ADD_LIST', payload: movie }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
*/
export default Home;