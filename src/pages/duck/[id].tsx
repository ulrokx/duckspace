import { Badge, Box, Flex, Heading } from '@chakra-ui/layout';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { Layout } from '../../components/Layout';
import { useGetUserQuery } from '../../generated/graphql';
import { createURQLClient } from '../../utils/createURQLClient';

interface Props {

}

const ProfilePage: React.FC = ({}) => {
    const router = useRouter()
    const userId = router.query.id
    const [{data, fetching, error}] = useGetUserQuery({
        variables: {
            uuid: userId as string
        }
    })
    if(fetching) {
        return <div>loading...</div>
    } else if(!data) {
        return <div>{error.message}</div>
    } else {
        const user = data.getUser
        return (
            <Layout showNav>
                <Box shadow="md" borderWidth="1px" p={3}>
                <Heading mb={3} fontSize="4xl">{user.username}</Heading>
                <Flex flexDirection="row" sx={{gap: "2em"}}>
                <Badge fontSize="l">Posts: {user.posts.length}</Badge>
                <Badge fontSize="l">Comments: {user.posts?.comments}</Badge>
                <Badge fontSize="l">Total Quacks: {user.</Badge>
                </Flex>
                </Box>
            </Layout>
        );
    }
}
export default withUrqlClient(createURQLClient)(ProfilePage)