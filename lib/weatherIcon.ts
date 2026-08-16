// OpenWeatherMapのicon codeを絵文字に変換（色だけでなく形でも天気を区別するため）
export function getWeatherEmoji(iconCode: string): string {
  const prefix = iconCode.slice(0, 2);
  const map: Record<string, string> = {
    "01": "☀️", // 晴れ
    "02": "🌤️", // 晴れ時々曇り
    "03": "☁️", // 曇り
    "04": "☁️", // 曇り
    "09": "🌧️", // にわか雨
    "10": "🌦️", // 雨
    "11": "⛈️", // 雷雨
    "13": "❄️", // 雪
    "50": "🌫️", // 霧
  };
  return map[prefix] ?? "🌡️";
}

export function formatDateLabel(dateStr: string): { weekday: string; day: string } {
  const date = new Date(`${dateStr}T00:00:00`);
  const weekday = date.toLocaleDateString("ja-JP", { weekday: "short" });
  const day = date.toLocaleDateString("ja-JP", { month: "numeric", day: "numeric" });
  return { weekday, day };
}
