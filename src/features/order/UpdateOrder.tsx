import { ActionFunctionArgs, useFetcher } from "react-router-dom";
import { updateOrder } from "../services/apiRestaurant";

function UpdateOrder({ priority }: { priority: string }) {
  const fetcher = useFetcher();
  return (
    <>
      <fetcher.Form method="PATCH">
        <button className="mt-2 inline-block rounded-full bg-yellow-400 px-3 py-3 font-semibold tracking-wide text-stone-800 transition-all duration-75 hover:bg-yellow-300">
          Make Priority
        </button>
        <input type="hidden" name="priority" value={priority} />
      </fetcher.Form>
    </>
  );
}

export async function action({ request, params }: ActionFunctionArgs) {
  const form = await request.formData();
  const sendData = Object.fromEntries(form);
  const data = {
    ...sendData,
    priority: sendData.priority === "false" ? true : false,
  };

  await updateOrder(params.orderId, data);

  return null;
}

export default UpdateOrder;
