import React from 'react';
import { Menu, Icon, Button } from 'semantic-ui-react';
import Link from 'next/link'
import Image from 'next/image'


const Header = props => {
    return (
        <Menu style={{ marginTop: '10px' }} stackable >
            <Menu.Item>
                <Image src='/Icon.svg' alt='icon' width={50} height={50} />
            </Menu.Item>
            <Menu.Item>
                <Link href="/">
                    <Button basic icon style={{boxShadow: 'none'}}>
                            <Icon name="home" size='big' color="blue"></Icon>
                    </Button>
                </Link>
            </Menu.Item>
        </Menu>
    );
};

export default Header;