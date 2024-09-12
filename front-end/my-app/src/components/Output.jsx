import { Box, Button } from "@chakra-ui/react";
import { executeCode } from "../api";
import { useState } from "react";

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output);
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box w="50%">
      <Box mb={2} fontSize="lg">
        Output
      </Box>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        onClick={runCode}
        isLoading={isLoading}
      >
        Run Code
      </Button>
      <Box
        height="75vh"
        p={2}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
        color={isError ? "red.400" : ""}
      >
        {output
          ? output
              .split('\n')
              .map((line, i) => (
                <Box key={i}>
                  {line}
                </Box>
              ))
          : 'Click "Run Code" to see the output here'}
      </Box>
    </Box>
  );
};

export default Output;
