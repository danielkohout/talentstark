// import { serverTrpc } from "@/routers/trpc-caller";
// import { redirect } from "next/navigation";
// import AddTeamForm from "./AddTeamForm";

// const AddTeamAction = async () => {
//   const addTeam = async (formData: FormData) => {
//     "use server";
//     const name = formData.get("name") as string;
//     await serverTrpc.teamRouter
//       .addTeam({
//         name: name,
//       })
//       .then(() => {
//         redirect("/team");
//       });
//   };
//   return <AddTeamForm />;
// };

// export default AddTeamAction;
