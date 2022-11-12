import { useLocation } from "react-router-dom";
import { Container, Header, Segment } from "semantic-ui-react";

export const ServerError = () => {
    const {state: data} = useLocation();

    const commonStore = {
        error: {
            details: 'Something went wrong',
            message: 'Server Error'
        }
    }
    return (
        <Container>
            <Header as='h1' content='Internal Server Error' />
            {/* <Header sub as='h5' color='red' content={data?.message} /> */}

            {
                commonStore.error?.details && (
                    <Segment>
                        <Header as='h4' content='Stack trace' color='teal' />
                        <code style={{marginTop: '10px',}}>{data}</code>
                    </Segment>
                )
            }
        </Container>
    )
}