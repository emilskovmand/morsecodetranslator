

import { Box, Center, ChakraProvider, FormControl, FormLabel, HStack, Heading, Kbd, Select, SimpleGrid, Textarea, VStack, chakra } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';

const MORSE_CODE = {
  "-----": "0",
  ".----": "1",
  "..---": "2",
  "...--": "3",
  "....-": "4",
  ".....": "5",
  "-....": "6",
  "--...": "7",
  "---..": "8",
  "----.": "9",
  ".-": "A",
  "-...": "B",
  "-.-.": "C",
  "-..": "D",
  ".": "E",
  "..-.": "F",
  "--.": "G",
  "....": "H",
  "..": "I",
  ".---": "J",
  "-.-": "K",
  ".-..": "L",
  "--": "M",
  "-.": "N",
  "---": "O",
  ".--.": "P",
  "--.-": "Q",
  ".-.": "R",
  "...": "S",
  "-": "T",
  "..-": "U",
  "...-": "V",
  ".--": "W",
  "-..-": "X",
  "-.--": "Y",
  "--..": "Z",
  "-.-.--": "!",
  ".-.-.-": ".",
  "--..--": ",",
  ".-.-": "Æ",
  "---.": "Ø",
  ".--.-": "Å"
};

const MORSE_CODE_REVERSED = Object.fromEntries(Object.entries(MORSE_CODE).map(([key, value]) => ([value, key])))

function MorseCodeApp() {
  const [morse, setMorse] = useState<string>('')
  const [text, setText] = useState<string>('')
  const [splitMorseOn, setSplitMorseOn] = useState<"/" | "//">('/')

  const morseToText = (newMorse: string) => {

    let newText = ''
    for (const morseWord of newMorse.trim().split(splitMorseOn)) {

      for (const morsePart of morseWord.trim().split(' ')) {
        const character = (MORSE_CODE as any)[morsePart]
        if (character) {
          newText += character
          newText += ""
        }
      }
      newText += " "
    }

    newText = newText.trim()
    setText(newText)
  }

  const textToMorse = (newText: string, splitOn = splitMorseOn) => {

    let morseCode = ''
    for (const character of newText.split('')) {
      const morseCharacter = (MORSE_CODE_REVERSED as any)[character.toUpperCase()]
      if (morseCharacter) {
        morseCode += morseCharacter
      }
      if (character === " ") {
        morseCode += splitOn
      }
      morseCode += " "
    }

    setMorse(morseCode)
  }

  const handleMorseCodeChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    const MORSE_REGEX = /[-./ ]/g
    const filtered = ev.target.value.match(MORSE_REGEX)
    const result = filtered ? filtered.join('') : ''

    setMorse(result.trim())
    morseToText(result.trim())
  }

  const handleTextChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    setText(ev.target.value)
    textToMorse(ev.target.value.trim())
  }

  const handleSplitByChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    setSplitMorseOn(ev.target.value as any)
    textToMorse(text, ev.target.value as any)
  }

  return <Box w="100vw" h="100vh">
    <VStack boxSize="100%" p="80px">
      <HStack flex="2">
        <SimpleGrid gap="10px" p="40px" bgColor={"white"} borderRadius={"12px"} color="black" columns={8}>
          {Object.entries(MORSE_CODE_REVERSED).map(([key, value]) => {
            return <Box>
              <chakra.span>{key} =</chakra.span> <Kbd bgColor="gray" color="white">{value}</Kbd>
            </Box>
          })}
        </SimpleGrid>
      </HStack>
      <HStack gap="60px" flex="7" boxSize="100%">
        <Box flex="8">
          <Center>
            <VStack boxSize={"full"}>
              <Heading fontSize={"20px"}>Morse</Heading>
              <Textarea onChange={handleMorseCodeChange} value={morse} minH={"300px"} maxH="300px" resize={"none"} />
            </VStack>
          </Center>
        </Box>
        <Box flex="2">
          <FormControl>
            <FormLabel>Split by</FormLabel>
            <Select value={splitMorseOn} onChange={handleSplitByChange}>
              <option value={"/"}>/</option>
              <option value={"//"}>{"//"}</option>
            </Select>
          </FormControl>
        </Box>
        <Box flex="8">
          <Center>
            <VStack boxSize={"full"}>
              <Heading fontSize={"20px"}>Text</Heading>
              <Textarea onChange={handleTextChange} value={text} minH={"300px"} maxH="300px" resize={"none"} />
            </VStack>
          </Center>
        </Box>
      </HStack>
    </VStack>
  </Box>
}


export default function App() {
  return (
    <ChakraProvider>
      <MorseCodeApp />
    </ChakraProvider>
  )
}