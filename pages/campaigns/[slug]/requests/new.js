import { React, Component } from 'react'
import Layout from '../../../../components/Layout';
import RequestForm from '../../../../components/RequestForm';
import 'semantic-ui-css/semantic.min.css'

class NewRequest extends Component {

    static async getInitialProps(props) {

        const { slug } = props.query;
        return {slug};
    }

    render() {
        return (
            <Layout>
                <h1> Create a New Request! </h1>
                <RequestForm address={this.props.slug} />
            </Layout>
        )
    }
}

export default NewRequest;