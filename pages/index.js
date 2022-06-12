import Layout from '../components/Layout';
import CampaignItem from '../components/Campaign';

import { React, Component } from 'react';
import factory from '../ethereum/factory';
import { Item, Button, Segment, Grid, Divider, Header } from 'semantic-ui-react';
import Link from 'next/link';
import { faker } from '@faker-js/faker';

import 'semantic-ui-css/semantic.min.css'




class CampaignIndex extends Component {

    state = {
        count: 0
    }
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
                const name = faker.company.bs()
                const image = faker.image.abstract()
                return <CampaignItem name={name} image={image} address={address}></CampaignItem>
            }
        );
        return items
    }

    render () {
        
        return (
            <Layout>
                <Segment>
                    <Grid columns={2} relaxed='very'>
                        <Grid.Column>
                            <Header as="h3">Open Campaigns: {this.props.campaigns.length}</Header>
                            <Item.Group>
                                {this.renderCampaigns()}
                            </Item.Group>
                        </Grid.Column>
                        <Grid.Column textAlign="center" verticalAlign="middle">
                            
                            <Link href='/campaigns/new'>                  
                                <Button
                                    size='huge'
                                    content='Create Campaing'
                                    icon="add circle"
                                    positive
                                />
                            </Link>
                        </Grid.Column>
                    </Grid>
                    <Divider vertical>Or</Divider>
                </Segment>
            </Layout>
        );
    }
}

export default CampaignIndex;