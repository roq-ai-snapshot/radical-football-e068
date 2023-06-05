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
import { createPlayerProfile } from 'apiSdk/player-profiles';
import { Error } from 'components/error';
import { playerProfileValidationSchema } from 'validationSchema/player-profiles';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { PlayerInterface } from 'interfaces/player';
import { getPlayers } from 'apiSdk/players';
import { PlayerProfileInterface } from 'interfaces/player-profile';

function PlayerProfileCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: PlayerProfileInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createPlayerProfile(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PlayerProfileInterface>({
    initialValues: {
      height: 0,
      weight: 0,
      position: '',
      player_id: (router.query.player_id as string) ?? null,
    },
    validationSchema: playerProfileValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Player Profile
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="height" mb="4" isInvalid={!!formik.errors?.height}>
            <FormLabel>height</FormLabel>
            <NumberInput
              name="height"
              value={formik.values?.height}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('height', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.height && <FormErrorMessage>{formik.errors?.height}</FormErrorMessage>}
          </FormControl>
          <FormControl id="weight" mb="4" isInvalid={!!formik.errors?.weight}>
            <FormLabel>weight</FormLabel>
            <NumberInput
              name="weight"
              value={formik.values?.weight}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('weight', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.weight && <FormErrorMessage>{formik.errors?.weight}</FormErrorMessage>}
          </FormControl>
          <FormControl id="position" mb="4" isInvalid={!!formik.errors?.position}>
            <FormLabel>position</FormLabel>
            <Input type="text" name="position" value={formik.values?.position} onChange={formik.handleChange} />
            {formik.errors.position && <FormErrorMessage>{formik.errors?.position}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<PlayerInterface>
            formik={formik}
            name={'player_id'}
            label={'player_id'}
            placeholder={'Select Player'}
            fetcher={getPlayers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.user_id}
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
  entity: 'player_profile',
  operation: AccessOperationEnum.CREATE,
})(PlayerProfileCreatePage);
