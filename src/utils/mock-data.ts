import collabs from "../_mock_/collabs.json";
import contentMedia from "../_mock_/content-media.json";
import reviews from "../_mock_/reviews.json";
import user from "../_mock_/user.json";

interface MockData {
  [key: string]: {
    GET?: any;
    POST?: any;
  };
}

const mockData: MockData = {
  "content-media": contentMedia,
  collabs: collabs,
  reviews: reviews,
  user: user,
};

export const getMockData = (
  path: string,
  method: "GET" | "POST",
  payload?: any,
) => {
  const data = mockData[path];
  if (!data) throw new Error(`No mock data found for service: ${path}`);
  const mockResponse = data[method];

  return mockResponse.data;
};
