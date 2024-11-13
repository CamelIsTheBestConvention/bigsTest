import styled from "styled-components";

interface BtnProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  btnText: string;
  disabled?: boolean;
}

const Button: React.FC<BtnProps> = ({ onClick, btnText, disabled }) => {
  return (
    <>
      <Btn onClick={onClick} disabled={disabled}>
        {btnText}
      </Btn>
    </>
  );
};
export default Button;

const Btn = styled.button`
  display: block;
  width: 60%;
  max-width: 500px;
  min-width: 200px;
  margin: 30px auto;
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  color: white;
  background-color: #007bff;

  @media (max-width: 500px) {
    width: 90%;
    font-size: 14px;
  }

  &:hover {
    cursor: pointer;
    background-color: #0058b6;
    box-shadow: 0px 4px 8px rgba(0, 123, 255, 0.2);
  }

  &:active {
    background-color: #0972e2;
    box-shadow: 0px 4px 8px rgba(0, 123, 255, 0.2);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    box-shadow: none;
  }
`;
