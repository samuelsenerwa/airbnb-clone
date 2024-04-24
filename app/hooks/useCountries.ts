import countries from "world-countries"; //TODO:install world-countries package

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: CountrySelect.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

// hook for the country

const useCountries = () => {
  const getAll = () => formattedCountries;

  const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value);
  };
  return getAll, getByValue;
};

export default useCountries;
