export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      node: {
        Row: {
          id: string; // uuid
          created_at: string; // timestamptz
          updated_at: string; // timestamptz
          shape: Json; // jsonb
          board_id: string; // uuid
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          shape: Json;
          board_id: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          shape?: Json;
          board_id?: string;
        };
      };

      board: {
        Row: {
          id: string; // uuid
          name: string; // text
          created_at: string; // timestamptz
          updated_at: string; // timestamptz
        };
        Insert: {
          id?: string;
          name: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          created_at?: string;
          updated_at?: string;
        };
      };

      user: {
        Row: {
          uid: string; // uuid
          created_at: string; // timestamptz
          updated_at: string; // timestamptz
          name: string; // text
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name?: string;
        };
      };

      user_board: {
        Row: {
          role: string; // role
          user_id: string; // uuid
          board_id: string; // uuid
          active: boolean; // bool
          created_at: string; // timestamptz
          updated_at: string; // timestamptz
          finger_no: number; // int2
        };
        Insert: {
          role: string;
          user_id: string;
          board_id: string;
          active: boolean;
          created_at?: string;
          updated_at?: string;
          finger_no?: number;
        };
        Update: {
          role?: string;
          user_id?: string;
          board_id?: string;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
          finger_no?: number;
        };
      };
    };
  };
}
