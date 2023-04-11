const URL = 'https://economia.awesomeapi.com.br/json/all';

const fetchWallet = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export default fetchWallet;
