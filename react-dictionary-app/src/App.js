import React from 'react';
import Search from './components/Search';

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>React Dictionary</h1>
        <p>Search a word to see definitions (powered by dictionaryapi.dev)</p>
      </header>

      <main className="main">
        <Search />
      </main>

      <footer className="footer">Made with ❤️</footer>
    </div>
  );
}