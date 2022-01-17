import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import validator from "validator";
import { CommentStack } from "../../components/CommentStack";
import { InputField } from "../../components/InputField";
import { Layout } from "../../components/Layout";
import { PostActionsDropdownMenu } from "../../components/PostActionsDropdownMenu";
import { PostPointsDisplay } from "../../components/PostPointsDisplay";
import {
    CommentResponse,
    usePostQuery,
    useUpdatePostMutation
} from "../../generated/graphql";
import { createURQLClient } from "../../utils/createURQLClient";
const Post: React.FC = ({}) => {
    const [{ fetching: uFetching }, updatePost] = useUpdatePostMutation();
    const router = useRouter();
    const [edit, setEdit] = useState(false);
    let postId = null;
    if (router.query.id) {
        postId = validator.isUUID(router.query.id as any)
            ? router.query.id
            : "-1";
    }
    const [{ data, fetching, error }] = usePostQuery({
        pause: postId === "-1",
        variables: {
            id: postId as string,
        },
    });
    let comments: ReactElement;
    if (fetching) {
        return <div>loading...</div>;
    }
    if (error) {
        return <div>{error.message}</div>;
    }
    if (!fetching && !error) {
        if (!data) {
            return <div>post doesn't exist</div>;
        } else {
            comments = data.post.comments.length ? <CommentStack comments={data.post.comments as CommentResponse[]} depth={0} /> : <Text>there are no comments yet...</Text>
            return (
                <Layout showNav>
                    <Box
                        key={data.post.id}
                        borderWidth="1px"
                        shadow="md"
                        sx={data.post.savedStatus ? { boxShadow: '0px 0px 3px 3px var(--chakra-colors-green-500)' } : {}}
                        p={3}
                        mb={2}
                    >
                        <Flex justifyContent="space-between">
                            <PostPointsDisplay post={data.post} />
                            <Box display="block" flex={1}>
                                <Formik
                                    initialValues={{ text: data.post.text }}
                                    onSubmit={async (values) => {
                                        await updatePost({
                                            id: data.post.id,
                                            text: values.text,
                                        });
                                        setEdit(false);
                                    }}
                                >
                                    {({ isSubmitting }) => (
                                        <Form>
                                            <Heading fontSize="xl">
                                                {data.post.title}
                                            </Heading>
                                            <NextLink
                                                href={`/duck/[id]`}
                                                as={`/duck/${data.post.creator.id}`}
                                            >
                                                <Link>
                                                    {data.post.creator.username}
                                                </Link>
                                            </NextLink>
                                            {!edit ? (
                                                <Text mt={4}>
                                                    {data.post.text}
                                                </Text>
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
                                    <PostActionsDropdownMenu
                                        post={data}
                                        onEdit={() => {
                                            setEdit(true);
                                        }}
                                    />
                                ) : null}
                                {data.post.savedStatus ?
                                <Box pos="relative" bottom="32px" right="69px" fontWeight="bold" color="green.700" fontSize="1.1em" letterSpacing="1px" userSelect="none">
                                    SAVED
                                </Box> : null
        }
                            </Box>
                        </Flex>
                    </Box>
                    <Text fontSize="2xl">comments:</Text>
                    {comments}
                </Layout>
            );
        }
    }
};

export default withUrqlClient(createURQLClient)(Post);
