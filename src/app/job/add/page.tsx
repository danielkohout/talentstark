import AddProcess from "@/components/job/add/AddProcess";
import BasicJobInformation from "@/components/job/add/BasicJobInformation";
import { serverTrpc } from "@/routers/trpc-caller";

const page = async () => {
  const data = await serverTrpc.getUser();
  const addJob = async (formData: FormData) => {
    "use server";
    const jobName = formData.get("jobName") as string;
    if (!jobName) {
      console.log("Kein Name angegeben");
      return;
    }
    await serverTrpc.jobRouter.addJob({ text: jobName });
  };
  return (
    <>
      <AddProcess />
      <div className="py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-bold text-2xl lg:text-4xl">
              Zeit eine Stelle zu besetzen
            </h1>
            <p className="mt-2 text-gray-600">
              Erstelle einen neuen Job in wenigen Schritten.
            </p>
          </div>
          <div className="bg-white rounded-2xl mt-10">
            <div className="p-8">
              <BasicJobInformation addJob={addJob} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
