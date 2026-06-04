import { supabase } from '../lib/supabase';

export const templateService = {
  async getTemplates() {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data;
  },

  async getTemplate(id) {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data;
  }
};
