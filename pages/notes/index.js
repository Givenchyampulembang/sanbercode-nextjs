import dynamic from "next/dynamic";
import {
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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Notes() {
  const [notes, setNotes] = useState();
  useEffect(() => {
    async function fetchingData() {
      const res = await fetch(
        "https://paace-f178cafcae7b.nevacloud.io/api/notes"
      );

      const listNotes = await res.json();
      setNotes(listNotes);
    }
    fetchingData();
  }, []);

  return (
    <>
      <LayoutComponent metaTitle="Notes">
        <Flex>
          <Grid templateColumns="repeat(3, 1fr)" gap={5}>
            {notes?.data?.map((item) => (
              <GridItem>
                <Card>
                  <CardHeader>
                    <Heading>{item?.title}</Heading>
                    <CardHeader>
                      <CardBody>
                        <Text>{item?.description}</Text>
                      </CardBody>
                      <CardFooter justify="space-between" flexWrap="wrap">
                        <Button flex="1" variant="ghost">
                          Edit
                        </Button>
                        <Button flex="1" variant="ghost">
                          Delete
                        </Button>
                      </CardFooter>
                    </CardHeader>
                  </CardHeader>
                </Card>
              </GridItem>
            ))}
          </Grid>
        </Flex>
      </LayoutComponent>
    </>
  );
}
