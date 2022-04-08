import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

// we seed a few using remix associating also our metamask for testing
const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x1942e4214dc7d680827DF9Ca09140d037E0e6a99'
);


export default instance;