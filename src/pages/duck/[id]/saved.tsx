import { Box, Text } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../../components/Layout";
import { UserDisplayType } from "../../../components/UserDisplayType";
import { UserPageCard } from "../../../components/UserPageCard";
import { useGetUserQuery } from "../../../generated/graphql";
import { createURQLClient } from "../../../utils/createURQLClient";
import { useIsMe } from "../../../utils/useIsMe";

interface Props {}

const SavedPosts: React.FC = ({}) => {
    const router = useRouter();
    useIsMe()
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
                    <Text>saved</Text>
                </Box>
            </Layout>
        );
    }
};
export default withUrqlClient(createURQLClient)(SavedPosts);
