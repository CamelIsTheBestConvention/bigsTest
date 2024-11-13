import styled from "styled-components";

interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox: React.FC<InputProps> = ({
  type,
  placeholder,
  name,
  value,
  onChange,
}) => {
  return (
    <>
      <InputWrapper
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </>
  );
};
export default InputBox;

const InputWrapper = styled.input`
  width: 60%;
  max-width: 500px;
  min-width: 200px;
  padding: 10px 15px;
  font-size: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  outline: none;
  transition: all 0.3s ease;
  background-color: #f9f9f9;
  display: block;
  margin: 10px auto;

  &:focus {
    border-color: #007bff;
    background-color: #fff;
    box-shadow: 0px 4px 8px rgba(0, 123, 255, 0.2);
  }

  @media (max-width: 500px) {
    width: 90%;
    font-size: 14px;
  }
`;
