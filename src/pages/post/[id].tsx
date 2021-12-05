import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../../components/InputField";
import { Layout } from "../../components/Layout";
import { PostMenuButton } from "../../components/PostMenuButton";
import { PostPointsDisplay } from "../../components/PostPointsDisplay";
import { usePostQuery, useUpdatePostMutation } from "../../generated/graphql";
import { createURQLClient } from "../../utils/createURQLClient";
import getQueryParam from "../../utils/getQueryParam";
//todo fix when post is not found
const Post: React.FC = ({}) => {
    const [{fetching: uFetching }, updatePost] = useUpdatePostMutation()
    const router = useRouter();
    const [edit, setEdit] = useState(false);
    // const postId = getQueryParam({param: "id", isid: true})    queryP =
        const postId = typeof router.query.id === "string" 
            ? parseInt(router.query.id as string, 10)
            : -1;
    const [{ data, fetching, error }] = usePostQuery({
        pause: postId === -1,
        variables: {
            id: postId as number,
        },
    });
    if (fetching) {
        return <div>loading...</div>;
    }
    if (error) {
        return <div>{error.message}</div>;
    }
    try {
        return (
            <Layout showNav>
                {" "}
                <Box key={data.post.id} borderWidth="1px" shadow="md" p={3}>
                    <Flex justifyContent="space-between">
                        <PostPointsDisplay post={data.post} />
                        <Box display="block" flex={1}>
                            <Formik
                                initialValues={{ text: data.post.text }}
                                onSubmit={async (values) => {
                                    await updatePost({id: data.post.id, text: values.text});
                                    setEdit(false);
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <Heading fontSize="xl">
                                            {data.post.title}
                                        </Heading>
                                        <Text>
                                            {data.post.creator.username}
                                        </Text>
                                        {!edit ? (
                                            <Text mt={4}>{data.post.text}</Text>
                                        ) : (
                                            <>
                                                <Box mb={4}>
                                                    <InputField
                                                        textarea
                                                        name="text"
                                                    />
                                                </Box>
                                                <Button
                                                    isLoading={isSubmitting}
                                                    type="submit"
                                                    text
                                                >
                                                    Update
                                                </Button>
                                            </>
                                        )}
                                    </Form>
                                )}
                            </Formik>
                        </Box>
                        <Box width="auto">
                            {!edit ? (
                                <PostMenuButton
                                    post={data}
                                    onEdit={() => {
                                        setEdit(true);
                                    }}
                                />
                            ) : null}
                        </Box>
                    </Flex>
                </Box>
            </Layout>
        );
    } catch (e) {
        return <div>post doesn't exist</div>;
    }
};

export default withUrqlClient(createURQLClient, { ssr: true })(Post);