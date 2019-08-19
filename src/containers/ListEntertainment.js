import React, { Component } from 'react';
import { Button, Table, ButtonToolbar, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap';
import api from '../services/api';

class ListEntertainment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listEntertainment: [],
        };

        console.log('listar', this.props);
    }

    componentDidMount() {
        this.getEntertainment();
        console.log('componentDidUpdate()', this.props);
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.getEntertainment();
        }
        console.log('componentDidUpdate()', this.props);
    }

    getEntertainment = async () => {

        const { filtroNome } = this.props.match.params;

        const response = await api.get(`${(typeof filtroNome != "undefined") ? filtroNome : ''}`);

        this.setState({ listEntertainment: response.data });
        console.log('getFunc()',response.data);

    }
    
    handleClose = () => this.setModalShow(false);
    handleShow = () => this.setModalShow(true);

    setModalShow(condicao) {
        this.setState({
            modal: {
                ...this.state.modal,
                show: condicao
            }
        });
    }

    render() {
        return (
            <>
                {this.state.modal.show &&
                    <Modal show={this.state.modal.show} onHide={this.handleClose} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>{this.state.modal.header}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{this.state.modal.text}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}> Ok! </Button>
                        </Modal.Footer>
                    </Modal>
                }

                <h3>Listar Funcionários</h3>

                <Table striped bordered hover className="listaFunc">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Cargo</th>
                            <th>Ativo</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.listaFuncionarios.length > 0 ? (
                            this.state.listaFuncionarios.map((item, key) => (
                                <tr key={key}>
                                    <td>{item.Id}</td>
                                    <td>{item.Nome} {item.SobreNome}</td>
                                    <td>{item.Cargo}</td>
                                    <td>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Funcionário {item.Ativo ? 'Ativo' : 'Inativo'}</Tooltip>}
                                        >
                                            <FontAwesomeIcon icon={item.Ativo ? 'check-circle' : 'times-circle'} />
                                        </OverlayTrigger>
                                    </td>
                                    <td>
                                        <ButtonToolbar>
                                            <OverlayTrigger
                                                placement="left"
                                                overlay={<Tooltip> Visualizar informações do Funcionário</Tooltip>}
                                            >
                                                <Button variant="info" size="sm" onClick={() => this.vizuFuncionario(item)}><FontAwesomeIcon icon="user-check" /></Button>
                                            </OverlayTrigger>

                                            <OverlayTrigger
                                                placement="left"
                                                overlay={<Tooltip> Editar informações do Funcionário</Tooltip>}
                                            >
                                                <Button variant="warning" size="sm" onClick={() => this.props.editFuncionario(item)}><FontAwesomeIcon icon="user-edit" /></Button>
                                            </OverlayTrigger>

                                            <OverlayTrigger
                                                placement="left"
                                                overlay={<Tooltip> Deletar Funcionário</Tooltip>}
                                            >
                                                <Button variant="danger" size="sm" onClick={() => this.delFuncionario(item)}><FontAwesomeIcon icon="user-times" /></Button>
                                            </OverlayTrigger>
                                        </ButtonToolbar>
                                    </td>
                                </tr>
                            ))
                        ) : (
                                <tr className="nenhum">
                                    <td colSpan={5}>Não há reultados para listar no momento.</td>
                                </tr>
                            )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={5}> Dados consultados BD via API - {this.state.date} </td>
                        </tr>
                    </tfoot>
                </Table>
            </>
        );
    }
}

export default ListEntertainment;