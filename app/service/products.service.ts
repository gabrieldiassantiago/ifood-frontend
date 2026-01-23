import { Product } from "../types";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/products`, {
     cache: 'no-store',
    });
    
    if (!res.ok) throw new Error('errinho no backend ao buscar produtos');
    return res.json();
  } catch (error) {
    console.error('erro em buscar produtos', error);
    return [];
  }
}

