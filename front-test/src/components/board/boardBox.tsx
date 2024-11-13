import styled from "styled-components";

interface BoardBoxProps {
  category: string;
  title: string;
  createdAt: string;
  onClick: () => void;
}

const BoardBox: React.FC<BoardBoxProps> = ({
  category,
  title,
  createdAt,
  onClick,
}) => {
  return (
    <>
      <BoardBoxWrapper onClick={onClick}>
        <div>
          <p>{category}</p>
          <p>{createdAt}</p>
        </div>
        <p>{title}</p>
      </BoardBoxWrapper>
    </>
  );
};
export default BoardBox;

const BoardBoxWrapper = styled.div`
  width: 60%;
  max-width: 600px;
  min-width: 280px;
  margin: 10px auto;
  border-radius: 10px;
  background-color: #f0faff;
  padding: 15px 10px;
  transition: transform 0.3s ease, background-color 0.3s ease;

  @media (max-width: 500px) {
    width: 90%;
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    background-color: #e0f0ff;
  }

  div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    p {
      font-size: 16px;
      line-height: 1;
      font-weight: bold;
    }
  }

  p {
    font-size: 1.5rem;
  }

  @media (max-width: 550px) {
    div {
      p {
        font-size: 14px;
      }
    }

    p {
      font-size: 1.2rem;
    }
  }
`;
