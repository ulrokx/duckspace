import { Box, Stack, Text } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import router, { useRouter } from 'next/router';
import React from 'react'
import { Layout } from '../../../components/Layout'
import { PostCard } from '../../../components/PostCard';
import { UserDisplayType } from '../../../components/UserDisplayType';
import { UserPageCard } from '../../../components/UserPageCard';
import { useGetUserQuery } from '../../../generated/graphql';
import { createURQLClient } from '../../../utils/createURQLClient';

interface commentsProps {

}

const ProfileComments: React.FC<commentsProps> = ({}) => {
    const router = useRouter();
    const userId = router.query.id;
    const [{ data, fetching, error }] = useGetUserQuery({
        variables: {
            uuid: userId as string,
        },
    });
    if (fetching) {
        return <div>loading...</div>;
    } else if (!data) {
        return <div>{error.message}</div>;
    } else {
        const user = data.getUser;
        return (
            <Layout showNav>
                <UserPageCard getUser={user} />
                <Box display={{ md: "flex" }}>
                    <Box shadow="md" flex={3} mr={2}>
                        <UserDisplayType
                            selected={router.pathname}
                            id={user.id}
                        />
                    </Box>
                    <Stack spacing={8} flex={7}>
                        {user.posts.length !== 0 ? (
                            user.posts.map((p) => {
                                return <PostCard post={p} />;
                            })
                        ) : (
                            <Text textColor="grey" alignSelf="center">
                                this user hasn't posted anything yet...
                            </Text>
                        )}
                    </Stack>
                </Box>
            </Layout>
        );
    }
}

export default withUrqlClient(createURQLClient)(ProfileComments);