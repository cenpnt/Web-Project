import React from 'react';
import { useEffect, useRef, useState } from "react";
import { Box, HStack, VStack, Button, Text, Grid, Modal, ModalOverlay, ModalContent, ModalBody, useDisclosure } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";
import Icon from "./icon/Icon";
import AddQuestionForm from "./QuestionForm";
import { ArrowBackIcon} from '@chakra-ui/icons';
import { useAuth } from '../context/AuthContext';
import { FaStar } from "react-icons/fa6";
import { useLocation } from 'react-router-dom';

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [selectedProblem, setSelectedProblem] = useState(null);   // When select a problem it will render that problem (title, description, ...)
  const [currentProblemIndex, setCurrentProblemIndex] = useState(null);  // Keep track of the current problem to check whether user can go to the next question or prev question
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [problems, setProblems] = useState([]);   // Collect all problems inside an array for index access
  const [solvedStatus, setSolvedStatus] = useState([]);   // Solved status for each problem in problems arr
  const [levels, setLevels] = useState([]);
  const [isLevelSelected, setIsLevelSelected] = useState(null);
  const [currentLevel, setCurrentLevel] = useState("");
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const token = localStorage.getItem('access_token');
  const [filteredProblems, setFilteredProblems] = useState([]);
  const { internetIPAddress } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  
  const checkLevelQuery = () => {
    const queryParam = new URLSearchParams(location.search)
    const levelFromQuery = queryParam.get('level');
    if(levelFromQuery) {
      changePage(levelFromQuery);
    }
  }
  
  useEffect(() => {
    const fetchData = async () => {
      await fetchProblems();
    };
  
    fetchData();
  }, []);
  
  useEffect(() => {
    if (problems.length > 0) {
      fetchSolvedProblems();
    }
  }, [problems]);

  useEffect(() => {
    if (problems.length > 0) {
      checkLevelQuery();
    }
  }, [JSON.stringify(problems)]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const onSelectProblem = async (index) => {
    if (index < 0 || index >= filteredProblems.length) {
      console.error("Index out of bounds");
      return;
    }
    
    const problem_id = filteredProblems[index]?.id; // Safely access problem.id
    if (!problem_id) {
      console.error("Problem ID is undefined");
      return;
    }
  
    try {
      const response = await fetch(`${internetIPAddress}problems/${problem_id}`);
      if (!response.ok) {
        throw new Error('Cannot fetch the problem');
      }
      const problemData = await response.json();
      setSelectedProblem(problemData);
      setCurrentProblemIndex(index);
    } catch (error) {
      console.error('There was a problem with the fetch operation', error);
    }
  }

  const fetchProblems = async () => {
    try {
      const response = await fetch(`${internetIPAddress}problems`);
      if (!response.ok) {
        throw new Error('Cannot fetch the problems');
      }
      const allProblems = await response.json();
      setTotalQuestion(allProblems.length);
      setProblems(allProblems);
      const levels = allProblems.map(problem => problem.level);
      const uniqueLevels = [...new Set(levels)];
      setLevels(uniqueLevels);
    } catch (error) {
      console.error('Error fetching the problems:', error);
    }
  }

  const fetchSolvedProblems = async () => {
    const user_id = localStorage.getItem('userID');
    try {
      const response = await fetch(`${internetIPAddress}all_solved_problem`);
      if(!response.ok) {
        throw new Error('Cannot fetch solved problems');
      }
      const allSolvedProblems = await response.json();
      const filterAllsolvedProblems = allSolvedProblems.filter(solvedProblem => solvedProblem.level === currentLevel);
      setSolvedStatus(
        filteredProblems.map(problem =>
          filterAllsolvedProblems.some(solved => solved.problem_id === problem.id && solved.user_id === parseInt(user_id))
        )
      );
    } catch (error) {
      console.error('Error fetching solved problems: ', error);
    }
  }
  
  const prevButton = () => {
    if (currentProblemIndex > 0) {
      onSelectProblem(currentProblemIndex - 1);
      setValue(CODE_SNIPPETS[language]);
      setLanguage(language);
    }
  }

  const nextButton = () => {
    if (currentProblemIndex < totalQuestion - 1) {
      onSelectProblem(currentProblemIndex + 1);
      setValue(CODE_SNIPPETS[language]);
      setLanguage(language);
    }
  }

  const addQuestion = () => {
    onOpen();
  };

  const cancelAddQuestion = () => {
    onClose();
  }

  const deleteQuestion = async (problem_id) => {
    try {
      const response = await fetch(`${internetIPAddress}problems/${problem_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      if(!response.ok) {
        throw new Error('Failed to delete the problem')
      }
      // Update both problems and filteredProblems states
      setProblems(prevProblems => {
        const updatedProblems = prevProblems.filter(problem => problem.id !== problem_id);
        setFilteredProblems(updatedProblems.filter(problem => problem.level === currentLevel));
        return updatedProblems;
      });
      // Reset the selected problem if it was deleted
      if (selectedProblem && selectedProblem.id === problem_id) {
        setSelectedProblem(null);
        setCurrentProblemIndex(null);
      }
    } catch (error) {
      console.error("Error deleting problem", error);
    }
  };

  const newQuestionAdded = (newQuestion) => {
    setProblems(prevProblems => [...prevProblems, newQuestion]);
    if (currentLevel === newQuestion.level) {
      setFilteredProblems(prevFiltered => [...prevFiltered, newQuestion]);
    }
    setTotalQuestion(prev => prev + 1);
    if (currentLevel) {
      const filtered = [...problems, newQuestion].filter(problem => problem.level === currentLevel);
      setFilteredProblems(filtered);
    }
    onClose();
  };
  
  const onDoneButtonClick = async (index) => {
    const user_id = localStorage.getItem('userID');
    const problem_id = filteredProblems[index]?.id;
    if(!user_id || !problem_id) {
      console.error("User ID or Problem ID is undefined");
      return;
    }

    try {
      const response = await fetch(`${internetIPAddress}solved_problem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id,
          problem_id,
          level: currentLevel
        })
      })

      if(!response.ok) {
        throw new Error('Failed to mark problem as solved');
      }
      setSolvedStatus(prev => {
        const newStatus = [...prev];
        newStatus[index] = true;
        return newStatus
      });
    } catch (error) {
      console.error("Error marking problem as solved ", error);
    }
  }

  const changePage = async (level) => {
    const filtered = problems.filter(problem => problem.level === level);
    setCurrentLevel(level);
    setFilteredProblems(filtered);
    setIsLevelSelected(true);
    await fetchProblems();
  }
  
  const pageSelection = () => {
    if (selectedProblem && isLevelSelected) {
      return (<>
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
          <Box fontSize="50px" fontWeight="bold" color="white">{currentProblemIndex + 1}. {selectedProblem.title}</Box>
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
        </>);
    } else if (isLevelSelected) {
        return(<>
          <Box mt={5} ml={3} fontSize="35px" fontWeight={"bold"} display="flex">
            <Box mr={3} display="flex" alignItems="center">
                <Button onClick={() => setIsLevelSelected(false)} bg="#1e1e1e" color="white" _hover={{}} _active={{}}>
                  <ArrowBackIcon w={8} h={8}/>
                </Button>
            </Box>
            <Box color="white">Problem List</Box>
          </Box>
          <Box><hr style={{ backgroundColor: "white",  height: "2px", width: "100%" }} /></Box>
          <Grid templateColumns="repeat(3, 1fr)" gap={4} mt={5} ml={5} mr={8} key={filteredProblems.length}>
            
            {filteredProblems.map((problem, index) => (
              <React.Fragment key={problem.id}>
                <Box display="flex" alignItems="center" justifyContent="start">
                  <Button variant="unstyledButton" onClick={() => onSelectProblem(index)}>
                    <Text fontSize={20} color={solvedStatus[index] ? "hsl(149, 50%, 50%)" : "white"}>{index + 1}. {problem.title}</Text>
                  </Button>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="center">
                  { isAdmin && (<Button variant="unstyledButton" onClick={() => deleteQuestion(problem.id)} textAlign="center" color="#e1403f" _hover={{ color: "hsl(0, 73%, 45%)" }}><Box>- Delete Question</Box></Button>)}
                </Box>
                <Box display="flex" alignItems="center" justifyContent="center">
                  { !solvedStatus[index] && <Button onClick={() => onDoneButtonClick(index)}>Done</Button> }
                </Box>
              </React.Fragment>
            ))}
          </Grid>
          <Box display={"flex"} justifyContent={"flex-start"} ml={8} mr={8}>
            { isAdmin && (<Box><Button variant="unstyledButton" onClick={addQuestion} color="#36a16a" _hover={{ color: "hsl(149, 50%, 30%)" }}><Box>+ Add Question</Box></Button></Box>) }
          </Box>
        </>);
    } else {
      return (
        <>
          <Box mt={5} fontSize="40px" fontWeight={"bold"}>
            <Box color={"white"} ml={8}>Difficulty Level</Box>
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" gap={5} mt={5}>
  {levels
    .sort((a, b) => {
      const order = ["Easy", "Medium", "Hard"];
      return order.indexOf(a) - order.indexOf(b);
    })
    .map((level) => {
      // Determine the number of images based on the level
      const imageCount = level === "Easy" ? 1 : level === "Medium" ? 2 : 3;

      return (
        <Button
          key={level}
          onClick={() => changePage(level)}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="250px"
          height="400px"
          border="1px solid"
          borderColor={level === "Medium" ? "#EAB740" : level === "Hard" ? "red" : "hsl(149, 50%, 30%)"}
          borderRadius="15px"
          padding={5}
          boxShadow="0 4px 10px rgba(0, 0, 0, 0.1)"
          bg="white"
          transition="all 0.3s ease"
          _hover={{backgroundColor: "#F2F3F2", boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)", cursor: "pointer" }}
          variant="unstyled"
        >
            <Box
              fontSize="20px"
              color={level === "Medium" ? "#EAB740" : level === "Hard" ? "red" : "hsl(149, 50%, 30%)"}
            
              fontWeight="bold"
            >
              {level}
            </Box>
          {/* </Box> */}

          {/* Render the correct number of images */}
          <Box display="flex" justifyContent="center" alignItems="center" gap={2} mt={7}>
            {[...Array(imageCount)].map((_, index) => (
              <FaStar color='#FED000' />
            ))}
          </Box>
{/* 
          <Box textAlign="center" mt={4} color="gray.500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Box> */}
        </Button>
      );
    })}
</Box>


        </>
      );
    }
  }

  return (
    <Box bg="black" h={"100vh"} w="100vw" overflow="auto">
      <HStack spacing={4} height="100vh"  w="100%" >
        {/* Left side */}
        <Box w="50%" h="100%" bg="#1e1e1e" borderRadius={10}>
              {pageSelection()}
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent maxW="90%" bg="#1e1e1e">
                  <ModalBody>
                    <AddQuestionForm onCancel={cancelAddQuestion} onSuccess={newQuestionAdded} currentLevel={currentLevel} />
                  </ModalBody>
                </ModalContent>
              </Modal>
        </Box>

        {/* Right side with two sections */}
        <VStack spacing={5} w="50%" h="100%">
          {/* Upper box (Editor) with 50% height */}
          <Box w="100%" h="70%" backgroundColor={'#1e1e1e'} overflow="hidden" borderRadius={10}>
            <LanguageSelector language={language} onSelect={onSelect} />
            <Editor
              height="100%"
              theme="vs-dark"
              language={language}
              defaultValue={CODE_SNIPPETS[language]}
              onMount={onMount}
              value={value}
              onChange={(value) => setValue(value)}
            />
          </Box>
          <Box w="100%" h="30%" overflow="hidden" borderRadius={10}>
            <Output editorRef={editorRef} language={language} />
          </Box>
        </VStack>
      </HStack>
    </Box>
  );
};

export default CodeEditor;
