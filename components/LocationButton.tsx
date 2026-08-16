"use client";

import LoadingSpinner from "./LoadingSpinner";
import styles from "./LocationButton.module.css";

type Props = {
  onLocate: (lat: number, lon: number) => void;
  onError: (message: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

export default function LocationButton({
  onLocate,
  onError,
  isLoading,
  setIsLoading,
}: Props) {
  function handleClick() {
    if (!navigator.geolocation) {
      onError("お使いのブラウザは現在地の取得に対応していません");
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLoading(false);
        onLocate(position.coords.latitude, position.coords.longitude);
      },
      () => {
        setIsLoading(false);
        onError("現在地を取得できませんでした。都市名で検索してください");
      }
    );
  }

  return (
    <button
      type="button"
      className={styles.button}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <LoadingSpinner label="現在地を取得中…" />
      ) : (
        <>
          <span aria-hidden="true">📍</span> 現在地から調べる
        </>
      )}
    </button>
  );
}
