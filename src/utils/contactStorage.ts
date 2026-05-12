import { supabase } from "./supabaseClient";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export const saveContactMessage = async (
  data: Omit<ContactMessage, "id" | "created_at">
) => {
  const { error } = await supabase
    .from("contact_messages")
    .insert([{ ...data }]);

  if (error) {
    console.error("Error saving contact message:", error);
    throw error;
  }
};

export const getContactMessages = async (): Promise<ContactMessage[]> => {
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching contact messages:", error);
    return [];
  }

  return data as ContactMessage[];
};
