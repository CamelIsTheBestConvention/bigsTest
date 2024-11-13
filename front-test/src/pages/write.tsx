import { useState } from "react";
import PageTitle from "../components/common/pageTitle";
import InputBox from "../components/common/inputBox";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import FrontData from "../components/common/frontData";
import CategoryBox from "../components/board/categoryBox";
import styled from "styled-components";
import TextareaBox from "../components/common/textareaBox";
import Button from "../components/common/button";

interface writeData {
  title: string;
  category: string;
  content: string;
}

const Write: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("NOTICE");
  const [writeData, setWriteData] = useState<writeData>({
    title: "",
    category: selectedCategory,
    content: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string>("");

  const token = sessionStorage.getItem("accessToken");
  const myEmail = sessionStorage.getItem("email");
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setWriteData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(null);
      setImgUrl("");
      return;
    }

    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const previewUrl = URL.createObjectURL(selectedFile);
    setImgUrl(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append(
        "request",
        new Blob(
          [
            JSON.stringify({
              title: writeData.title,
              content: writeData.content,
              category: selectedCategory,
            }),
          ],
          { type: "application/json" }
        )
      );

      if (file) {
        formData.append("file", file);
      }

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const response = await axiosInstance.post(`/boards`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      navigate("/board");
    } catch (error: any) {
      if (error.response) {
        console.log("서버 오류:", error.response?.statusText);
        alert(`오류: ${error.response?.statusText || "글 작성 중 에러"}`);
      } else {
        console.log("네트워크 오류:", error.message);
        alert("게시글 제출 중 네트워크 오류가 발생했습니다.");
      }
    }
  };

  return (
    <>
      <FrontData email={myEmail} />
      <PageTitle titleText="게시글 등록" />
      <form>
        <main>
          <WriteControl>
            <CategoryBox
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </WriteControl>
          <InputBox
            type="text"
            placeholder="글 제목"
            name="title"
            value={writeData.title}
            onChange={handleChange}
          />
          {imgUrl && (
            <ImageWrapper>
              <img src={imgUrl} alt="게시글 이미지" />
            </ImageWrapper>
          )}
          <TextareaBox
            name="content"
            value={writeData.content}
            onChange={handleChange}
            placeholder="글 내용"
          />
          <WriteControl>
            <input type="file" onChange={handleFileChange} />
          </WriteControl>
          <Button btnText="등록" onClick={handleSubmit} disabled={false} />
        </main>
      </form>
    </>
  );
};
export default Write;

const WriteControl = styled.div`
  width: 60%;
  max-width: 500px;
  min-width: 200px;
  margin: 0 auto;

  @media (max-width: 500px) {
    width: 90%;
  }
`;

const ImageWrapper = styled.div`
  width: 60%;
  max-width: 500px;
  min-width: 200px;
  margin: 10px auto;
  text-align: center;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }

  @media (max-width: 500px) {
    width: 90%;
  }
`;
