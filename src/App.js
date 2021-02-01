import React, { useState, useEffect } from "react";

const SIZE = 50;

const getNeighbours = (board, row, col) => {
  let res = 0;
  for (
    let i = Math.max(row - 1, 0);
    i <= Math.min(row + 1, board.length - 1);
    i++
  ) {
    for (
      let j = Math.max(col - 1, 0);
      j <= Math.min(col + 1, board.length - 1);
      j++
    ) {
      (i !== row || j !== col) && (res += board[i][j]);
    }
  }
  return res;
};

const populate = () => {
  let res = new Array(SIZE).fill(0).map(() => new Array(SIZE).fill(0));
  res[3][2] = 1;
  res[3][3] = 1;
  res[3][4] = 1;
  res[2][4] = 1;
  res[1][3] = 1;
  return res;
};

export default function App() {
  const [board, setBoard] = useState(populate());

  useEffect(() => {
    let intervalId = setInterval(() => {
      let temp = board.map((row) => row.slice());
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
          const numNeighbours = getNeighbours(board, i, j);
          if (board[i][j]) {
            if (numNeighbours !== 2 && numNeighbours !== 3) {
              // console.log("kill: ", i, j);
              temp[i][j] = 0;
            }
          } else {
            if (numNeighbours === 3) {
              // console.log("spawn: ", i, j);
              temp[i][j] = 1;
            }
          }
        }
      }
      setBoard(temp);
    }, 500);
    return () => clearInterval(intervalId);
  }, [board]);

  return (
    <div className="App">
      {board.map((row) => {
        return (
          <div style={{ display: "flex" }}>
            {row.map((cell, index) => (
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  background: !cell ? "gray" : "green",
                  border: "1px solid black"
                }}
              ></div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
