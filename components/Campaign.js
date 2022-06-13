import { React, useState, useEffect } from 'react';
import { Divider, Item, Label} from 'semantic-ui-react';
import { faker } from '@faker-js/faker';

import Link from 'next/link';


const CampaignItem = (props) => {
    const [showName, setName] = useState('');
    const [showImage, setImage] = useState('');
    const [showAddress, setAddress] = useState('');
    const [showTag, setTag] = useState('')
    const [showDesc, setDesc] = useState('')

    useEffect(()=>{
        setName(props.name)
        setImage(props.image)
        setAddress(props.address)
        setTag(faker.commerce.productAdjective())
        setDesc(props.desc)
    }, [showName, showImage, showAddress, showTag, showDesc]);

    return (
        <>
        <Divider></Divider>
        <Link href={`/campaigns/${showAddress}`}>
            <Item>
                <Item.Image size='small' src={showImage} />
                <Item.Content>
                    <Item.Header>{showName}</Item.Header>
                    <Item.Meta>{showAddress}</Item.Meta>
                    <Item.Description>
                        {showDesc}
                    </Item.Description>
                    <Item.Extra>
                        <Label>{showTag}</Label>
                    </Item.Extra>
                </Item.Content>
            </Item>
        </Link>
        
        </>
    )
}

export default CampaignItem;