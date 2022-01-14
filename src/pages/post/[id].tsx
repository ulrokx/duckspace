import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, Link, Stack, Text } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { InputField } from "../../components/InputField";
import { Layout } from "../../components/Layout";
import { PostActionsDropdownMenu } from "../../components/PostActionsDropdownMenu";
import { PostPointsDisplay } from "../../components/PostPointsDisplay";
import {
    useGetCommentsQuery,
    usePostQuery,
    useUpdatePostMutation,
} from "../../generated/graphql";
import { createURQLClient } from "../../utils/createURQLClient";
import getQueryParam from "../../utils/getQueryParam";
import NextLink from "next/link";
import {CommentCard} from "../../components/CommentCard"
import { CommentStack } from "../../components/CommentStack";
//todo fix when post is not found
const Post: React.FC = ({}) => {
    const [{ fetching: uFetching }, updatePost] = useUpdatePostMutation();
    const router = useRouter();
    const [edit, setEdit] = useState(false);
    const postId = typeof router.query.id === "string" ? router.query.id : "-1";
    const [{ data, fetching, error }] = usePostQuery({
        pause: postId === "-1",
        variables: {
            id: postId as string,
        },
    });
    const [{ data: cdata, fetching: cfetching, error: cerror }] =
        useGetCommentsQuery({
            pause: postId === "-1",
            variables: {
                postId,
            },
        });
    let comments: ReactElement;
    if(cfetching) {
        comments = <p>loading comments...</p>
    }
    if(cerror) {
        comments = <p>{cerror.message}</p>
    }
    if(!cfetching && !error){
        if(!cdata) {
            comments = <p>there are no comments on this post</p>
        } else {
            console.log(cdata.getComments)
            comments = <CommentStack comments={cdata.getComments}/>
        }
    }
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
            return (
                <Layout showNav>
                    {" "}
                    <Box key={data.post.id} borderWidth="1px" shadow="md" p={3} mb={4}>
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
                            </Box>
                        </Flex>
                    </Box>
                    <>{comments}</>
                </Layout>
            );
        }
    }
};

export default withUrqlClient(createURQLClient)(Post);
