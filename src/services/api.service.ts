import { Environment } from "../enums/environment";
import { getMockData } from "../utils/mock-data";

const apiService = () => {
  const POST = async (path: string, payload: any) => {
    const method = "POST";

    try {
      const response = await fetch(`/api/${path}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      return result.data;
    } catch (error) {
      console.error(error);
      throw new Error(`Error fetching data: ${error}`);
    }
  };

  const GET = async (path: string) => {
    const method = "GET";

    if (process.env.NODE_ENV === Environment.DEVELOPMENT) {
      console.log(`🚀 ~ Data from _mock_: ${path}`);
      return getMockData(path, method);
    }

    try {
      const response = await fetch(`/api/${path}`, {
        next: { revalidate: 24 * 60 * 60 * 7 },
      });
      const result = await response.json();

      return result.data;
    } catch (error) {
      console.error(error);
      throw new Error(`Error fetching data: ${error}`);
    }
  };

  return { POST, GET };
};

export default apiService();
