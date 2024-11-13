import { useEffect, useState } from "react";
import PageTitle from "../components/common/pageTitle";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import FrontData from "../components/common/frontData";
import styled from "styled-components";

interface detailData {
  boardCategory: string;
  content: string;
  createdAt: string;
  id: number;
  imageUrl: string;
  title: string;
}

const BoardDetail: React.FC = () => {
  const [boardDetailData, setBoardDetailData] = useState<detailData | null>(
    null
  );
  const { id } = useParams<{ id: string }>();
  const myEmail = sessionStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/boards/${id}`);

        console.log("상세 데이터", response.data);
        setBoardDetailData(response.data);
      } catch (error) {
        console.error("상세 게시글 에러", error);
      }
    };

    fetchData();
  }, [id]);

  const handleBoardDelete = async () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      try {
        await axiosInstance.delete(`/boards/${id}`);

        alert("게시글이 삭제되었습니다.");
        navigate("/board");
      } catch (error) {
        console.error("삭제 중 에러", error);
      }
    }
  };

  const handleBoardEdit = () => {
    navigate("/board/edit", { state: { boardDetailData } });
  };

  return (
    <>
      <FrontData email={myEmail} />
      <PageTitle titleText={"상세 게시글"} />
      {boardDetailData ? (
        <BoardDetailWrapper>
          <ControlBtnBox>
            <span onClick={handleBoardEdit}>수정</span>
            <span onClick={handleBoardDelete}>삭제</span>
          </ControlBtnBox>
          <Category>{boardDetailData.boardCategory}</Category>
          <Title>{boardDetailData.title}</Title>
          {boardDetailData?.imageUrl && (
            <ImageWrapper>
              <img
                src={`https://front-mission.bigs.or.kr/${boardDetailData.imageUrl}`}
                alt="게시글 이미지"
              />
            </ImageWrapper>
          )}
          <Content>{boardDetailData.content}</Content>
          <DateBox>
            {new Date(boardDetailData.createdAt).toLocaleString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </DateBox>
        </BoardDetailWrapper>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
export default BoardDetail;

const BoardDetailWrapper = styled.div`
  width: 70%;
  max-width: 700px;
  min-width: 250px;
  margin: 0 auto 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 500px) {
    width: 90%;
  }
`;

const ControlBtnBox = styled.div`
  display: flex;
  justify-content: flex-end;

  span {
    cursor: pointer;

    &:nth-child(1) {
      margin-right: 10px;

      &:hover {
        color: #007bff;
        transition: 0.3s;
      }
    }

    &:nth-child(2) {
      &:hover {
        color: #d60000;
        transition: 0.3s;
      }
    }
  }

  @media (max-width: 500px) {
    font-size: 14px;
  }
`;

const Category = styled.p`
  font-size: 20px;
  color: #6c757d;
  margin-bottom: 10px;

  @media (max-width: 500px) {
    font-size: 16px;
  }
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;

  @media (max-width: 550px) {
    font-size: 20px;
  }

  @media (max-width: 500px) {
    font-size: 17px;
  }
`;

const ImageWrapper = styled.div`
  max-width: 100%;
  margin-bottom: 20px;
  text-align: center;

  img {
    max-width: 100%;
    height: auto;
    max-height: 500px;
    border-radius: 8px;
  }
`;

const Content = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 20px;

  @media (max-width: 550px) {
    font-size: 16px;
  }

  @media (max-width: 500px) {
    font-size: 14px;
  }
`;

const DateBox = styled.p`
  font-size: 16px;
  color: #6c757d;
  text-align: right;

  @media (max-width: 550px) {
    font-size: 14px;
  }

  @media (max-width: 500px) {
    font-size: 12px;
  }
`;
