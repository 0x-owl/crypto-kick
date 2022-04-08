import Layout from '../components/Layout';

import { React, Component } from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Link from 'next/link';
import 'semantic-ui-css/semantic.min.css'


class CampaignIndex extends Component {

    // method provided by Next, allows to retrieve the
    // initial props without instanciating the class which
    // will call the render and it consumes a lot of of resources
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        // provides the campaigns on instantiation as props to the class
        // using componentDidMount requires a browser and tu make the request upon load
        // this approach takes the server side rendering and preloads this before the
        // component.
        return { campaigns }
    }

    renderCampaigns() {
        const items = this.props.campaigns.map(
            address => {
                return {
                    header: address,
                    description: <Link href={`/campaigns/${address}`}>View Campaign</Link>,
                    fluid: true
                };
            }
        );
        return <Card.Group items={items} />;
    }

    render () {
        return (
            <Layout>
                <div>
                    <h3> Open Campaigns </h3>
                    <Link href='/campaigns/new'>                  
                        <Button
                            content='Create Campaing'
                            icon="add circle"
                            floated='right'
                            primary
                        />
                    </Link>
                    {this.renderCampaigns()}
                </div>
            </Layout>
        );
    }
}

export default CampaignIndex;