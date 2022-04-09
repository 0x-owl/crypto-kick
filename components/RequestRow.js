import { React, Component } from 'react';
import { Button, Table} from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import Router from 'next/router';
import web3 from '../ethereum/web3';


class RequestRow extends Component {
    state = {
        loading: false,
        errorMessage: ''
    }
    onApprove = async () => {
        this.setState({loading: true});
        try {
            const campaign = Campaign(this.props.slug);
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.approveRequest(this.props.id).send(
                {from: accounts[0]}
            );
            Router.replace({
                pathname: `/campaigns/${this.props.address}/requests`
            });
        } catch(err) {
            this.setState({errorMessage: err.message});
        }
        this.setState({loading: false});
    }
    
    onFinalize = async () => {
        this.setState({loading: true});
        try {
            const campaign = Campaign(this.props.slug);
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.finalizeRequest(this.props.id).send(
                {from: accounts[0]}
            );
            Router.replace({
                pathname: `/campaigns/${this.props.address}/requests`
            });
        } catch(err) {
            this.setState({errorMessage: err.message});
        }
        this.setState({loading: false});
    }

    render() {
        const { Row, Cell } = Table;
        const { description, value, recipient, approvalCount, complete} = this.props.request;
        const readyToFinalize = approvalCount  > this.props.approversCount / 2;
        return (
            <Row disabled={complete} positive={readyToFinalize && !complete}>
                <Cell>{this.props.id}</Cell>
                <Cell>{description}</Cell>
                <Cell>{web3.utils.fromWei(value, 'ether')}</Cell>
                <Cell>{recipient}</Cell>
                <Cell>{approvalCount}/{this.props.approversCount} </Cell>
                <Cell>
                    {
                    complete ? null: (
                        <Button color='green' loading={this.state.loading} basic onClick={this.onApprove}> Approve</Button>
                    )
                    }
                </Cell>
                <Cell>
                    { complete ? null: (
                        <Button color='red' basic loading={this.state.loading} onClick={this.onFinalize}>Finalize</Button>
                    )    
                    }
                </Cell>
            </Row>
            
        );
    }
}

export default RequestRow;