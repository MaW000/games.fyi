
import React, { useReducer} from 'react'
const NUM_COL = 7;
const NUM_ROW = 6;
const NUM_TO_WIN = 4;
export default function ConnectFour() {
    const [{board, winner, isGameOver}, dispatchBoard] = useReducer(reducer, genEmptyState())
  
    
    return (
      <>
        {winner != null && <h1>Player {winner} Wins</h1>}
        <div className="board flex">
        {board.map((colEntries, colIdx) => {
        const onClickCol = () => dispatchBoard({type: 'move', colIdx});
        return <Column key={colIdx} entries={colEntries} onClick={onClickCol}/>
        
        })}
        </div>
  
        {isGameOver && (
        <button className="p-1 text-base mt-2 rounded-lg bg-[#02203c] text-white" onClick={() => {
          dispatchBoard({type: 'restart'})
        }}>
        Restart
        </button>
        )}
      </>
    );
  }
  
  const Column = ({entries, onClick }) => (
      <div className="column flex flex-col" onClick={onClick}>
        {entries.map((entry, rowIdx) => {
          let color = entry === 1 ? "bg-blue-700":"bg-red-700"

          return (
          
            <div key={rowIdx} className="tile w-10 h-10 border-black border flex justify-center items-center ">
              {entry != null && <div className={`w-4/5 h-4/5 rounded-full player-${entry} ${color} `} />}
            </div>
          
        )})}
      </div>
  )
  
  
  function reducer(state, action) {
    switch(action.type) {
      case 'restart':
        return genEmptyState();
      case 'move':
        
       const relevantCol = state.board[action.colIdx]
      const colIsFull = relevantCol[0] != null;
      
      if(state.isGameOver || colIsFull) return state;
      const {board, currentPlayer} = state;
      const boardClone = [...board];
      const colClone = [...relevantCol];
    

      const rowIdx = colClone.lastIndexOf(null);
      colClone[rowIdx] = currentPlayer;
      boardClone[action.colIdx] = colClone;
      
      const didWinVertical = didWin({
        startRow: rowIdx,
        startCol: action.colIdx,
        rowInc: 1,
        colInc: 0,
        board: boardClone, currentPlayer
      })
      const didWinHorizontal = didWin({
        startRow: rowIdx,
        startCol: action.colIdx,
        rowInc: 0,
        colInc: 1,
        board: boardClone, currentPlayer
      })
      const didWinDiagonal = didWin({
        startRow: rowIdx,
        startCol: action.colIdx,
        rowInc: 1,
        colInc: 1,
        board: boardClone, currentPlayer
      }) ||
      didWin({startRow: rowIdx,
        startCol: action.colIdx,
        rowInc: -1,
        colInc: 1,
        board: boardClone, currentPlayer})
      const winner = didWinVertical || didWinHorizontal || didWinDiagonal ? currentPlayer : null
      const isBoardFull = boardClone.every(column => column[0] != null)
      return {
        board: boardClone,
        currentPlayer: state.currentPlayer === 1 ? 2 : 1,
        winner,
        isGameOver: winner != null || isBoardFull,
      }
      default:
        throw new Error('Unexpected action type')
    }
    
  }
  
  function genEmptyState() {
    return {
      board: new Array(NUM_COL).fill(null).map(_ => new Array(NUM_ROW).fill(null)),
      currentPlayer: 1,
      winner: null,
      isGameOver: false, 
    }
  }

  const didWin = ({startRow, startCol, rowInc, colInc, board, currentPlayer}) => {
    let numInARow= 0;
    let currRow = startRow;
    let currCol = startCol;
    
    while (currCol < NUM_COL && currRow < NUM_ROW &&
      board[currCol][currRow] === currentPlayer) {
        numInARow++;
        currRow += rowInc;
        currCol += colInc;
      }
    currRow = startRow - rowInc;
    currCol = startCol - colInc;

    while (currCol >= 0 && currRow >= 0 &&
      board[currCol][currRow] === currentPlayer) {
        numInARow++;
        currRow -= rowInc;
        currCol -= colInc;
      }
    return numInARow >= NUM_TO_WIN
  }