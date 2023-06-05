import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['AcademyOwner'];
  const roles = ['AcademyOwner', 'AcademyOwner', 'Coach', 'Player', 'Parent'];
  const applicationName = 'radical-football64';
  const tenantName = 'Academy';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `Academy Owner:
1. As an Academy Owner, I want to be able to create and manage multiple teams within my academy, so I can efficiently organize my players and coaches.
2. As an Academy Owner, I want to have an overview of all player profiles, so I can track their progress and development.
3. As an Academy Owner, I want to be able to assign coaches to specific teams, so they can focus on the development of those players.
4. As an Academy Owner, I want to be able to manage the schedules for all teams, so I can ensure that practices and games are organized efficiently.
5. As an Academy Owner, I want to be able to communicate with coaches, players, and parents through the platform, so I can keep everyone informed about important updates and events.

Coach:
1. As a Coach, I want to be able to view and update individual player profiles, so I can track their progress and provide personalized feedback.
2. As a Coach, I want to be able to create and manage practice plans and drills for my team, so I can ensure that players are developing the necessary skills.
3. As a Coach, I want to be able to communicate with my players and their parents through the platform, so I can keep them informed about practice schedules, game times, and other important information.
4. As a Coach, I want to be able to track player attendance and participation, so I can identify any issues and address them promptly.
5. As a Coach, I want to be able to collaborate with other coaches within the academy, so we can share best practices and improve our coaching methods.

Player:
1. As a Player, I want to be able to access my individual player profile, so I can track my progress and receive feedback from my coach.
2. As a Player, I want to be able to view my team's practice and game schedule, so I can plan accordingly and ensure I am prepared.
3. As a Player, I want to be able to communicate with my coach and teammates through the platform, so I can ask questions and stay informed about any updates or changes.
4. As a Player, I want to be able to access training materials and resources provided by my coach, so I can continue to develop my skills outside of practice.

Parent:
1. As a Parent, I want to be able to view my child's individual player profile, so I can track their progress and support their development.
2. As a Parent, I want to be able to access the team's practice and game schedule, so I can plan accordingly and ensure my child is prepared.
3. As a Parent, I want to be able to communicate with my child's coach through the platform, so I can ask questions, provide feedback, and stay informed about any updates or changes.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="10" bottom="20%" zIndex={3}>
      <Popover>
        <PopoverTrigger>
          <IconButton aria-label="Help Info" icon={<FiInfo />} />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody maxH="500px" overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application. Feel free to remove this tutorial with the{' '}
              <Box as="span" bg="yellow.300" p={1}>
                NEXT_PUBLIC_SHOW_BRIEFING
              </Box>{' '}
              environment variable.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
