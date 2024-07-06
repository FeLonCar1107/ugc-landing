const apiService = () => {
  const POST = async (path: string, payload: any) => {
    try {
      const response = await fetch(`/api/${path}`, {
        method: "POST",
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
    try {
      const response = await fetch(`/api/${path}`);
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
