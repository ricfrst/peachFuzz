"use client";

import { useState, useEffect } from "react";
//
interface Game {
  id: number;
  name: string;
  released: string;
  background_image: string;
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState(""); // Stores user input
  const [games, setGames] = useState<Game[]>([]); // Stores fetched game data

  const API_KEY = process.env.NEXT_PUBLIC_KEE; // Replace this with your actual API key

  // Function to fetch games when the search term changes
  useEffect(() => {
    if (searchTerm.length > 2) {
      // Only fetch if search term is 3+ characters
      fetch(`https://api.rawg.io/api/games?key=${API_KEY}&search=${searchTerm}`)
          .then((response) => response.json())
          .then((data) => {
            setGames(data.results || []); // Store the games in state
          })
          .catch((error) => console.error("Error fetching data:", error));
    }
  }, [searchTerm]); // Runs whenever searchTerm changes

  return (
      <>
        <main style={{ textAlign: "center", marginTop: "50px" }}>
          <h1>Welcome to PeachFuzz!</h1>
          <p>Search for your favorite games and discover new ones.</p>

          {/* Search Bar */}
          <input
              type="text"
              placeholder="Search for a game..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: "10px",
                width: "300px",
                fontSize: "16px",
                marginTop: "20px",
              }}
          />
          {/* Display Search Results */}
          <div style={{ marginTop: "20px" }}>
            {games.length > 0 ? (
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {games.map((game) => (
                      <li key={game.id} style={{ marginBottom: "10px" }} className="flex flex-col items-center pb-8">
                        <strong>{game.name}</strong> (Released: {game.released})
                        <br />
                        <img
                            className="border-white border rounded-md"
                            src={game.background_image}
                            alt={game.name}
                            width="200"
                        />
                      </li>
                  ))}
                </ul>
            ) : (
                searchTerm.length > 2 && <p>No games found.</p>
            )}
          </div>
        </main>
      </>
  );
}
