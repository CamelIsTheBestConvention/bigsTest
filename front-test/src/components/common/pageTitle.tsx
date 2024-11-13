import styled from "styled-components";

interface PageTitleProps {
  titleText: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ titleText }) => {
  return (
    <>
      <Header>{titleText}</Header>
    </>
  );
};
export default PageTitle;

const Header = styled.header`
  text-align: center;
  font-size: 32px;
  padding: 20px 0;

  @media (max-width: 550px) {
    font-size: 24px;
  }

  @media (max-width: 500px) {
    font-size: 20px;
  }
`;
