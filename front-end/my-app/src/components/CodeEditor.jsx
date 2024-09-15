import { useEffect, useRef, useState } from "react";
import { Box, HStack, VStack, Button, Text } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";
import Icon from "./icon/Icon";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [totalQuestion, setTotalQuestion] = useState(0);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const onButtonClick = async (problem_id) => {
    try {
      const response = await fetch(`http://localhost:8000/problems/${problem_id}`);
      if(!response.ok) {
        throw new Error('Cannot fetch the problem');
      }
      const problemData = await response.json();
      setSelectedProblem(problemData)
      setCurrentProblem(problemData.id)
    } catch (error) {
      console.error('There was a problem with the fetch operation', error);
    }
  }

  const fetchTotalQuestions = async () => {
    try {
      const response = await fetch("http://localhost:8000/problems");
      if(!response.ok) {
        throw new Error('Cannot fetch the problem');
      }
      const allProblems = await response.json();
      setTotalQuestion(allProblems.length)
    } catch (error) {
      console.error('Error fetching the total number of problems: ', error);
    }
  }

  useEffect(() => {
    fetchTotalQuestions();
  }, []);

  const prevButton = () => {
    if(currentProblem > 1) {
      setCurrentProblem((currentProblem) => currentProblem - 1);
      onButtonClick(currentProblem - 1);
    }
  }

  const nextButton = () => {
    if(currentProblem < totalQuestion) {
      setCurrentProblem((currentProblem) => currentProblem + 1);
      onButtonClick(currentProblem + 1);
    }
  }

  return (
    <Box bg="black">
      <HStack spacing={4} height="100vh">
        {/* Left side */}
        <Box w="50%" h="100%" bg="#1e1e1e" borderRadius={10}>
          {selectedProblem ? (
                <>
                <Box display="flex" alignItems="center" justifyContent="space-around" w="100%" h="5%" bg="hsl(0, 0%, 20%)" borderTopRightRadius={10} borderTopLeftRadius={10}>
                  <Button variant="unstyledButton" onClick={prevButton}>
                    <Icon
                      dark={'https://cdn-icons-png.flaticon.com/128/2722/2722991.png'}
                      light={'https://instagram.fbkk22-1.fna.fbcdn.net/v/t1.15752-9/459072403_8229239210527017_8671075335160380401_n.png?_nc_cat=100&ccb=1-7&_nc_sid=0024fc&_nc_ohc=5y5tpm86bX0Q7kNvgGUn3zg&_nc_ht=instagram.fbkk22-1.fna&oh=03_Q7cD1QFPpegxFfGIrFYaZCA-4dB_dHmTjozt9oXfjop7-BHkeA&oe=670E596B'}
                      theme={'light'}
                      alt={'problems'}
                      width="20px"
                    />
                  </Button>
                  <Button variant="unstyledButton" onClick={() => setSelectedProblem(null)}>Problems</Button>
                  <Button variant="unstyledButton" onClick={nextButton}>
                    <Icon
                      dark={'https://cdn-icons-png.flaticon.com/128/2989/2989988.png'}
                      light={'https://scontent.xx.fbcdn.net/v/t1.15752-9/458395190_546695704699073_3255304959079640479_n.png?_nc_cat=109&ccb=1-7&_nc_sid=0024fc&_nc_ohc=Y75QnAJ35a4Q7kNvgEeyQlC&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&_nc_gid=AcIJnu4fkpFtlDTEW80YkOT&oh=03_Q7cD1QFMf4JVcfl8_gpuzwjay0-M5P2KU2MocE4Ibrz5QIcRsw&oe=670E6E3E'}
                      theme={'light'}
                      alt={'next question'}
                      width="20px"
                    />
                  </Button>
                </Box>
                <Box mt={5} ml={8} mr={8}>
                  <Box fontSize="50px" fontWeight="bold" color="white">{selectedProblem.id}. {selectedProblem.title}</Box>
                  <Box fontSize="25px" color="gray.300" mt="2">{selectedProblem.description}</Box>
                  <Box fontSize="25px" color="gray.300" mt="2">{selectedProblem.output}</Box>
                  <Box fontSize="25px" color="gray.300" mt="2">
                      Example:
                      <Box as="pre" fontSize="20px" color="gray.100" mt="2" p="4" bg="hsl(0, 0%, 20%)" borderRadius="md" overflowX="auto">
                      {Object.entries(selectedProblem.example).map(([input, output]) => (
                        <Box key={input} mb="2">
                          <Box fontWeight="bold">{input}:</Box>
                          <Box as="pre" mt="1" p="2" bg="hsl(0, 0%, 12%)" borderRadius="md" overflowX="auto">
                            {output}
                          </Box>
                        </Box>
                      ))}
                      </Box>
                  </Box>
                  <Box fontSize="25px" color="gray.300" mt="2">{selectedProblem.note}</Box>
                </Box>
                </>
              ) : (
                <>
                  <Box mt={5} ml={8} fontSize="35px" fontWeight={"bold"}>
                    <Text color="white">Question List</Text>
                  </Box>
                  <Box><hr style={{ backgroundColor: "white",  height: "2px", width: "100%" }} /></Box>
                  <Box mt={5} ml={5} mr={8}>
                    <Box><Button variant="unstyledButton" onClick={() => onButtonClick(1)}><Text fontSize={20}>1. Hello World Program</Text></Button></Box>
                    <Box><Button variant="unstyledButton" onClick={() => onButtonClick(2)}><Text fontSize={20}>2. Sum of two numbers</Text></Button></Box>
                    <Box><Button variant="unstyledButton" onClick={() => onButtonClick(3)}><Text fontSize={20}>3. Find the Largest Number</Text></Button></Box>
                    <Box><Button variant="unstyledButton" onClick={() => onButtonClick(4)}><Text fontSize={20}>4. Count Vowels in a String</Text></Button></Box>
                  </Box>
                </>
              )}
        </Box>

        {/* Right side with two sections */}
        <VStack spacing={5} w="50%" h="100%">
          {/* Upper box (Editor) with 50% height */}
          <Box w="100%" h="70%" backgroundColor={'#1e1e1e'} overflow="auto" borderRadius={10}>
            <LanguageSelector language={language} onSelect={onSelect} />
            <Editor
              height="80%"
              theme="vs-dark"
              language={language}
              defaultValue={CODE_SNIPPETS[language]}
              onMount={onMount}
              value={value}
              onChange={(value) => setValue(value)}
            />
          </Box>
          <Box w="100%" h="30%" overflow="auto" borderRadius={10}>
            <Output editorRef={editorRef} language={language} />
          </Box>
        </VStack>
      </HStack>
    </Box>
  );
};

export default CodeEditor;
