import { supabase } from './supabase';
import type { Database } from '../types/database';

type Tables = keyof Database['public']['Tables'];

export async function fetchTable<T extends Tables>(
  table: T,
  options?: { select?: string; order?: string; limit?: number; eq?: Record<string, unknown> }
) {
  let query = supabase.from(table).select(options?.select || '*');
  if (options?.eq) {
    for (const [k, v] of Object.entries(options.eq)) {
      if (v != null) query = query.eq(k, v);
    }
  }
  if (options?.order) query = query.order(options.order, { ascending: true });
  if (options?.limit) query = query.limit(options.limit);
  const { data, error } = await query;
  if (error) throw error;
  return data as Database['public']['Tables'][T]['Row'][];
}

export async function insertRow<T extends Tables>(
  table: T,
  row: Database['public']['Tables'][T]['Insert']
) {
  const { data, error } = await supabase.from(table).insert(row).select().single();
  if (error) throw error;
  return data as Database['public']['Tables'][T]['Row'];
}

export async function updateRow<T extends Tables>(
  table: T,
  id: string,
  updates: Database['public']['Tables'][T]['Update']
) {
  const { data, error } = await supabase.from(table).update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data as Database['public']['Tables'][T]['Row'];
}

export async function deleteRow<T extends Tables>(table: T, id: string) {
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) throw error;
}

export async function fetchWithJoin<T extends Tables>(
  table: T,
  select: string,
  options?: { eq?: Record<string, unknown>; order?: string }
) {
  let query = supabase.from(table).select(select);
  if (options?.eq) {
    for (const [k, v] of Object.entries(options.eq)) {
      if (v != null) query = query.eq(k, v);
    }
  }
  if (options?.order) query = query.order(options.order, { ascending: true });
  const { data, error } = await query;
  if (error) throw error;
  return data;
}
