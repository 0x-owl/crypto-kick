import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

// we seed a few using remix associating also our metamask for testing
const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xECC705Dcc21dFC0e31b9ADdFDf7423376Ce94Aa6'
);


export default instance;