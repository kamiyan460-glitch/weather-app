"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // 登録に失敗してもアプリの利用自体には支障がないため無視する
      });
    }
  }, []);

  return null;
}
