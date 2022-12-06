import React, { useEffect, useState } from "react";
import "./App.css";
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: import.meta.env.VITE_ORGANIZATION,
  apiKey: import.meta.env.VITE_API_KEY,
});
const openai = new OpenAIApi(configuration);

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState([]);
  const [chat, setChat] = useState([]);

  function updateQuestion(element) {
    setQuestion(element.target.value);
  }
  function makeQuestion() {
    openai
      .createCompletion({
        model: "text-davinci-003",
        prompt: question,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then((response) => {
        setChat((chat) => [...chat, question, response.data.choices[0].text]);
      })
      setQuestion('')
  }

  return (
    <div className="App">
      <h1>CHATGPT - AI</h1>
      <div>
        <input
          type="text"
          style={{
            height: "60px",
            width: "500px",
            marginBottom: "20px",
            padding: "10px",
            marginRight: "10px",
            fontSize: "1.5em",
          }}
          value={question}
          onChange={updateQuestion}
          onKeyDown={ (e) => e.key === "Enter" ? makeQuestion() : null}
        />
        <button
          style={{ height: "84px", fontSize: "1.5em", fontWeight: "bold" }}
          onClick={makeQuestion}
        >
          &rarr;
        </button>
      </div>
      <div
        style={{
          width: "70vw",
          minHeight: "20vh",
          background: "#4b4b4b",
          border: "1px solid black",
          textAlign: "start",
          padding: "20px",
          borderRadius: "15px",
          // overflow: "scroll",
          // overflow: "hidden",
          fontSize: "1.1em"
        }}
      >
        {chat.map((e, y) =>
          y % 2 ? (
            <div>
              {" "}
              <span key={y}>AI: {e}</span> <br />{" "}
            </div>
          ) : (
            <div>
              {" "}
              <span key={y}>You: {e}</span> <br />{" "}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;
