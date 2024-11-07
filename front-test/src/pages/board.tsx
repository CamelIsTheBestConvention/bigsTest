import { useState } from "react";

interface boardsData {
  title: string;
  content: string;
  category: string;
}

const Board: React.FC = () => {
  const [boards, setBoards] = useState<boardsData[]>([]);

  return (
    <>
      <header>게시판</header>
      <main>
        <div></div>
      </main>
    </>
  );
};
export default Board;
