import {
  AppShell,
  Burger,
  Container,
  NavLink,
  Flex,
  Box,
  Anchor,
  Title,
  HoverCard,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Logo from "@/assets/imageAlt.png";
import LogoClear from "@/assets/imageClear.png";
import Image from "next/image";
import { containerHeight } from "@/lib/libs";
import { IconPhoneCalling } from "@tabler/icons-react";

export default function BaseShell({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  const navMenu = (
    <>
      <NavLink fw={700} label="HOME" />
      <NavLink fw={700} label="ABOUT" />
      <HoverCard>
        <HoverCard.Target>
          <NavLink fw={700} label="SUPPORT" />
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <NavLink fw={700} label="HELP" />
          <NavLink fw={700} label="USER GUIDE" />
          <NavLink fw={700} label="FAQ" />
        </HoverCard.Dropdown>
      </HoverCard>
      <NavLink
        rightSection={<IconPhoneCalling size={16} />}
        fw={700}
        active
        variant="filled"
        color="primary"
        label="CONTACT"
      />
    </>
  );

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 150 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Container px={{ lg: 0, md: 0, xl: 0, xs: "xs", sm: "sm" }}>
          <Flex justify="space-between" h={60}>
            <Flex align="center">
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
              />
              <Box>
                <Image alt="logoalt" src={Logo.src} width={50} height={50} />
              </Box>
            </Flex>

            <Flex
              justify="flex-end"
              h={60}
              align="center"
              ml="xl"
              gap="sm"
              visibleFrom="sm"
            >
              {navMenu}
            </Flex>
          </Flex>
        </Container>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        {navMenu}
      </AppShell.Navbar>

      <AppShell.Main>
        <Container>{children}</Container>
      </AppShell.Main>
      <AppShell.Footer>
        <Container
          style={{ height: containerHeight }}
          px={{ lg: 0, md: 0, xl: 0, xs: "xs", sm: "sm" }}
        >
          <Flex w="100%" h={150} align="center" justify="space-between">
            <Box visibleFrom="md">
              <Image
                src={LogoClear.src}
                alt="logoalt"
                width={200}
                height={200}
              />
            </Box>
            <Flex align="flex-start" gap={60} justify="flex-end">
              <Flex direction="column">
                <Title order={5}>About Us</Title>
                <Anchor c="dimmed" size="sm">
                  About Us
                </Anchor>
                <Anchor c="dimmed" size="sm">
                  Contact Us
                </Anchor>
              </Flex>
              <Flex direction="column">
                <Title order={5}>Help & Support</Title>
                <Anchor c="dimmed" size="sm">
                  Help
                </Anchor>
                <Anchor c="dimmed" size="sm">
                  User Guide
                </Anchor>
                <Anchor c="dimmed" size="sm">
                  Support
                </Anchor>
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </AppShell.Footer>
    </AppShell>
  );
}
