import styled from "styled-components";

interface inputTextProps {
  text: string;
}

const InputText: React.FC<inputTextProps> = ({ text }) => {
  return (
    <>
      <InputTextBox>{text}</InputTextBox>
    </>
  );
};
export default InputText;

const InputTextBox = styled.span`
  display: block;
  width: 60%;
  max-width: 500px;
  min-width: 200px;
  margin: 0 auto;

  @media (max-width: 500px) {
    width: 90%;
    font-size: 14px;
  }
`;
