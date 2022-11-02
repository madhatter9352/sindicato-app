import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

export const Loading = ({content = '', inverted = false}) => {
    return (
        <Dimmer active={true}  inverted={inverted}>
            <Loader active inline='centered' content={content} />
        </Dimmer>
    )
}
