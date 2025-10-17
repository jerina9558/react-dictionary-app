import React, { useState } from "react";
import "./App.css";

export default function App() {
  // Local dictionary data
  const dictionary = {
    apple: {
      word: "apple",
      partOfSpeech: "noun",
      definition: "A round fruit with red or green skin and a whitish inside.",
      example: "She ate an apple for breakfast."
    },
    book: {
      word: "book",
      partOfSpeech: "noun",
      definition: "A written or printed work consisting of pages glued or sewn together.",
      example: "He borrowed a book from the library."
    },
    computer: {
      word: "computer",
      partOfSpeech: "noun",
      definition: "An electronic device for storing and processing data.",
      example: "My computer crashed while I was working."
    },
    happy: {
      word: "happy",
      partOfSpeech: "adjective",
      definition: "Feeling or showing pleasure or contentment.",
      example: "She felt happy when she got her first job."
    },
    run: {
      word: "run",
      partOfSpeech: "verb",
      definition: "Move at a speed faster than a walk.",
      example: "He can run faster than anyone in his class."
    }
  };

  const [word, setWord] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const input = word.trim().toLowerCase();

    if (!input) {
      setError("Please enter a word.");
      setResult(null);
      return;
    }

    if (dictionary[input]) {
      setResult(dictionary[input]);
      setError("");
    } else {
      setResult(null);
      setError("Sorry, that word is not in our dictionary.");
    }
  };

  return (
    <div className="app-container">
      <h1>📘 React Dictionary App</h1>
      <p className="subtitle">Type a word to see its meaning</p>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Enter a word..."
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result-card">
          <h2>{result.word}</h2>
          <p>
            <strong>Part of Speech:</strong> {result.partOfSpeech}
          </p>
          <p>
            <strong>Definition:</strong> {result.definition}
          </p>
          <p>
            <strong>Example:</strong> “{result.example}”
          </p>
        </div>
      )}
    </div>
  );
}
