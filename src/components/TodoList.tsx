import { serverClient } from "@/app/_trpc/serverClient";
import { trpc } from "@/app/_trpc/client";

const TodoList = async () => {
  const getTodos = await serverClient.userRouter.getUser();
  return <div>{JSON.stringify(getTodos)}</div>;
};

export default TodoList;
