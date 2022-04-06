import Layout from '../../../components/Layout';

import { React, Component } from 'react';
import factory from '../../../ethereum/factory';
import web3 from '../../../ethereum/web3';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Router from 'next/router';
import 'semantic-ui-css/semantic.min.css'


class CampaignNew extends Component {

    state = {
        minimumContribution: '',
        errorMessage: '',
        loading: false
    }

    onSubmit = async (evt) => {
        evt.preventDefault();
        this.setState({loading: true})
        try {
            const accounts = await web3.eth.getAccounts();
            // thanks to metamas we dont need to assign the amount of gas
            // it does it automatically
            await factory.methods.createCampaign(
                this.state.minimumContribution).send({
                    from: accounts[0]
                });
            Router.push({
                pathname: '/'
            });
        } catch(err) {
            this.setState({errorMessage: err.message});
        }
        this.setState({loading: false});
    };

    render () {
        return (
            <Layout>
                <h3> Create a new campaing </h3>
                {/* without parentesis as we are not calling it at the moment but we pass the reference */}
                {/* so it eventually gets called when the event occurs */}
                {/* the first ! negates the errorMessage which by default is '' that gets translated to False with ! */}
                {/* it wents to True with the second one its negated to False, so its kinda like casting it from a '' to a bool */}
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label> Minimum contribution: </label>
                        <Input 
                            label="wei"
                            labelPosition='right'
                            value={this.state.minimumContribution}
                            onChange={evt => this.setState({ minimumContribution: evt.target.value })}
                        />
                    </Form.Field>
                    <Message error header='Oops' content={this.state.errorMessage} />
                    <Button loading={this.state.loading} primary>Create</Button>
                </Form>
            </Layout>
        )
    };
}

export default CampaignNew;