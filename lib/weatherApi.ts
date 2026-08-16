import type { CurrentWeather, ForecastDay, WeatherResponse } from "./types";

const BASE_URL = "https://api.openweathermap.org";

class WeatherApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WeatherApiError";
  }
}

type GeoResult = {
  lat: number;
  lon: number;
  name: string;
};

async function geocodeCity(city: string, apiKey: string): Promise<GeoResult> {
  const url = `${BASE_URL}/geo/1.0/direct?q=${encodeURIComponent(
    city
  )}&limit=1&appid=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new WeatherApiError("都市名の検索に失敗しました");
  }
  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) {
    throw new WeatherApiError(
      "都市が見つかりませんでした。都市名を確認してください"
    );
  }
  const first = data[0];
  return {
    lat: first.lat,
    lon: first.lon,
    name: first.local_names?.ja ?? first.name,
  };
}

async function fetchCurrentWeather(
  lat: number,
  lon: number,
  apiKey: string
): Promise<CurrentWeather> {
  const url = `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ja`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new WeatherApiError("天気情報を取得できませんでした");
  }
  const data = await res.json();
  return {
    cityName: data.name,
    temperature: Math.round(data.main.temp),
    humidity: data.main.humidity,
    condition: {
      main: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    },
  };
}

async function fetchForecast(
  lat: number,
  lon: number,
  apiKey: string
): Promise<ForecastDay[]> {
  const url = `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ja`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new WeatherApiError("予報情報を取得できませんでした");
  }
  const data = await res.json();
  return groupForecastByDay(data.list);
}

type ForecastListItem = {
  dt_txt: string;
  main: { temp: number; humidity: number };
  weather: { main: string; description: string; icon: string }[];
  pop: number;
};

function groupForecastByDay(list: ForecastListItem[]): ForecastDay[] {
  const byDate = new Map<string, ForecastListItem[]>();

  for (const item of list) {
    const date = item.dt_txt.split(" ")[0];
    const items = byDate.get(date) ?? [];
    items.push(item);
    byDate.set(date, items);
  }

  const days: ForecastDay[] = [];

  for (const [date, items] of byDate.entries()) {
    // 正午(12:00)に最も近い時間帯を代表値として採用
    const representative = items.reduce((closest, current) => {
      const closestHour = Number(closest.dt_txt.split(" ")[1].split(":")[0]);
      const currentHour = Number(current.dt_txt.split(" ")[1].split(":")[0]);
      return Math.abs(currentHour - 12) < Math.abs(closestHour - 12)
        ? current
        : closest;
    });

    const maxPop = Math.max(...items.map((item) => item.pop));

    days.push({
      date,
      temperature: Math.round(representative.main.temp),
      humidity: representative.main.humidity,
      pop: Math.round(maxPop * 100),
      condition: {
        main: representative.weather[0].main,
        description: representative.weather[0].description,
        icon: representative.weather[0].icon,
      },
    });
  }

  return days.sort((a, b) => a.date.localeCompare(b.date));
}

export async function getWeatherByCity(
  city: string,
  apiKey: string
): Promise<WeatherResponse> {
  const geo = await geocodeCity(city, apiKey);
  return getWeatherByCoords(geo.lat, geo.lon, apiKey, geo.name);
}

export async function getWeatherByCoords(
  lat: number,
  lon: number,
  apiKey: string,
  overrideName?: string
): Promise<WeatherResponse> {
  const [current, forecast] = await Promise.all([
    fetchCurrentWeather(lat, lon, apiKey),
    fetchForecast(lat, lon, apiKey),
  ]);

  return {
    current: overrideName ? { ...current, cityName: overrideName } : current,
    forecast,
  };
}

export { WeatherApiError };
