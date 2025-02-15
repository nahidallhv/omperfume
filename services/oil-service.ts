import { supabase } from '../lib/supabase'
import { OilPerfume } from '../components/admin-oil-product-form'

export const getOilPerfumes = async (): Promise<OilPerfume[]> => {
  const { data, error } = await supabase
    .from('oil_perfumes')
    .select('*')

  if (error) throw error
  return data as OilPerfume[] 
}

export const addOilPerfume = async (perfume: OilPerfume): Promise<OilPerfume> => {
  const { data, error } = await supabase
    .from('oil_perfumes')
    .insert(perfume)
    .single()

  if (error) throw error
  return data as OilPerfume
}


export const deleteOilPerfume = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('oil_perfumes') 
    .delete()
    .match({ id })

  if (error) {
    console.error('Ətir silinərkən xəta baş verdi:', error)
    throw new Error('Ətir silinərkən xəta baş verdi.')
  }
}

export const getOilPerfumeById = async (id: string) => {
  const { data, error } = await supabase
    .from('oil_perfumes')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export const updateOilPerfume = async (id: string, perfume: Partial<OilPerfume>) => {
  const { error } = await supabase
    .from('oil_perfumes')
    .update(perfume)
    .eq('id', id)

  if (error) throw error
}