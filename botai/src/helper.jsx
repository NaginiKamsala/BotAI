import SampleData from "./mockdata.json";

export const getAIResponse = (question) => {
  const answer = SampleData.find((item) =>
    item["question"].toLowerCase().includes(question.toLowerCase())
  ) || {
    id: 1,
    question: question,
    response: "We do not have any response for now.",
  };

  return answer;
};
