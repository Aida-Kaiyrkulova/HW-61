export const BASE_URL = 'https://restcountries.com/v2';
export const ALL_COUNTRIES_URL = `${BASE_URL}/all?fields=alpha3Code,name`;
export const COUNTRY_DETAILS_URL = (alphaCode: string) => `${BASE_URL}/alpha/${alphaCode}`;

export const makeRequest = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Ошибка ${response.status}: ${errorMessage}`);
  }

  return response.json();
};