import Layout from '../../components/Layout';

import { React, Component } from 'react';
import factory from '../../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'


class CampaignNew extends Component {
    render () {
        return (
            <Layout>
                <h1> New Campaing </h1>
            </Layout>
        );
    };
}

export default CampaignNew;