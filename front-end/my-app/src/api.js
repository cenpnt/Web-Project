import { LANGUAGE_VERSIONS } from "./constants";

export const executeCode = async (language, sourceCode) => {
    try {
        const response = await fetch("https://emkc.org/api/v2/piston/execute", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                language: language,
                version: LANGUAGE_VERSIONS[language],
                files: [
                    {
                        content: sourceCode,
                    },
                ],
            }),
          })

          if(!response.ok) {
            throw new Error("Failed to execute code");
          }

          const data = await response.json();
          return data;
    } catch (error) {
        console.error("Error executing code: ", error);
    }
};
