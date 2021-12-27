import { Box, Stack, Text } from "@chakra-ui/react";
import router, { useRouter } from "next/router";
import React from "react";
import { useGetUserQuery } from "../generated/graphql";
import { Layout } from "./Layout";
import { PostCard } from "./PostCard";
import { UserDisplayType } from "./UserDisplayType";
import { UserPageCard } from "./UserPageCard";


export const ProfilePageLayout: React.FC = ({children}) => {
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
                    <UserDisplayType selected={router.pathname} id={user.id} />
                </Box>
                {children}
            </Box>
        </Layout>
    );
                    }
};
