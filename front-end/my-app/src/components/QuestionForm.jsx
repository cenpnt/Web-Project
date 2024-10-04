import { useState } from "react";
import { Box, Button, Input, Textarea, FormControl, FormLabel } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";

const AddQuestionForm = ({ onCancel, onSuccess, currentLevel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [inputExample, setInputExample] = useState("");
  const [outputExample, setOutputExample] = useState("");
  const [note, setNote] = useState("");
  const [level, setLevel] = useState(currentLevel || "");
  const { internetIPAddress } = useAuth();

  const token = localStorage.getItem("access_token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newQuestion = {
      title,
      description,
      example: {
        input: inputExample,
        output: outputExample
      },
      note,
      level
    };
    try {
        const response = await fetch(`${internetIPAddress}create_problems`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(newQuestion)
        });
        if(!response.ok) {
            throw new Error('Failed to create the problem');
        }
        const createdQuestion = await response.json();
        if(onSuccess) {
          onSuccess(createdQuestion);
        }
        setTitle("");
        setDescription("");
        setInputExample("");
        setOutputExample("");
        setNote("");
        setLevel(currentLevel || "");
        if(onCancel) {
          onCancel();
        }
    } catch (error) {
        console.error("Error creating new problem: ", error.message);
    }
  };

  return (
    <Box p={5}  borderRadius="md" boxShadow="md" color="white">
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel htmlFor="title" color="white">Title</FormLabel>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter question title"
            bg="gray.700"
            color="white"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel htmlFor="description" color="white">Description</FormLabel>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter question description"
            bg="gray.700"
            color="white"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel htmlFor="inputExample" color="white">Example Input</FormLabel>
          <Input
            id="inputExample"
            value={inputExample}
            onChange={(e) => setInputExample(e.target.value)}
            placeholder="Enter example input"
            bg="gray.700"
            color="white"
          />
        </FormControl>
        <FormControl mb={2}>
          <FormLabel htmlFor="outputExample" color="white">Example Output</FormLabel>
          <Input
            id="outputExample"
            value={outputExample}
            onChange={(e) => setOutputExample(e.target.value)}
            placeholder="Enter example output"
            bg="gray.700"
            color="white"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel htmlFor="note" color="white">Note</FormLabel>
          <Textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Enter any additional notes"
            bg="gray.700"
            color="white"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel htmlFor="level" color="white">Level</FormLabel>
          <Textarea
            id="level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            placeholder="Enter level"
            bg="gray.700"
            color="white"
          />
        </FormControl>
        <Box display="flex">
          <Button type="submit" colorScheme="green" mr={3}>
            Add Question
          </Button>
          <Button type="button" onClick={onCancel}>
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddQuestionForm;
