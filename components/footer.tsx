import { Container, Flex, Text } from "@chakra-ui/react"
import React from "react"

export const Footer: React.FC<{}> = () => {

  return (
    <Flex direction="row" bgColor="gray.300" w="100%" textColor="gray.500" mt={6}>
      <Container maxW="container.xl" fontSize="sm" my={12}> 
        <Text mb={4} fontSize="xl">Simple QR Code Generator</Text>
        <Text>Just a simple QR code generator.</Text>
        <Text>No account registration, ads, paywalls for SVG download, or other similar absurdity.</Text>
        <Text mt={4}>Uses <a href="https://github.com/soldair/node-qrcode">node-qrcode</a> to generate the QR code. The full source code is available <a href="https://github.com/ai03-2725/simple-qr-code-generator">here</a>.</Text>
        <Text>This generator is an open-source project, and does not come with any sort of guarantees, support, or warranties.</Text>
        <Text>QR Code is a registered trademark of <a href="https://www.denso-wave.com/en/">DENSO WAVE INCORPORATED</a>.</Text>
      </Container>
    </Flex>
  )

}