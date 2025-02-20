import { supabase } from '../lib/supabase';

export interface JewelryProduct {
  id: string;
  name: string;
  price: number;
  image: string;
}
export const getJewelryProducts = async (): Promise<JewelryProduct[]> => {
  const { data, error } = await supabase
    .from('jewelry_gifts')
    .select('*');

  if (error) throw new Error(error.message);
  return data as JewelryProduct[];
};


export const addJewelryProduct = async (product: Omit<JewelryProduct, 'id'>): Promise<JewelryProduct> => {
  const { data, error } = await supabase
    .from('jewelry_gifts')
    .insert(product)
    .single();

  if (error) throw new Error(error.message);
  return data as JewelryProduct;
};

export const deleteJewelryProduct = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('jewelry_gifts')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
};

export const updateJewelryProduct = async (id: string, updates: Partial<JewelryProduct>): Promise<void> => {
  const { error } = await supabase
    .from('jewelry_gifts')
    .update(updates)
    .eq('id', id);

  if (error) throw new Error(error.message);
};

export const getJewelryProductById = async (id: string): Promise<JewelryProduct> => {
    const { data, error } = await supabase
      .from('jewelry_gifts')
      .select('*')
      .eq('id', id)
      .single();
  
    if (error) throw new Error(error.message);
    return data as JewelryProduct;
  };