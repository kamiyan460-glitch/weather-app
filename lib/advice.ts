export function getClothingAdvice(temperature: number): string {
  if (temperature < 10) return "厚手の上着が必要です";
  if (temperature < 19) return "上着があると安心です";
  if (temperature <= 27) return "過ごしやすい服装で大丈夫です";
  return "薄着で、熱中症に注意しましょう";
}

export function getRainAdvice(pop: number): string {
  if (pop >= 50) return "傘を持って行きましょう";
  if (pop >= 30) return "念のため折りたたみ傘があると安心です";
  return "傘は不要でしょう";
}
