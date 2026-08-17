"use client";

import { useEffect, useMemo, useState } from "react";
import SearchForm from "@/components/SearchForm";
import LocationButton from "@/components/LocationButton";
import ForecastCalendar from "@/components/ForecastCalendar";
import WeatherCard from "@/components/WeatherCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import { WeatherResponse } from "@/lib/types";
import { getWeatherTheme } from "@/lib/weatherTheme";
import styles from "./page.module.css";

const LAST_RESULT_KEY = "weather-app:last-result";

export default function Home() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isLoading = isSearching || isLocating;

  useEffect(() => {
    const saved = localStorage.getItem(LAST_RESULT_KEY);
    if (!saved) return;
    try {
      const data: WeatherResponse = JSON.parse(saved);
      setWeather(data);
      setSelectedDate(data.forecast[0]?.date ?? "");
    } catch {
      localStorage.removeItem(LAST_RESULT_KEY);
    }
  }, []);

  const selectedDay = useMemo(() => {
    if (!weather) return null;
    return (
      weather.forecast.find((day) => day.date === selectedDate) ??
      weather.forecast[0] ??
      null
    );
  }, [weather, selectedDate]);

  const theme = getWeatherTheme(selectedDay?.condition.icon ?? "");

  async function fetchWeather(params: string) {
    setError(null);
    try {
      const res = await fetch(`/api/weather?${params}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "天気情報を取得できませんでした");
        return;
      }
      setWeather(data);
      setSelectedDate(data.forecast[0]?.date ?? "");
      localStorage.setItem(LAST_RESULT_KEY, JSON.stringify(data));
    } catch {
      setError("通信エラーが発生しました。しばらくしてから再度お試しください");
    }
  }

  async function handleSearch(city: string) {
    setIsSearching(true);
    await fetchWeather(`city=${encodeURIComponent(city)}`);
    setIsSearching(false);
  }

  async function handleLocate(lat: number, lon: number) {
    await fetchWeather(`lat=${lat}&lon=${lon}`);
  }

  return (
    <main className={`${styles.main} ${styles[theme]}`}>
      <h1 className={styles.title}>天気予報アプリ</h1>

      <div className={styles.controls}>
        <SearchForm onSearch={handleSearch} isLoading={isSearching} />
        <LocationButton
          onLocate={handleLocate}
          onError={setError}
          isLoading={isLocating}
          setIsLoading={setIsLocating}
        />
      </div>

      {error && <ErrorMessage message={error} />}

      {isLoading && !error && (
        <div className={styles.loadingRow}>
          <LoadingSpinner label="天気情報を取得しています…" />
        </div>
      )}

      {weather && selectedDay && !isLoading && (
        <>
          <ForecastCalendar
            forecast={weather.forecast}
            selectedDate={selectedDate}
            onSelect={setSelectedDate}
          />
          <WeatherCard
            cityName={weather.current.cityName}
            temperature={selectedDay.temperature}
            humidity={selectedDay.humidity}
            pop={selectedDay.pop}
            description={selectedDay.condition.description}
            icon={selectedDay.condition.icon}
          />
        </>
      )}

      {!weather && !isLoading && !error && (
        <p className={styles.hint}>
          都市名を入力するか、現在地から天気を調べてください
        </p>
      )}
    </main>
  );
}
