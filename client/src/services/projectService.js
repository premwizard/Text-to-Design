import { supabase } from '../lib/supabase';

export const projectService = {
  async getProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('updated_at', { ascending: false });
      
    if (error) throw error;
    return data;
  },

  async getProject(id) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data;
  },

  async createProject(projectData) {
    const { data, error } = await supabase
      .from('projects')
      .insert([projectData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateProject(id, updates) {
    const { data, error } = await supabase
      .from('projects')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteProject(id) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  },

  async toggleFavorite(id, isFavorite) {
    const { data, error } = await supabase
      .from('projects')
      .update({ is_favorite: isFavorite, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },

  async renameProject(id, newTitle) {
    const { data, error } = await supabase
      .from('projects')
      .update({ title: newTitle, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async duplicateProject(projectData) {
    // Exclude id, created_at, updated_at from original project
    const { id, created_at, updated_at, ...cleanData } = projectData;
    cleanData.title = `${cleanData.title} (Copy)`;
    
    const { data, error } = await supabase
      .from('projects')
      .insert([cleanData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
