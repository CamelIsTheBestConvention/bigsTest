import { useEffect, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../../api/axiosInstance";
import { useLocation } from "react-router-dom";

interface CategoryProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

interface categoryData {
  [key: string]: string;
}

const CategoryBox: React.FC<CategoryProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const location = useLocation();
  const [category, setCategory] = useState<categoryData>({});

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axiosInstance.get("/boards/categories");

        setCategory(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("카테고리 가져온는 중 에러", error);
      }
    };

    fetchCategory();
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const isBoardPage = location.pathname === "/board";

  return (
    <>
      <CategorySelect onChange={handleCategoryChange} value={selectedCategory}>
        {isBoardPage && <option value="전체">전체</option>}
        {Object.entries(category).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </CategorySelect>
    </>
  );
};

export default CategoryBox;

const CategorySelect = styled.select`
  padding: 5px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #848484;
  background-color: white;
  outline: none;

  &:focus {
    border-color: #007bff;
  }

  @media (max-width: 550px) {
    font-size: 14px;
  }

  @media (max-width: 500px) {
    font-size: 12px;
  }
`;
