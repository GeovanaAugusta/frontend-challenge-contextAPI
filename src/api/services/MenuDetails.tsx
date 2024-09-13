export const fetchMenuDetails = async () => {
  try {
    const response = await fetch('/challenge/menu', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar os detalhes do menu:', error);
    return null;
  }
};
