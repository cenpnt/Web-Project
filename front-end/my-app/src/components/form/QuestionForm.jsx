import { useState } from "react";
import { Box, Button, Input, Textarea, FormControl, FormLabel } from "@chakra-ui/react";

const AddQuestionForm = ({ onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [inputExample, setInputExample] = useState("");
  const [outputExample, setOutputExample] = useState("");
  const [note, setNote] = useState("");

  const token = localStorage.getItem("access_token");
  console.log("Token:", token);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newQuestion = {
      title,
      description,
      example: {
        input: inputExample,
        output: outputExample
      },
      note
    };
    try {
        const response = await fetch("http://localhost:8000/create_problems", {
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
        const data = await response.json();
        setTitle("");
        setDescription("");
        setInputExample("");
        setOutputExample("");
        setNote("");
        onCancel();
    } catch (error) {
        console.error("Error creating new problem: ", error.message);
    }
  };

  return (
    <Box p={5} bg="#2d2d2d" borderRadius="md" boxShadow="md" color="white">
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel htmlFor="title">Title</FormLabel>
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
          <FormLabel htmlFor="description">Description</FormLabel>
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
          <FormLabel htmlFor="inputExample">Example Input</FormLabel>
          <Input
            id="inputExample"
            value={inputExample}
            onChange={(e) => setInputExample(e.target.value)}
            placeholder="Enter example input"
            bg="gray.700"
            color="white"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel htmlFor="outputExample">Example Output</FormLabel>
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
          <FormLabel htmlFor="note">Note</FormLabel>
          <Textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Enter any additional notes"
            bg="gray.700"
            color="white"
          />
        </FormControl>
        <Button type="submit" colorScheme="teal" mr={3}>
          Add Question
        </Button>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
      </form>
    </Box>
  );
};

export default AddQuestionForm;
