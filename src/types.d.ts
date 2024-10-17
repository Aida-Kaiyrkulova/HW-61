export interface Country {
  alpha3Code: string;
  name: string;
  flag: string;
}

export interface CountryDetails {
  alpha3Code: string;
  name: string;
  population: number;
  region: string;
  borders: string[];
  flag: string;
}