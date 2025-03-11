import { Handler } from "@netlify/functions";

const items = [
  { id: 1, name: "john" },
  { id: 2, name: "susan" },
];

const handler: Handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify("hello world"),
  };
};

export { handler };
