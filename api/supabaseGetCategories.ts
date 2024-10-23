import { supabase } from '@/supabase/client';

export const getCategories = async () => {
  const { data: categories } = await supabase.from('category').select('*');

  return categories;
};

export const getCategory = async (name: string) => {
  const { data: category } = await supabase
    .from('category')
    .select('*')
    .eq('name', name)
    .single();

  return category;
};
