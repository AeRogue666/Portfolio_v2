const spamWords = [
  "crypto",
  "casino",
  "viagra",
  "loan",
  "lidl",
  "bank",
  "google",
  "apple",
  "iphone",
  "banque",
  "emprunt",
];

export function containsSpam(message: string) {
  const lower = message.toLowerCase();

  return spamWords.some(word => lower.includes(word));
}
