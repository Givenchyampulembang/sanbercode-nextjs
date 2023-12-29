import dynamic from "next/dynamic";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Heading,
  Text,
  Button,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function AddNotes() {
  const router = useRouter();
  const [notes, setNotes] = useState({
    title: "",
    description: "",
  });

  const HandleSummit = async () => {
    try {
      const response = await fetch(
        "https://paace-f178cafcae7b.nevacloud.io/api/notes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notes),
        }
      );

      const result = await response.json();
      if (result?.success) {
        router.push("/notes/");
      }
    } catch (error) {}
  };

  return (
    <>
      <LayoutComponent metaTitle="Notes">
        <Card margin="5" padding="5">
          <Heading>Add Notes</Heading>
          <Grid gap="5">
            <GridItem>
              <Text>Title</Text>
              <Input
                type="text"
                onChange={(event) =>
                  setNotes({ ...notes, title: event.target.value })
                }
              />
            </GridItem>
            <GridItem>
              <Text>Description</Text>
              <Textarea
                onChange={(event) =>
                  setNotes({ ...notes, description: event.target.value })
                }
              />
            </GridItem>

            <GridItem>
              <Button colorScheme="blue" onClick={() => HandleSummit()}>
                Submit
              </Button>
            </GridItem>
          </Grid>
        </Card>
      </LayoutComponent>
    </>
  );
}
