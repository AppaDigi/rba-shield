export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type PortalRole = "member" | "attorney" | "admin";
export type SenderType = "member" | "attorney" | "system";
export type RequestCategory =
  | "religious_discrimination"
  | "defamation"
  | "employment_related"
  | "free_speech_constitutional"
  | "business_ministry_dispute"
  | "other";
export type RequestStatus =
  | "submitted"
  | "under_review"
  | "claimed"
  | "in_progress"
  | "awaiting_member_response"
  | "closed";

export interface Database {
  public: {
    Tables: {
      aid_requests: {
        Row: {
          id: string;
          member_id: string;
          category: RequestCategory;
          description: string;
          status: RequestStatus;
          supporting_links: string[];
          claimed_attorney_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          member_id: string;
          category: RequestCategory;
          description: string;
          status?: RequestStatus;
          supporting_links?: string[];
          claimed_attorney_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["aid_requests"]["Insert"]>;
        Relationships: [];
      };
      attorneys: {
        Row: {
          id: string;
          username: string;
          name: string;
          email: string;
          areas_of_practice: string[];
          jurisdiction: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          username: string;
          name: string;
          email: string;
          areas_of_practice?: string[];
          jurisdiction?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["attorneys"]["Insert"]>;
        Relationships: [];
      };
      members: {
        Row: {
          id: string;
          username: string;
          name: string;
          email: string;
          contact_info: Json | null;
          created_at: string;
        };
        Insert: {
          id: string;
          username: string;
          name: string;
          email: string;
          contact_info?: Json | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["members"]["Insert"]>;
        Relationships: [];
      };
      request_attachments: {
        Row: {
          id: string;
          request_id: string;
          message_id: string | null;
          file_name: string;
          file_path: string;
          file_url: string | null;
          file_type: string | null;
          uploaded_by: string | null;
          uploaded_by_role: SenderType;
          created_at: string;
        };
        Insert: {
          id?: string;
          request_id: string;
          message_id?: string | null;
          file_name: string;
          file_path: string;
          file_url?: string | null;
          file_type?: string | null;
          uploaded_by?: string | null;
          uploaded_by_role?: SenderType;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["request_attachments"]["Insert"]>;
        Relationships: [];
      };
      request_messages: {
        Row: {
          id: string;
          request_id: string;
          sender_type: SenderType;
          sender_id: string | null;
          message: string;
          is_internal_note: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          request_id: string;
          sender_type: SenderType;
          sender_id?: string | null;
          message: string;
          is_internal_note?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["request_messages"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      current_portal_role: {
        Args: Record<PropertyKey, never>;
        Returns: PortalRole;
      };
    };
    Enums: {
      app_role: PortalRole;
      request_category: RequestCategory;
      request_status: RequestStatus;
      sender_type: SenderType;
    };
    CompositeTypes: Record<string, never>;
  };
}
