import { React, useState, useEffect } from 'react';
import { Item } from 'semantic-ui-react';


import Link from 'next/link';


const CampaignItem = (props) => {
    const [showName, setName] = useState('');
    const [showImage, setImage] = useState('');
    const [showAddress, setAddress] = useState('');

    useEffect(()=>{
        setName(props.name)
        setImage(props.image)
        setAddress(props.address)
    }, [showName, showImage, showAddress]);

    return (
        <Item>
            <Item.Image size='small' src={showImage} />
            <Item.Content id={showAddress} header={showName} meta={showAddress} description={<Link href={`/campaigns/${showAddress}`}>View Campaign</Link>} />
        </Item>
    )
}


export default CampaignItem;