import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createPractice } from 'apiSdk/practices';
import { Error } from 'components/error';
import { practiceValidationSchema } from 'validationSchema/practices';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { TeamInterface } from 'interfaces/team';
import { getPlayers } from 'apiSdk/players';
import { PlayerInterface } from 'interfaces/player';
import { getTeams } from 'apiSdk/teams';
import { PracticeInterface } from 'interfaces/practice';

function PracticeCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: PracticeInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createPractice(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PracticeInterface>({
    initialValues: {
      date: new Date(new Date().toDateString()),
      time: new Date(new Date().toDateString()),
      location: '',
      team_id: (router.query.team_id as string) ?? null,
      attendance: [],
    },
    validationSchema: practiceValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Practice
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="date" mb="4">
            <FormLabel>date</FormLabel>
            <DatePicker
              dateFormat={'dd/MM/yyyy'}
              selected={formik.values?.date}
              onChange={(value: Date) => formik.setFieldValue('date', value)}
            />
          </FormControl>
          <FormControl id="time" mb="4">
            <FormLabel>time</FormLabel>
            <DatePicker
              dateFormat={'dd/MM/yyyy'}
              selected={formik.values?.time}
              onChange={(value: Date) => formik.setFieldValue('time', value)}
            />
          </FormControl>
          <FormControl id="location" mb="4" isInvalid={!!formik.errors?.location}>
            <FormLabel>location</FormLabel>
            <Input type="text" name="location" value={formik.values?.location} onChange={formik.handleChange} />
            {formik.errors.location && <FormErrorMessage>{formik.errors?.location}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<TeamInterface>
            formik={formik}
            name={'team_id'}
            label={'team_id'}
            placeholder={'Select Team'}
            fetcher={getTeams}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'practice',
  operation: AccessOperationEnum.CREATE,
})(PracticeCreatePage);
