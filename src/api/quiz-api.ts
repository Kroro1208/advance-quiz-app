import axios from "axios";
import {
  FetchQuizCategoriesResponse,
  FetchQuizParams,
  FetchQuizResponse,
  QuizCategory,
  QuizItem,
} from "../types/quiz-type";
import { categoryTranslationMap } from "./translate";
const BASE_URL = "http://opentdb.com";

export class QuizAPI {
  static async fetchCategories(): Promise<QuizCategory[]> {
    const { data } = await axios.get<FetchQuizCategoriesResponse>(
      `${BASE_URL}/api_category.php`
    );
    return data.trivia_categories.map((category) => ({
      ...category,
      name: categoryTranslationMap[category.name] || category.name,
    }));
  }

  static async fetchQuiz(params: FetchQuizParams): Promise<QuizItem[]> {
    const { data } = await axios.get<FetchQuizResponse>(`${BASE_URL}/api.php`, {
      params,
    });
    return data.results;
  }
}
