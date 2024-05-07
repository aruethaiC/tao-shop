import { getOrdersByEmail } from "../../sanity/sanity-utils";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Order() {
  const user = await currentUser();

  if (!user) return <div>Not logged in</div>;

  const fetchedOrders = await getOrdersByEmail(
    user?.emailAddresses[0]?.emailAddress
  );

  return (
    <div className="max-w-3xl mx-auto mt-20">
      <h1 className="text-3xl text-center font-semibold text-[#990033] mb-6">
        Order Page
      </h1>

      <table className="w-full border-collapse">
        <thead>
          <tr className="text-[#990033] border-b border-gray-200">
            <th className="px-4 py-3"> Product </th>
            <th className="px-4 py-3"> Price </th>
            <th className="px-4 py-3"> Quantity </th>
            <th className="px-4 py-3"> Payment Status </th>
            <th className="px-4 py-3"> Delivery Status </th>
          </tr>
        </thead>

        <tbody>
          {fetchedOrders.map((order) => (
            <tr
              className="hover:bg-gray-50 text-center border-b border-gray-300 text-[#990033] "
              key={order._id}
            >
              <td className="py-22 px-4 flex items-center">{order.name}</td>
              <td className="py-2 px-4">{order.price}฿</td>
              <td className="py-2 px-4">{order.qty}</td>
              <td className="py-2 px-4">
                {order.paid ? (
                  <span className="text-green-500">Paid</span>
                ) : (
                  <span className="text-red-500">Unpaid</span>
                )}
              </td>

              <td className="py-2 px-4">
                {order.delivered ? (
                  <span className="text-green-500">Delivered</span>
                ) : (
                  <span className="text-red-500">Not delivered</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
  );
}
