# 天気予報アプリ

都市名または現在地から、気温・天気・湿度・降水確率を確認できるWebアプリです。カレンダー（5日分の日付選択）で日ごとの予報を切り替えられます。

## 機能

- 都市名検索 / 現在地取得による天気表示
- 気温・天気・湿度・降水確率の表示
- 5日間の日付選択カレンダーで予報を切り替え
- 読みやすく操作しやすいUI（大きめの文字・タップ領域、アイコンによる視覚的な区別、処理中のローディング表示）

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. APIキーの取得

1. [OpenWeatherMap](https://openweathermap.org/api) に無料登録する
2. マイページの「API keys」タブでAPIキーを発行する（発行直後は反映まで数十分〜数時間かかる場合があります）

### 3. 環境変数の設定

`.env.local.example` をコピーして `.env.local` を作成し、取得したAPIキーを設定します。

```bash
cp .env.local.example .env.local
```

```
OPENWEATHER_API_KEY=あなたのAPIキー
```

`.env.local` はGitにコミットされません（`.gitignore`で除外済み）。

### 4. 開発サーバーの起動

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) で確認できます。

## GitHubへの登録

```bash
git init
git add .
git commit -m "Initial commit"
gh repo create weather-app --public --source=. --push
```

## Vercelへのデプロイ

1. [Vercel](https://vercel.com) にログインし、GitHubリポジトリをImportする
2. Project Settings > Environment Variables に `OPENWEATHER_API_KEY` を設定する（値は`.env.local`と同じAPIキー）
3. Deployを実行する

## 技術スタック

- Next.js 14（App Router） + TypeScript
- OpenWeatherMap API（Geocoding / Current Weather / 5 Day Forecast）
- CSS Modules
