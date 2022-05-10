declare type Sort = "score" | "churn" | "complexity" | "file" | "ratio";

declare type Command = {
  target: string;
  limit?: number;
  since?: string;
  until?: string;
  sort?: Sort;
  filter?: string[];
};