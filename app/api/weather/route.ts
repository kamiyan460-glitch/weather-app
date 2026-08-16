import { NextRequest, NextResponse } from "next/server";
import { getWeatherByCity, getWeatherByCoords, WeatherApiError } from "@/lib/weatherApi";

export async function GET(request: NextRequest) {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "サーバーにAPIキーが設定されていません" },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  try {
    if (city) {
      const result = await getWeatherByCity(city, apiKey);
      return NextResponse.json(result);
    }

    if (lat && lon) {
      const result = await getWeatherByCoords(
        Number(lat),
        Number(lon),
        apiKey
      );
      return NextResponse.json(result);
    }

    return NextResponse.json(
      { error: "都市名または位置情報を指定してください" },
      { status: 400 }
    );
  } catch (err) {
    if (err instanceof WeatherApiError) {
      return NextResponse.json({ error: err.message }, { status: 404 });
    }
    return NextResponse.json(
      { error: "天気情報の取得中にエラーが発生しました" },
      { status: 500 }
    );
  }
}
