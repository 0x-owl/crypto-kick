import { React, Component } from 'react'
import Layout from '../../../../components/Layout';
import { Button } from 'semantic-ui-react';
import Link from 'next/link';

import 'semantic-ui-css/semantic.min.css'


class RequestIdx extends Component {
    static async getInitialProps(props) {

        const { slug } = props.query;
        return {slug};
    }

    render() {
        return (
            <Layout>
                <h3> Requests </h3>
                <Link href={`/campaigns/${this.props.slug}/requests/new`}>
                    <Button primary>Add Request</Button>
                </Link>
            </Layout>
        )
    }
}

export default RequestIdx;