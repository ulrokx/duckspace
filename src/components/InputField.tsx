import { Input, InputProps } from "@chakra-ui/input";
import { ComponentWithAs, FormControl, FormErrorMessage, FormLabel, Textarea } from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label?: string;
    textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
    label,
    size: _,
    textarea,
    ...props
}) => {
    let InputOrTextArea = Input
    if(textarea) {
        InputOrTextArea = Textarea as unknown as ComponentWithAs<"input", InputProps>
    }
    const [field, { error }] = useField(props);
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <InputOrTextArea {...props} {...field} id={field.name}></InputOrTextArea>
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    );
};
