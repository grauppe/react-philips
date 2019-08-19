import React from "react";
import { Form, FormControl, Button } from 'react-bootstrap';
import { withRouter } from "react-router-dom";

class BuscaForm extends React.Component {

    state = {
        inputBusca: ''
    };

    constructor(props) {
        super(props);
        this.handleChangeBusca = this.handleChangeBusca.bind(this);
    }

    handleChangeBusca(event) {
        this.setState({ inputBusca: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.history.push(`/search/list/${this.state.inputBusca}`);
    }

    render() {
        return (
            <Form inline onSubmit={this.handleSubmit}>
                <FormControl onChange={this.handleChangeBusca} type="text" placeholder="Search" className="mr-sm-2" />
                <Button type="submit" variant="outline-success">Search</Button>
            </Form>
        )
    }
}
export default withRouter(BuscaForm);