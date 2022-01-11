import { Box, Stack, Text } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../../components/Layout";
import { PostCard } from "../../../components/PostCard";
import { UserDisplayType } from "../../../components/UserDisplayType";
import { UserPageCard } from "../../../components/UserPageCard";
import { useGetUserQuery, useSavedQuery } from "../../../generated/graphql";
import { createURQLClient } from "../../../utils/createURQLClient";
import { useIsMe } from "../../../utils/useIsMe";

interface Props {}

const SavedPosts: React.FC = ({}) => {
    const router = useRouter();
    useIsMe();
    const userId = router.query.id;
    const [{ data: savedData, fetching: savedFetching, error: SavedError }] =
        useSavedQuery();
    const [{ data, fetching, error }] = useGetUserQuery({
        variables: {
            uuid: userId as string,
        },
    });
    if (fetching || savedFetching) {
        return <div>loading...</div>;
    } else if (!data || !savedData) {
        return (
            <div>
                <div>{error.message}</div>
                <div>{SavedError.message}</div>
            </div>
        );
    } else {
        const user = data.getUser;
        const saved = savedData.saved;
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
                        {saved.length !== 0 ? (
                            saved.map(({ post: p }) => {
                                return <PostCard post={p} />;
                            })
                        ) : (
                            <Text textColor="grey" alignSelf="center">
                                you have not saved any posts yet...
                            </Text>
                        )}
                    </Stack>
                </Box>
            </Layout>
        );
    }
};
export default withUrqlClient(createURQLClient)(SavedPosts);
