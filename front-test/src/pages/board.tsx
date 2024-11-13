import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/common/pageTitle";
import styled from "styled-components";
import axiosInstance from "../api/axiosInstance";
import BoardBox from "../components/board/boardBox";
import FrontData from "../components/common/frontData";
import CategoryBox from "../components/board/categoryBox";

interface boardsData {
  id: number;
  title: string;
  createdAt: string;
  category: string;
}

const Board: React.FC = () => {
  const [boards, setBoards] = useState<boardsData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [filteredBoards, setFilteredBoards] = useState<boardsData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const pageSize = 5;
  const pageGroupSize = 5;
  const token = sessionStorage.getItem("accessToken");
  const myEmail = sessionStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await axiosInstance.get(
          `/boards?page=${currentPage}&size=${pageSize}`
        );

        console.log("게시글 데이터", response.data);
        setBoards(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.log("게시글 조회 중 에러", error);
      }
    };

    fetchBoardData();
  }, [currentPage, selectedCategory]);

  useEffect(() => {
    console.log("현재 boards", boards);
    console.log("선택된 카테고리", selectedCategory);

    const filtered =
      selectedCategory === "전체"
        ? boards
        : boards.filter((board) => board.category === selectedCategory);

    setFilteredBoards(filtered);
    console.log("필터 확인", filtered);
  }, [boards, selectedCategory]);

  const handleWrite = () => {
    navigate("/write");
  };

  const handleBoardDetail = (id: number) => {
    navigate(`/board/${id}`);
  };

  const handlePageClick = (pageNumber: number) => {
    console.log("Clicked Page:", pageNumber);
    setCurrentPage(pageNumber);
  };

  const startPage = Math.floor(currentPage / pageGroupSize) * pageGroupSize;
  const endPage = Math.min(startPage + pageGroupSize, totalPages);

  return (
    <>
      <FrontData email={myEmail} />
      <PageTitle titleText="게시판" />
      <main>
        <OptionBox>
          <div>
            <CategoryBox
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          <span onClick={handleWrite}>게시글 등록</span>
        </OptionBox>
        {filteredBoards.length > 0 && (
          <PageCount>{currentPage + 1} 페이지</PageCount>
        )}
        <div>
          {filteredBoards.length > 0 ? (
            filteredBoards.map((board) => (
              <BoardBox
                key={board.id}
                category={board.category}
                title={board.title}
                createdAt={new Date(board.createdAt).toLocaleString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
                onClick={() => handleBoardDetail(board.id)}
              />
            ))
          ) : (
            <NoBoard>
              <p>📃</p>
              <p>게시글이 없습니다.</p>
            </NoBoard>
          )}
        </div>
        {filteredBoards.length > 0 && (
          <Pagination>
            <button
              onClick={() => setCurrentPage(startPage - pageGroupSize)}
              disabled={startPage === 0}
            >
              &lt;&lt;
            </button>
            {Array.from({ length: endPage - startPage }, (_, i) => (
              <button
                key={startPage + i}
                onClick={() => handlePageClick(startPage + i)}
                disabled={startPage + i === currentPage}
              >
                {startPage + i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(startPage + pageGroupSize)}
              disabled={endPage >= totalPages}
            >
              &gt;&gt;
            </button>
          </Pagination>
        )}
      </main>
    </>
  );
};
export default Board;

const OptionBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;
  max-width: 600px;
  min-width: 280px;
  margin: 20px auto;

  @media (max-width: 500px) {
    width: 90%;
  }

  span {
    cursor: pointer;
    line-height: 2;

    &:hover {
      color: #007bff;
      font-size: 17px;
    }

    @media (max-width: 550px) {
      font-size: 14px;

      &:hover {
        color: #007bff;
        font-size: 15px;
      }
    }

    @media (max-width: 500px) {
      font-size: 12px;

      &:hover {
        color: #007bff;
        font-size: 13px;
      }
    }
  }
`;

const PageCount = styled.div`
  width: 60%;
  max-width: 600px;
  min-width: 280px;
  margin: 10px auto;
  font-weight: bold;

  @media (max-width: 500px) {
    width: 90%;
  }
`;

const NoBoard = styled.div`
  width: 50%;
  margin: 0 auto;
  padding: 10% 0;
  text-align: center;

  p {
    &:nth-child(1) {
      font-size: 48px;
    }
    &:nth-child(2) {
      margin-top: 20px;
      font-size: 24px;
    }
  }

  @media (max-width: 500px) {
    p {
      &:nth-child(1) {
        font-size: 32px;
      }
      &:nth-child(2) {
        font-size: 16px;
      }
    }
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;

  button {
    margin: 0 5px;
    padding: 5px 10px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;

    &:disabled {
      background-color: #ddd;
      cursor: not-allowed;
    }

    @media (max-width: 460px) {
      font-size: 14px;
    }
  }

  span {
    margin: 0 10px;
    font-size: 18px;
  }
`;
