import styled from "styled-components";

interface TextareaProps {
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextareaBox: React.FC<TextareaProps> = ({
  placeholder,
  name,
  value,
  onChange,
}) => {
  return (
    <>
      <TextareaWrapper>
        <textarea
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
      </TextareaWrapper>
    </>
  );
};
export default TextareaBox;

const TextareaWrapper = styled.article`
  width: 60%;
  max-width: 500px;
  min-width: 200px;
  margin: 0 auto;

  @media (max-width: 500px) {
    width: 90%;
    font-size: 14px;
  }

  textarea {
    width: 100%;
    height: 200px;
    min-height: 100px;
    padding: 10px 15px;
    font-size: 16px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    outline: none;
    background-color: #f9f9f9;
    resize: none;
    transition: all 0.3s ease;

    &:focus {
      border-color: #007bff;
      background-color: #fff;
      box-shadow: 0px 4px 8px rgba(0, 123, 255, 0.2);
    }

    @media (max-width: 300px) {
      font-size: 14px;
      height: 150px;
    }
  }
`;
