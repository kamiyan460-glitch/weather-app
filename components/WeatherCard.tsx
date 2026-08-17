import { getWeatherEmoji } from "@/lib/weatherIcon";
import { getClothingAdvice, getRainAdvice } from "@/lib/advice";
import styles from "./WeatherCard.module.css";

type Props = {
  cityName: string;
  temperature: number;
  humidity: number;
  pop?: number;
  description: string;
  icon: string;
};

export default function WeatherCard({
  cityName,
  temperature,
  humidity,
  pop,
  description,
  icon,
}: Props) {
  return (
    <div className={styles.card}>
      <p className={styles.city}>{cityName}</p>
      <div className={styles.main}>
        <span className={styles.emoji} aria-hidden="true">
          {getWeatherEmoji(icon)}
        </span>
        <span className={styles.temperature}>{temperature}℃</span>
      </div>
      <p className={styles.description}>{description}</p>
      <div className={styles.details}>
        <div className={styles.detailItem}>
          <span aria-hidden="true">💧</span>
          <span>湿度 {humidity}%</span>
        </div>
        {pop !== undefined && (
          <div className={styles.detailItem}>
            <span aria-hidden="true">☂️</span>
            <span>降水確率 {pop}%</span>
          </div>
        )}
      </div>
      <div className={styles.advice}>
        <p className={styles.adviceItem}>
          <span aria-hidden="true">👕</span> {getClothingAdvice(temperature)}
        </p>
        {pop !== undefined && (
          <p className={styles.adviceItem}>
            <span aria-hidden="true">🌂</span> {getRainAdvice(pop)}
          </p>
        )}
      </div>
    </div>
  );
}
