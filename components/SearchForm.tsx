"use client";

import { FormEvent, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import styles from "./SearchForm.module.css";

type Props = {
  onSearch: (city: string) => void;
  isLoading: boolean;
};

export default function SearchForm({ onSearch, isLoading }: Props) {
  const [city, setCity] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = city.trim();
    if (trimmed) {
      onSearch(trimmed);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="city-input" className={styles.label}>
        都市名を入力
      </label>
      <div className={styles.row}>
        <input
          id="city-input"
          className={styles.input}
          type="text"
          placeholder="例: 東京、大阪、札幌"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          className={styles.button}
          disabled={isLoading || !city.trim()}
        >
          {isLoading ? <LoadingSpinner label="検索中…" /> : "検索する"}
        </button>
      </div>
    </form>
  );
}
