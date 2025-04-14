"use client";
import { ContainedInputs } from "@/components/ui/inputs/text";
import {
  Anchor,
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  Text,
  Title,
} from "@mantine/core";
import { IconId, IconQrcode } from "@tabler/icons-react";
import Landing from "@/assets/landing.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import { QRCodeSVG } from "qrcode.react";

export default function Index() {
  const [error, setError] = useState<undefined | string>();
  const [faydaNumber, setFaydaNumber] = useState<undefined | string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<{ fullName: string; phoneNumber: string }>();
  const [opened, { toggle }] = useDisclosure(false);

  useEffect(() => {
    setError(undefined);
  }, [faydaNumber]);

  const validator = async () => {
    setLoading(true);
    if (!faydaNumber) {
      setError("FAYDA Identification Number is required");
      setLoading(false);
      return false;
    } else if (faydaNumber.length !== 16) {
      setError("FAYDA Identification Number must be 16 characters");
      setLoading(false);
      return false;
    } else if (isNaN(Number(faydaNumber))) {
      setError("FAYDA Identification Number can only contain numbers");
      setLoading(false);
      return false;
    } else {
      setError(undefined);
    }

    const response = await fetch(
      `https://67d2458a90e0670699bcdd19.mockapi.io/get_user/${Number(
        faydaNumber
      )}`
    );
    const data = await response.json();

    if (data.id) {
      setError(undefined);
      setUser(data);
      toggle();
      notifications.show({
        title: "Success",
        message: "You have been found to be a valid tester! 🌟",
        position: "bottom-right",
      });
    } else {
      setError("A user with this FAYDA Id wasn't found in our testers list");
    }

    setLoading(false);
    return true;
  };

  return (
    <Box>
      <Modal opened={opened} onClose={toggle} title="App Download QR">
        <Flex align="center" gap={15}>
          <QRCodeSVG
            value={
              "https://drive.google.com/file/d/1vXy9IEFOeyqJziH8DCD4VhQoxTPF59Ae/view?usp=sharing"
            }
          />
          <Flex direction="column">
            <Title order={5}>{user?.fullName}</Title>
            <Title c="dimmed" order={5}>
              {user?.phoneNumber}
            </Title>
          </Flex>
        </Flex>
        <Divider my="xs" />
        <Anchor href="https://drive.google.com/file/d/1vXy9IEFOeyqJziH8DCD4VhQoxTPF59Ae/view?usp=sharing">
          Download App
        </Anchor>
      </Modal>
      <Flex gap="xl" style={{ width: "100%" }} justify="space-between">
        <Flex justify="center" gap={50} direction="column">
          <Box>
            <Title mb="xs" mt="xl">
              Welcome to,{" "}
              <span
                style={{
                  color: "var(--mantine-color-primary-5)",
                  fontWeight: 900,
                }}
              >
                BMart&apos;s
              </span>{" "}
              Testing Registration Platform
            </Title>
            <Text>
              Join us in shaping the future! Register now to participate in
              BMart&apos;s exclusive testing program, where you&apos;ll get
              early access to our latest innovations.
            </Text>
          </Box>
          <Flex gap="sm" direction="column">
            <ContainedInputs
              disabled={loading}
              value={faydaNumber}
              setValue={setFaydaNumber}
              error={error}
              label="FAYDA Identification Number"
              placeholder="Enter FAYDA Identification Number"
              icon={<IconId size={20} />}
            />
            <Button
              loading={loading}
              onClick={validator}
              justify="space-between"
              rightSection={<IconQrcode size={25} />}
              size="lg"
              color="dark"
              variant="filled"
              disabled={loading}
            >
              <Text fw={700} size="sm">
                GET APP DOWNLOAD QR
              </Text>
            </Button>
            <Text size="xs">
              If you aren&apos;t in the testing list,{" "}
              <Anchor c="primary.9">Join Testers List</Anchor>
            </Text>
          </Flex>
        </Flex>

        <Flex visibleFrom="md" justify="flex-end">
          <Image
            style={{ padding: 0, margin: 0 }}
            src={Landing.src}
            width={800}
            height={500}
            alt="Landing"
          />
        </Flex>
      </Flex>
    </Box>
  );
}
