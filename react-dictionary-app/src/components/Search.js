import React, { useState } from 'react';

export default function Search() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSearch(e) {
    e.preventDefault();
    const word = query.trim();
    if (!word) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
      if (!res.ok) {
        if (res.status === 404) throw new Error('Word not found');
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="search-card">
      <form onSubmit={handleSearch} className="search-form">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a word (e.g. example)"
          aria-label="Search word"
        />
        <button type="submit">Search</button>
      </form>

      <section className="status">
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
      </section>

      {result && (
        <section className="results">
          {result.map((entry, idx) => (
            <article key={idx} className="entry">
              <h2>{entry.word} <small>{entry.phonetic}</small></h2>

              {entry.meanings.map((meaning, mIdx) => (
                <div key={mIdx} className="meaning">
                  <h3>{meaning.partOfSpeech}</h3>
                  <ol>
                    {meaning.definitions.map((d, dIdx) => (
                      <li key={dIdx}>
                        <p>{d.definition}</p>
                        {d.example && <blockquote>"{d.example}"</blockquote>}
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </article>
          ))}
        </section>
      )}
    </div>
  );
}