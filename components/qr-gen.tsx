import {
  AspectRatio,
  Box,
  Button,
  Container,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Select,
  Stack,
  Text,
  Wrap
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import QRCode from 'qrcode'
import SVG from 'react-inlinesvg'
import { DateTime } from "luxon";
import { HexAlphaColorPicker, HexColorInput } from "react-colorful";


export type errorCorrectionLevelType = "L" | "M" | "Q" | "H"


export const QRGenerator: React.FC<{}> = () => {


  const [inputString, setInputString] = useState<string>("")
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<errorCorrectionLevelType>("M")
  const [foregroundColor, setForegroundColor] = useState("#000000ff");
  const [backgroundColor, setBackgroundColor] = useState("#ffffffff");
  const [scale, setScale] = useState<number>(25)

  const [svgData, setSvgData] = useState<string | null>(null)


  // Regenerate SVG when variables change for preview reasons
  useEffect(() => {
    QRCode.toString(inputString, { errorCorrectionLevel: errorCorrectionLevel, type: "svg", color: { dark: foregroundColor, light: backgroundColor } })
      .then((svgData: string) => {
        setSvgData(svgData)
      })
      .catch((err: any) => {
        setSvgData(null)
      })
  }, [inputString, errorCorrectionLevel, foregroundColor, backgroundColor])

  // Download the already-generated SVG data
  const downloadSVG = () => {
    if (svgData) {
      const imageUrl = window.URL.createObjectURL(new Blob([svgData], { type: "image/svg+xml" }))
      downloadUrl(imageUrl, "svg")
    }
  }

  // Download a raster converted copy
  const downloadRaster = (fileType: "png" | "jpg" | "webp") => {
    let typeString: "image/png" | "image/jpeg" | "image/webp";
    switch (fileType) {
      case "png": {
        typeString = "image/png"
        break
      }
      case "jpg": {
        typeString = "image/jpeg"
        break
      }
      default: {
        typeString = "image/webp"
        break
      }
    }
    QRCode.toDataURL(inputString, { type: typeString, errorCorrectionLevel: errorCorrectionLevel, scale: scale, color: { dark: foregroundColor, light: backgroundColor } })
      .then((imageUrl: string) => {
        downloadUrl(imageUrl, fileType)
      })
      .catch((err: any) => {
        console.error(err)
      })
  }

  // Download the given file URL
  const downloadUrl = (urlString: string, extension: string) => {
    const downloadElement = document.createElement("a")
    downloadElement.href = urlString
    downloadElement.setAttribute("download", `qrcode-${DateTime.now().toFormat('yyyy-MM-dd-HHmm-ssS')}.${extension}`)
    document.body.appendChild(downloadElement)
    downloadElement.click()
    downloadElement.parentElement && downloadElement.parentElement.removeChild(downloadElement)
  }

  // Render
  return (
    <Container maxW="container.lg" mt={12}>
      <Stack direction={["column", "column", "row"]} minW="100%">

        {/* Left Column */}
        <Box pb={12}>
          <Container maxW="full">
            <Text fontSize="xl" fontWeight="500">QR Code Data</Text>
            <small>Include the <code>https://</code> when linking to a page.</small>
            <Input mt={3} borderColor="gray.300" rounded="4.5" placeholder='Text or URL' size='lg' fontSize="md" textAlign="center" onChange={e => setInputString(e.target.value)} />
          </Container>

          <Container mt={8} maxW="full">
            <Text fontSize="xl" fontWeight="500">Error Correction Level</Text>
            <small>The percentage the QR code can be damaged while retaining legibility.</small>
            <Select mt={3} borderColor="gray.300" rounded="4.5" size="lg" fontSize="md" defaultValue="M" textAlign="center" onChange={opt => setErrorCorrectionLevel(opt.target.value as errorCorrectionLevelType)}>
              <option value="L">Low (7%)</option>
              <option value="M">Medium (15%)</option>
              <option value="Q">Quartile (25%)</option>
              <option value="H">High (30%)</option>
            </Select>
          </Container>

          <Container mt={8} maxW="full">
            <Text fontSize="xl" fontWeight="500">Foreground Color</Text>
            <Popover>
              <PopoverTrigger>
                <Button w="100%" mt={3} size="lg" fontSize="lg" fontWeight="normal"><Box bgColor={foregroundColor} w="20px" h="20px" mr={1.5} rounded="3.75" ></Box>{foregroundColor.toUpperCase()}</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverHeader>Choose or enter a color</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody my={1}>
                  <HexAlphaColorPicker style={{ width: "100%" }} color={foregroundColor} onChange={setForegroundColor} />
                  <HexColorInput alpha={true} color={foregroundColor} onChange={setForegroundColor} style={{ width: "100%", marginTop: "12px", textAlign: "center", textTransform: "uppercase" }} />
                </PopoverBody>

              </PopoverContent>
            </Popover>
          </Container>

          <Container mt={8} maxW="full">
            <Text fontSize="xl" fontWeight="500">Background Color</Text>
            <Popover>
              <PopoverTrigger>
                <Button w="100%" mt={3} size="lg" fontSize="lg" fontWeight="normal"><Box bgColor={backgroundColor} w="20px" h="20px" mr={1.5} rounded="3.75" ></Box>{backgroundColor.toUpperCase()}</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverHeader>Choose or enter a color</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody my={1}>
                  <HexAlphaColorPicker style={{ width: "100%" }} color={backgroundColor} onChange={setBackgroundColor} />
                  <HexColorInput alpha={true} color={backgroundColor} onChange={setBackgroundColor} style={{ width: "100%", marginTop: "12px", textAlign: "center", textTransform: "uppercase" }} />
                </PopoverBody>

              </PopoverContent>
            </Popover>
          </Container>

          <Container mt={8} maxW="full">
            <Text fontSize="xl" fontWeight="500">Pixels Per Square</Text>
            <small>Only used for raster export.</small>
            <NumberInput mt={3} borderColor="gray.300" size='lg' rounded="4.5" fontSize="md" textAlign="center" defaultValue={25} onChange={v => setScale(parseInt(v))} step={1} min={1} max={999}>
              <NumberInputField textAlign="center" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Container>

        </Box>

        {/* Right Column */}
        <Box flex={1} textAlign="center" pt={4}>
          <Container maxW="320px">
            {
              svgData ?
                <Box border="1px" borderColor="gray.300" rounded="4.5" overflow="hidden">
                  <SVG src={svgData} />
                </Box>
                :
                <AspectRatio ratio={1} bgColor="lightgray" rounded="4.5">
                  <Text>Preview</Text>
                </AspectRatio>
            }
          </Container>

          <Container maxW="full">
            <Text mt={6} fontSize="lg" fontWeight="medium">Download</Text>
            <Wrap mt={3} direction="row" justify="center" w="100%">
              <Button rounded="4.25" colorScheme="customBlue" isDisabled={inputString == ""} onClick={downloadSVG}>SVG</Button>
              <Button rounded="4.25" colorScheme="customBlue" isDisabled={inputString == ""} onClick={() => downloadRaster("png")}>PNG</Button>
              <Button rounded="4.25" colorScheme="customBlue" isDisabled={inputString == ""} onClick={() => downloadRaster("jpg")}>JPG</Button>
              <Button rounded="4.25" colorScheme="customBlue" isDisabled={inputString == ""} onClick={() => downloadRaster("webp")}>WEBP</Button>
            </Wrap>
            <Box minH="72px" />
          </Container>
        </Box>

      </Stack>
    </Container>
  )

}