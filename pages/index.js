import { React, Component } from 'react';
import factory from '../ethereum/factory';


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

    render () {
        return <div> {this.props.campaigns[0]} Campaings Index</div>
    }
}

export default CampaignIndex;