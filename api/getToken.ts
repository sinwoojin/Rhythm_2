import axios from "axios";

const BASEURL = "https://accounts.spotify.com/api/token";
const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET!;

// POST로 accessToken 불러오는 함수
export const getAccessToken = async () => {
  try {
    const response = await axios.post(
      BASEURL,
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // access_token이 정의되어 있는지 확인하고 반환
    if (response.data.access_token) {
      return response.data.access_token;
    } else {
      const newToken = await getRefreshToken();
      return newToken;
    }
  } catch (error) {
    console.error("액세스 토큰 패치 오류:", error);
    throw error;
  }
};

export const getRefreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  try {
    const response = await axios.post(
      BASEURL,
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken as string,
        client_id: clientId as string,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token: newRefreshToken } = response.data;

    localStorage.setItem("access_token", access_token);
    if (newRefreshToken) {
      localStorage.setItem("refresh_token", newRefreshToken);
    }

    return access_token;
  } catch (error) {
    console.error("Failed to refresh token:", error);
  }
};

{/* localStorage에서 refresh_Token을 가져오는 함수 이것을 쓸때 오류가 생겨서 주석 처리함 */}
// import axios from "axios";

// const BASEURL = "https://accounts.spotify.com/api/token";
// const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
// const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET!;

// /**
//  * access_token을 가져오는 함수
//  * refresh_token이 존재하는 경우 이를 사용하여 갱신
//  */
// export const getAccessToken = async (): Promise<string | null> => {
//   try {
//     // 로컬 스토리지에서 refresh_token을 가져옵니다.
//     const refreshToken = localStorage.getItem("refresh_token");
    
//     if (refreshToken) {
//       // refresh_token이 존재하면 이를 사용하여 access_token을 갱신합니다.
//       const response = await axios.post(
//         BASEURL,
//         new URLSearchParams({
//           grant_type: "refresh_token",
//           refresh_token: refreshToken,
//           client_id: clientId,
//           client_secret: clientSecret,
//         }).toString(),
//         {
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//         }
//       );

//       const { access_token, refresh_token: newRefreshToken } = response.data;

//       // 새로운 access_token과 refresh_token을 로컬 스토리지에 저장합니다.
//       if (access_token) {
//         localStorage.setItem("access_token", access_token);
//         if (newRefreshToken) {
//           localStorage.setItem("refresh_token", newRefreshToken);
//         }
//         return access_token;
//       }
//     }

//     // refresh_token이 없거나 실패한 경우 client_credentials 플로우로 access_token을 가져옵니다.
//     const response = await axios.post(
//       BASEURL,
//       new URLSearchParams({
//         grant_type: "client_credentials",
//         client_id: clientId,
//         client_secret: clientSecret,
//       }).toString(),
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       }
//     );

//     const accessToken = response.data.access_token;

//     if (accessToken) {
//       localStorage.setItem("access_token", accessToken);
//       return accessToken;
//     } else {
//       console.error("Access token을 가져올 수 없습니다.");
//       return null;
//     }
//   } catch (error) {
//     console.error("액세스 토큰 패치 오류:", error);
//     throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록 합니다.
//   }
// };
