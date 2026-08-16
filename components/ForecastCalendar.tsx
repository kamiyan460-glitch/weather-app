"use client";

import { ForecastDay } from "@/lib/types";
import { formatDateLabel, getWeatherEmoji } from "@/lib/weatherIcon";
import styles from "./ForecastCalendar.module.css";

type Props = {
  forecast: ForecastDay[];
  selectedDate: string;
  onSelect: (date: string) => void;
};

export default function ForecastCalendar({
  forecast,
  selectedDate,
  onSelect,
}: Props) {
  return (
    <div className={styles.wrapper} role="tablist" aria-label="日付を選択">
      {forecast.map((day) => {
        const { weekday, day: dayLabel } = formatDateLabel(day.date);
        const isSelected = day.date === selectedDate;
        return (
          <button
            key={day.date}
            type="button"
            role="tab"
            aria-selected={isSelected}
            className={`${styles.tab} ${isSelected ? styles.tabSelected : ""}`}
            onClick={() => onSelect(day.date)}
          >
            {isSelected && (
              <span className={styles.check} aria-hidden="true">
                ✓
              </span>
            )}
            <span className={styles.weekday}>{weekday}</span>
            <span className={styles.day}>{dayLabel}</span>
            <span className={styles.emoji} aria-hidden="true">
              {getWeatherEmoji(day.condition.icon)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
