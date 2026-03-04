export interface Repo {
  id:                string;
  name:              string;
  description:       string;
  language:          string;
  visibility:        string;
  stars:             number;
  forks:             number;
  updatedAt:         string;
  productivityState: string;
  healthScore:       number;
  healthGrade:       string;
  status:            string;
  breakdown:         Record<string, number>;
  recommendations:   string[];
}