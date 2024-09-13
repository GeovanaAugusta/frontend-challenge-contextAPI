export const fetchARestaurantsById = async (id: number) => {
  try {
    const response = await fetch(`/challenge/venue/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};