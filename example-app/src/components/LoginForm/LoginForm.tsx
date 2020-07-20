import React, { useState } from 'react';
import { Box, Button, Form, FormField, TextInput } from 'grommet';

import { loginFormField } from './LoginForm.module.scss';

export const LoginForm: React.FC = () => {
  const [value, setValue] = useState({});

  return (
    <Form
      className='form'
      value={value}
      onChange={nextValue => setValue(nextValue)}
      onReset={() => setValue({})}
      onSubmit={() => console.log(value)}
    >
      <FormField name="name" label="Name" className={loginFormField}>
        <TextInput name="name" />
      </FormField>
      <FormField name="login" label="Login" className={loginFormField}>
        <TextInput name="login" />
      </FormField>
      <FormField name="password" label="Password" className={loginFormField}>
        <TextInput name="password" type='password' />
      </FormField>
      <Box direction="row" gap="medium" margin='large' justify='center'>
        <Button type="submit" primary label="Login" />
        <Button type="reset" label="Reset" />
      </Box>
    </Form>
  );
};