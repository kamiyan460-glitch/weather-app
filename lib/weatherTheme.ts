export type WeatherTheme =
  | "sunny"
  | "cloudy"
  | "rainy"
  | "thunder"
  | "snowy"
  | "foggy"
  | "default";

// OpenWeatherMapのicon codeを背景演出のテーマに変換
export function getWeatherTheme(iconCode: string): WeatherTheme {
  const prefix = iconCode.slice(0, 2);
  const map: Record<string, WeatherTheme> = {
    "01": "sunny",
    "02": "sunny",
    "03": "cloudy",
    "04": "cloudy",
    "09": "rainy",
    "10": "rainy",
    "11": "thunder",
    "13": "snowy",
    "50": "foggy",
  };
  return map[prefix] ?? "default";
}
