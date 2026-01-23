import { DeliveryFee } from "../types";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function getDeliveryDistricts(): Promise<DeliveryFee[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/delivery-fees/districts`, {
      cache: 'force-cache',
    });
    if (!res.ok) throw new Error('Failed to fetch districts');
    return res.json();
  } catch (error) {
    console.error('Error fetching districts:', error);
    return [];
  }
}
