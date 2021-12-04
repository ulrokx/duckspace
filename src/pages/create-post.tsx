import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreatePostMutation } from "../generated/graphql";
import { createURQLClient } from "../utils/createURQLClient";
import { useIsAuth } from "../utils/useIsAuth";

const CreatePost: React.FC = ({}) => {
    const router = useRouter()
    useIsAuth();
    const [{}, createPost] = useCreatePostMutation();
    return (
        <Layout wrapperVariant="regular" showNav>
            <Formik
                initialValues={{ title: "", text: "" }}
                onSubmit={async (values) => {
                    const {error} = await createPost({input: values});
                    if (!error) {
                        router.push("/")
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="title"
                            placeholder="title"
                            label="title of your post"
                        />

                        <Box mt={5}>
                            <InputField
                                name="text"
                                placeholder="text..."
                                label="body"
                                textarea
                            />
                            <Button
                            mt={5}
                                type="submit"
                                colorScheme="teal"
                                isLoading={isSubmitting}
                            >
                                create post
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
            </Layout>
    );
};

export default withUrqlClient(createURQLClient)(CreatePost)