import { React, Component } from 'react'
import Layout from '../../../components/Layout';
import ContributeForm from '../../../components/ContributeForm';
import Campaign from '../../../ethereum/campaign';
import { Card, Grid, Button } from 'semantic-ui-react';
import web3 from '../../../ethereum/web3';
import 'semantic-ui-css/semantic.min.css'
import Link from 'next/link';


class CampaignShow extends Component {

    state = {
        loading: false,
        minimumContribution: 0,
        balance: 0,
        amountOfRequests: 0,
        approversCount: 0,
        manager: '',
        errorMessage: '',
    }
    

    static async getInitialProps(props) {
        // the slug getting captured from the URL
        const campaign = Campaign(props.query.slug);
        const summary = await campaign.methods.getSummary().call();
        return {
            address: props.query.slug,
            summary: {
                minimumContributionWei: {
                    value: summary['0'],
                    meta: 'Minimum Contribution (Wei)',
                    description: 'Smallest amount to contribute in weit to be part of the Campaign'
                },
                balance: {
                    value: web3.utils.fromWei(summary['1'], 'ether'),
                    meta: 'Campaign Balance (ETH)',
                    description: 'Current balance of the campaign.'
                }, 
                requestsCount: {
                    value: summary['2'],
                    meta: 'Number of requests',
                    description: 'A request represents the attempt to withdraw money from the campaign.'
                },
                approversCount:{
                    value: summary['3'],
                    meta: 'Number of contributors to the campaign',
                    description: 'Contributors that get to approve withdrawal requests from the campaign.'
                },
                manager: {
                    value: summary['4'],
                    meta: 'ERC-20 Manager Address',
                    description: 'Ethereum address from the campaign creator.'
                }
            }
        }
    }

    renderCampaignSummary() {
        // retrieve of the elements from props as we do not have an especific object
        const items = Object.keys(this.props.summary).map(
            key => {
                return {
                    header: this.props.summary[key].value,
                    description: this.props.summary[key].description,
                    meta: this.props.summary[key].meta,
                    fluid: true,
                    style: {overflowWrap: 'break-word'}
                }
            }
        );

        return <Card.Group items={items} />
    }


    render() {
        return (
            <Layout>
                <h3> Campaign Details </h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCampaignSummary()}
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link href={`/campaigns/${this.props.address}/requests`}>
                                <Button primary>View Requests</Button>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        )
    }
}

export default CampaignShow;