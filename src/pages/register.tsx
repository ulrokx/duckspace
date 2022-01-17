import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useMutation } from "urql";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { createURQLClient } from "../utils/createURQLClient";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps {}



const Register: React.FC<registerProps> = ({}) => {
    const [, register] = useRegisterMutation(); 
    const router = useRouter();
    return (
        <Layout showNav wrapperVariant="small">
            <Formik
                initialValues={{ email: "", username: "", password: "" }}
                onSubmit={async (values, {setErrors}) => {
                    const response = await register({options: values});
                    if (response.data?.register.errors) {
                        setErrors(toErrorMap(response.data.register.errors));
                    } else if(response.data?.register.user) {
                        router.push("/");
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="username"
                            placeholder="username"
                            label="Username"
                        />
                        <Box mt={5}>
                            <InputField 
                            name="email"
                            placeholder="email"
                            label="Email"
                            />
                        </Box>

                        <Box mt={5}>
                            <InputField
                                name="password"
                                placeholder="password"
                                label="Password"
                                type="password"
                            />
                            <Button type="submit" colorScheme="teal" mt={4} isLoading={isSubmitting}>register</Button>
                        </Box>
                    </Form>
                )}
            </Formik>
            </ Layout>
    );
};

export default withUrqlClient(createURQLClient)(Register);
