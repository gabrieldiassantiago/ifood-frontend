import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import OrdersList from "./OrdersList";

async function getInitialOrders(limit = 10) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) redirect("/login");

  const baseUrl = process.env.API_URL ?? "http://localhost:3001";

  const res = await fetch(`${baseUrl}/orders/me?limit=${limit}&offset=0`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (res.status === 401) redirect("/login");
  if (!res.ok) return [];

  const json = await res.json();
  return json.data ?? json;
}

export default async function OrdersPage() {
  const initialLimit = 10;
  const orders = await getInitialOrders(initialLimit);

  return (
    <div className="min-h-screen bg-white">
      <OrdersList initialOrders={orders} initialLimit={initialLimit} />
    </div>
  );
}
