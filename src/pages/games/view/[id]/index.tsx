import AppLayout from 'layout/app-layout';
import NextLink from 'next/link';
import React, { useState } from 'react';
import { Text, Box, Spinner, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, Link } from '@chakra-ui/react';
import { UserSelect } from 'components/user-select';
import { getGameById } from 'apiSdk/games';
import { Error } from 'components/error';
import { GameInterface } from 'interfaces/game';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AccessOperationEnum, AccessServiceEnum, useAuthorizationApi, withAuthorization } from '@roq/nextjs';

function GameViewPage() {
  const { hasAccess } = useAuthorizationApi();
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<GameInterface>(
    () => (id ? `/games/${id}` : null),
    () =>
      getGameById(id, {
        relations: ['team'],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);
  const [createError, setCreateError] = useState(null);

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Game Detail View
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Text fontSize="lg" fontWeight="bold" as="span">
              Date:
            </Text>
            <Text fontSize="md" as="span" ml={3}>
              {data?.date as unknown as string}
            </Text>
            <br />
            <Text fontSize="lg" fontWeight="bold" as="span">
              Time:
            </Text>
            <Text fontSize="md" as="span" ml={3}>
              {data?.time as unknown as string}
            </Text>
            <br />
            <Text fontSize="lg" fontWeight="bold" as="span">
              Location:
            </Text>
            <Text fontSize="md" as="span" ml={3}>
              {data?.location}
            </Text>
            <br />
            <Text fontSize="lg" fontWeight="bold" as="span">
              Opponent:
            </Text>
            <Text fontSize="md" as="span" ml={3}>
              {data?.opponent}
            </Text>
            <br />
            {hasAccess('team', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
              <>
                <Text fontSize="lg" fontWeight="bold" as="span">
                  Team:
                </Text>
                <Text fontSize="md" as="span" ml={3}>
                  <Link as={NextLink} href={`/teams/view/${data?.team?.id}`}>
                    {data?.team?.name}
                  </Link>
                </Text>
              </>
            )}
          </>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'game',
  operation: AccessOperationEnum.READ,
})(GameViewPage);
