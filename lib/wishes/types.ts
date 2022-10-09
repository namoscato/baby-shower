export const WISH_PROMPTS = [
  "I hope you love",
  "I hope you learn",
  "I hope you become",
  "I hope you don’t",
  "I hope you experience",
  "I hope you never forget",
  "I hope you always",
  "I hope you have your mom’s",
  "I hope you have your dad’s",
] as const;

export interface WishResponse {
  wishes: Wish[];
}

export interface Wish {
  prompt: string;
  response: string;
}
