import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://front-mission.bigs.or.kr",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = sessionStorage.getItem("refreshToken");

      if (
        refreshToken &&
        window.confirm("토큰이 만료되었습니다. 재발급하시겠습니까?")
      ) {
        try {
          const response = await axios.post(
            "https://front-mission.bigs.or.kr/auth/refresh",
            { refreshToken }
          );

          const { accessToken, refreshToken: newRefreshToken } = response.data;
          sessionStorage.setItem("accessToken", accessToken);
          sessionStorage.setItem("refreshToken", newRefreshToken);

          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } catch (error) {
          console.error("토큰 갱신 실패", error);
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("refreshToken");
          sessionStorage.removeItem("email");
          window.location.href = "/";
        }
      } else {
        alert("로그인 페이지로 이동합니다.");
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("email");
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
