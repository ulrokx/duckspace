import { Button } from "@chakra-ui/button";
import { Box, Flex, Link } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import React, { useState } from "react";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import { createURQLClient } from "../../utils/createURQLClient";
import { toErrorMap } from "../../utils/toErrorMap";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
    const router = useRouter();
    const [, changePassword] = useChangePasswordMutation();
    const [tokenError, setTokenError] = useState("");
    return (
        <Wrapper>
            <Formik
                initialValues={{ newPassword: "" }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await changePassword({
                        newPassword: values.newPassword,
                        token: typeof router.query.token === "string" ? router.query.token : "",
                    });
                    if (response.data?.changePassword.errors) {
                        const errorMap = toErrorMap(
                            response.data.changePassword.errors
                        );
                        if ("token" in errorMap) {
                            setTokenError(errorMap.token);
                        }
                        setErrors(errorMap);
                    } else if (response.data?.changePassword.user) {
                        router.push("/");
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="newPassword"
                            placeholder="new password"
                            label="New Password"
                            type="password"
                        />
                        {tokenError ? (
                            <>
                                <Flex justify="space-between">
                                    <Box color="red">{tokenError}</Box>
                                    <NextLink href="/forgot-password">
                                        <Link>forget password again</Link>
                                    </NextLink>
                                </Flex>
                            </>
                        ) : null}
                        <Box mt={5}>
                            <Button
                                type="submit"
                                colorScheme="teal"
                                mt={4}
                                isLoading={isSubmitting}
                            >
                                change password
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
};


export default withUrqlClient(createURQLClient)(ChangePassword);
