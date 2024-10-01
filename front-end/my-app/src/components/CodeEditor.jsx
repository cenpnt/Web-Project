import React from 'react';
import { useEffect, useRef, useState } from "react";
import { Box, HStack, VStack, Button, Text, Grid } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";
import Icon from "./icon/Icon";
import AddQuestionForm from "./QuestionForm";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [selectedProblem, setSelectedProblem] = useState(null);   // When select a problem it will render that problem (title, description, ...)
  const [currentProblemIndex, setCurrentProblemIndex] = useState(null);  // Keep track of the current problem to check whether user can go to the next question or prev question
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [problems, setProblems] = useState([]);   // Collect all problems inside an array for index access
  const [solvedStatus, setSolvedStatus] = useState([]);   // Solved status for each problem in problems arr
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const token = localStorage.getItem('access_token');

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

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const onSelectProblem = async (index) => {
    if (index < 0 || index >= problems.length) {
      console.error("Index out of bounds");
      return;
    }
    
    const problem_id = problems[index]?.id; // Safely access problem.id
    if (!problem_id) {
      console.error("Problem ID is undefined");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8000/problems/${problem_id}`);
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
      const response = await fetch("http://localhost:8000/problems");
      if (!response.ok) {
        throw new Error('Cannot fetch the problems');
      }
      const allProblems = await response.json();
      setTotalQuestion(allProblems.length);
      setProblems(allProblems);
    } catch (error) {
      console.error('Error fetching the problems:', error);
    }
  }

  const fetchSolvedProblems = async () => {
    const user_id = localStorage.getItem('userID');
    try {
      const response = await fetch("http://localhost:8000/all_solved_problem");
      if(!response.ok) {
        throw new Error('Cannot fetch solved problems');
      }
      const allSolvedProblems = await response.json();
      setSolvedStatus(
        problems.map(problem =>
          allSolvedProblems.some(solved => solved.problem_id === problem.id && solved.user_id === parseInt(user_id))
        )
      );
    } catch (error) {
      console.error('Error fetching solved problems: ', error);
    }
  }
  
  const prevButton = () => {
    if (currentProblemIndex > 0) {
      onSelectProblem(currentProblemIndex - 1);
    }
  }

  const nextButton = () => {
    if (currentProblemIndex < totalQuestion - 1) {
      onSelectProblem(currentProblemIndex + 1);
    }
  }

  const addQuestion = () => {
    setShowForm(true);
  };

  const cancelAddQuestion = () => {
    setShowForm(false);
  }

  const deleteQuestion = async (problem_id) => {
    try {
      const response = await fetch(`http://localhost:8000/problems/${problem_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      if(!response.ok) {
        throw new Error('Failed to delete the problem')
      }
      // Update state after successful deletion
      setProblems(prevProblems => prevProblems.filter(problem => problem.id !== problem_id));
      // Reset the selected problem if it was deleted
      if (selectedProblem && selectedProblem.id === problem_id) {
        setSelectedProblem(null);
        setCurrentProblemIndex(null);
      }
    } catch (error) {
      console.error("Error deleting problem", error);
    }
  }

  const newQuestionAdded = () => {   // Update state when new question added
    fetchProblems();
  }

  const onDoneButtonClick = async (index) => {
    const user_id = localStorage.getItem('userID');
    const problem_id = problems[index]?.id;
    if(!user_id || !problem_id) {
      console.error("User ID or Problem ID is undefined");
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/solved_problem', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id,
          problem_id
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
                </>
              ) : (
                <>
                  <Box mt={5} ml={8} fontSize="35px" fontWeight={"bold"}>
                    <Text color="white">Problem List</Text>
                  </Box>
                  <Box><hr style={{ backgroundColor: "white",  height: "2px", width: "100%" }} /></Box>
                  <Grid templateColumns="repeat(3, 1fr)" gap={4} mt={5} ml={5} mr={8}>
                    {problems.map((problem, index) => (
                      <React.Fragment key={index}>
                        <Box display="flex" alignItems="center" justifyContent="start">
                          <Button variant="unstyledButton" onClick={() => onSelectProblem(index)}>
                            <Text fontSize={20} color={solvedStatus[index] ? "hsl(149, 50%, 50%)" : "white"}>{index + 1}. {problem.title}</Text>
                          </Button>
                        </Box>
                          <Box display="flex" alignItems="center" justifyContent="center">
                            { isAdmin && (<Button variant="unstyledButton" onClick={() => deleteQuestion(problem.id)} textAlign="center" color="#e1403f" _hover={{ color: "hsl(0, 73%, 45%)" }}>- Delete Question</Button>)}
                          </Box>
                        <Box display="flex" alignItems="center" justifyContent="center">
                          { !solvedStatus[index] && <Button onClick={() => onDoneButtonClick(index)}>Done</Button> }
                        </Box>
                      </React.Fragment>
                    ))}
                  </Grid>
                  <Box display={"flex"} justifyContent={"flex-start"} ml={8} mr={8}>
                    { isAdmin && (<Box><Button variant="unstyledButton" onClick={addQuestion} color="#36a16a" _hover={{ color: "hsl(149, 50%, 30%)" }}>+ Add Question</Button></Box>) }
                  </Box>
                </>
              )}
              {showForm && <AddQuestionForm onCancel={cancelAddQuestion} onSuccess={newQuestionAdded}/>}
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
