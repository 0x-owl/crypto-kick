import { React, Component } from 'react'
import Layout from '../../../../components/Layout';
import RequestRow from '../../../../components/RequestRow';
import { Button, Table} from 'semantic-ui-react';
import Campaign from '../../../../ethereum/campaign';
import Link from 'next/link';

import 'semantic-ui-css/semantic.min.css'


class RequestIdx extends Component {
    static async getInitialProps(props) {
        
        const { slug } = props.query;
        const campaign = Campaign(slug);
        const requestCount = await campaign.methods.getRequestCount().call();
        // because solidity does not allow to return a list of structs
        // I need to fetch them 1 by 1 using the count and making several
        // requests
        const requests = await Promise.all(
            // Array .fill creates an array from 0 up to the number passed 
            // with map we just explode it and use the idx to make the calls
            Array(parseInt(requestCount)).fill().map(
                (element, idx) => {
                    return campaign.methods.requests(idx).call();
                }
            )
        )
        const approversCount = await campaign.methods.approversCount().call();
        return {slug, requests, requestCount, approversCount};
    }

    renderRows() {
        return this.props.requests.map((req, idx) => {
            return <RequestRow
                key={idx}
                id={idx}
                request={req}
                slug={this.props.slug}
                approversCount={this.props.approversCount}
            />;
        })
    }

    render() {
        const { Header, Row, HeaderCell, Body} = Table

        return (
            <Layout>
                <h3> Pending Requests </h3>
                <Link href={`/campaigns/${this.props.slug}/requests/new`}>
                    <Button primary floated='right' style={{marginBottom: '10px'}}>Add Request</Button>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount (Ether)</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approvals Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRows()}
                    </Body>
                </Table>
                <div>
                    Found: {this.props.requestCount} requests.
                </div>
            </Layout>
        )
    }
}

export default RequestIdx;