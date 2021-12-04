import { Box, Button, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { createURQLClient } from "../utils/createURQLClient";
import { sleep } from "../utils/sleep";
import NextLink from 'next/link'
import { Layout } from "../components/Layout";

const ForgotPassword: React.FC<{}> = ({}) => {
    const [complete, setComplete] = useState(false);
    const [, forgotPassword] = useForgotPasswordMutation();
    return (
        <Layout>
            <Formik
                initialValues={{ email: "" }}
                onSubmit={async (values) => {
                    await forgotPassword({
                        email: values.email,
                    });
                    await sleep(3000);
                    setComplete(true);
                }}
            >
                {({  isSubmitting}) => (
                    <Form>
                        <InputField
                            name="email"
                            placeholder="email"
                            label="Email"
                        />
                        <Box mt={5} display='flex' justifyContent='space-between' alignContent="center">
                            <Button
                                type="submit"
                                colorScheme="teal"
                                mt={4}
                                isLoading={isSubmitting}
                                disabled={complete}
                            >
                                send password change email
                            </Button>
                            {complete ? <><Box>an email will be sent if the email entered is valid</Box>
                            <NextLink href="/"><Link>take me back home</Link></NextLink></> : null}
                        </Box>
                    </Form>
                )}
            </Formik>
            </Layout>
    );
};

export default withUrqlClient(createURQLClient)(ForgotPassword);
