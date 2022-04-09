import { React, Component } from 'react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import Router from 'next/router';
import { Button, Form, Input, Message} from 'semantic-ui-react';


class RequestForm extends Component {
    state = {
        loading: false,
        errorMessage: '',
        description: '',
        value: 0,
        recipient: ''
    }

    onSubmit = async (evt) => {
        evt.preventDefault();
        this.setState({loading: true});
        try {
            const accounts = await web3.eth.getAccounts();
            // thanks to metamas we dont need to assign the amount of gas
            // it does it automatically
            const campaign = Campaign(this.props.address);
            const { description, value, recipient } = this.state
            await campaign.methods.createRequest(
                description,
                web3.utils.toWei(value, 'ether'),
                recipient,
            ).send({
                    from: accounts[0]
                });
            Router.push({
                pathname: `/campaigns/${this.props.address}/requests`
            });
        } catch(err) {
            this.setState({errorMessage: err.message});
        }
        this.setState({loading: false});
    }
    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label> Description: </label>
                    <Input 
                        value={this.state.description}
                        onChange={evt => this.setState({description: evt.target.value})}
                    />
                </Form.Field>
                <Form.Field>
                    <label> Amount in ether: </label>
                    <Input
                        label="ether"
                        labelPosition="right" 
                        value={this.state.amount}
                        onChange={evt => this.setState({value: evt.target.value})}
                    />
                </Form.Field>
                <Form.Field>
                    <label> Recipient: </label>
                    <Input 
                        label="(erc-20) address"
                        labelPosition='right'
                        value={this.state.recipient}
                        onChange={evt => this.setState({recipient: evt.target.value})}
                    />
                </Form.Field>
                <Message error header='Oops' content={this.state.errorMessage} />
                <Button loading={this.state.loading} primary>
                    Create!
                </Button>
            </Form>
        )
    }
}

export default RequestForm;