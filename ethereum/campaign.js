import web3 from './web3';
import Campaign from './build/Campaign.json';

// we seed a few using remix associating also our metamask for testing
export default (address) => {
    return new web3.eth.Contract(
        JSON.parse(Campaign.interface),
        address
    );
};