import { React, Component } from 'react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import Router from 'next/router';
import { Button, Form, Input, Message} from 'semantic-ui-react';


class ContributeForm extends Component {
    state = {
        loading: false,
        errorMessage: '',
        value: '',
    }

    onSubmit = async (evt) => {
        evt.preventDefault();
        this.setState({loading: true});
        try {
            const accounts = await web3.eth.getAccounts();
            // thanks to metamas we dont need to assign the amount of gas
            // it does it automatically
            const campaign = Campaign(this.props.address);
            await campaign.methods.contribute().send({
                    value: web3.utils.toWei(this.state.value, 'ether'),
                    from: accounts[0]
                });
            Router.replace({
                pathname: `/campaigns/${this.props.address}`
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
                    <label> Amount to contribute: </label>
                    <Input 
                        label="ether" value={this.state.value}
                        onChange={evt => this.setState({value: evt.target.value})}
                        labelPosition='right'/>
                </Form.Field>
                <Message error header='Oops' content={this.state.errorMessage} />
                <Button loading={this.state.loading} primary>
                    Contribute!
                </Button>
            </Form>
        )
    }
}

export default ContributeForm;