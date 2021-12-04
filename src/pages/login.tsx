import {
    Box,
    Button,
    Flex, Link
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useLoginMutation } from "../generated/graphql";
import { createURQLClient } from "../utils/createURQLClient";
import { toErrorMap } from "../utils/toErrorMap";

const Login: React.FC = ({}) => {
    const [, login] = useLoginMutation();
    const router = useRouter();
    return (
        <Layout showNav wrapperVariant="small">
            <Formik
                initialValues={{ usernameOrEmail: "", password: "" }}
                onSubmit={async (values, { setErrors }) => {
                    console.log(values);
                    const response = await login(values);
                    if (response.data?.login.errors) {
                        setErrors(toErrorMap(response.data.login.errors));
                    } else if (response.data?.login.user) {
                        if (typeof router.query.next == "string") {
                            router.push(router.query.next)
                        }
                        router.push("/")
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="usernameOrEmail"
                            placeholder="username or email"
                            label="Username or Email"
                        />

                        <Box mt={5}>
                            <InputField
                                name="password"
                                placeholder="password"
                                label="Password"
                                type="password"
                            />
                            <Flex justify="space-between" mt={4}>
                                <Button
                                    type="submit"
                                    colorScheme="teal"
                                    isLoading={isSubmitting}
                                >
                                    login
                                </Button>
                                <NextLink href="/forgot-password">
                                    <Link>forget password?</Link>
                                </NextLink>
                            </Flex>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Layout>
    );
};

export default withUrqlClient(createURQLClient)(Login);
