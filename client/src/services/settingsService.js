import { supabase } from '../lib/supabase';

export const settingsService = {
  async getSettings(userId) {
    const { data, error } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .single();
      
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is no rows returned
    return data;
  },

  async updateSettings(userId, updates) {
    // Check if settings exist first
    const { data: existing } = await supabase
      .from('user_settings')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (existing) {
      const { data, error } = await supabase
        .from('user_settings')
        .update(updates)
        .eq('user_id', userId)
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      const { data, error } = await supabase
        .from('user_settings')
        .insert([{ user_id: userId, ...updates }])
        .select()
        .single();
      if (error) throw error;
      return data;
    }
  }
};
