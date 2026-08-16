export type WeatherCondition = {
  main: string;
  description: string;
  icon: string;
};

export type CurrentWeather = {
  cityName: string;
  temperature: number;
  humidity: number;
  condition: WeatherCondition;
};

export type ForecastDay = {
  date: string; // "2026-08-17" 形式
  temperature: number;
  humidity: number;
  pop: number; // 降水確率 0-100
  condition: WeatherCondition;
};

export type WeatherResponse = {
  current: CurrentWeather;
  forecast: ForecastDay[];
};

export type WeatherErrorResponse = {
  error: string;
};
