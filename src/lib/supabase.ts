import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env?.VITE_SUPABASE_URL;
const supabaseAnonKey = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env?.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

export type ProfileData = Record<string, unknown>;

export const supabaseUserStore = {
  async saveProfile(profile: {
    id: string;
    role: string;
    name: string;
    email: string;
    password?: string;
    profileData?: ProfileData;
  }) {
    if (!supabase) {
      return { data: null, error: null };
    }

    return supabase
      .from('profiles')
      .upsert(
        {
          id: profile.id,
          role: profile.role,
          name: profile.name,
          email: profile.email,
          password: profile.password ?? null,
          profile_data: profile.profileData ?? {},
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      )
      .select()
      .single();
  },

  async getProfile(profileId: string) {
    if (!supabase) {
      return { data: null, error: null };
    }

    return supabase.from('profiles').select('*').eq('id', profileId).maybeSingle();
  },

  async saveSection(profileId: string, section: string, value: unknown) {
    if (!supabase) {
      return { data: null, error: null };
    }

    const { data: profileData, error: fetchError } = await this.getProfile(profileId);

    if (fetchError) {
      return { data: null, error: fetchError };
    }

    const existingData = (profileData?.profile_data as ProfileData) ?? {};
    const nextData = {
      ...existingData,
      [section]: value,
    };

    return supabase
      .from('profiles')
      .update({ profile_data: nextData, updated_at: new Date().toISOString() })
      .eq('id', profileId)
      .select()
      .single();
  },

  async getSection<T>(profileId: string, section: string): Promise<T | null> {
    if (!supabase) {
      return null;
    }

    const { data, error } = await this.getProfile(profileId);

    if (error || !data) {
      return null;
    }

    const profileData = (data.profile_data as ProfileData) ?? {};
    return (profileData[section] as T) ?? null;
  },
};
