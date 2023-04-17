import { Container, Flex, Heading, Spacer } from "@chakra-ui/react"
import React from "react"

export const Navbar: React.FC<{}> = () => {

  return (
    <Flex direction="row" bgColor="nav" w="100%" h={["84px", "92px"]} textColor="white" py={8}>
      <Container maxW="container.xl" px={8}>
        <Heading fontSize={["xl", "2xl"]} fontWeight="300" fontStyle="regular">Simple QR Code Generator</Heading>
      </Container>
      <Spacer />
    </Flex>
  )

}