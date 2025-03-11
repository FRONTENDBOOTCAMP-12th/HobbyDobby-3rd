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
      achievement: {
        Row: {
          id: string;
          level: number;
          max_progress: number;
          reward_gem: number | null;
          reward_title: string | null;
          type: Database['public']['Enums']['achievement_type'];
        };
        Insert: {
          id?: string;
          level: number;
          max_progress: number;
          reward_gem?: number | null;
          reward_title?: string | null;
          type: Database['public']['Enums']['achievement_type'];
        };
        Update: {
          id?: string;
          level?: number;
          max_progress?: number;
          reward_gem?: number | null;
          reward_title?: string | null;
          type?: Database['public']['Enums']['achievement_type'];
        };
        Relationships: [
          {
            foreignKeyName: 'achievement_reward_title_fkey';
            columns: ['reward_title'];
            isOneToOne: false;
            referencedRelation: 'title';
            referencedColumns: ['name'];
          },
        ];
      };
      challenge: {
        Row: {
          completed_date: string | null;
          created_date: string | null;
          id: string;
          name: string;
          now_unit: string | null;
          progress: Json | null;
          sub_hobby_name: string | null;
        };
        Insert: {
          completed_date?: string | null;
          created_date?: string | null;
          id?: string;
          name: string;
          now_unit?: string | null;
          progress?: Json | null;
          sub_hobby_name?: string | null;
        };
        Update: {
          completed_date?: string | null;
          created_date?: string | null;
          id?: string;
          name?: string;
          now_unit?: string | null;
          progress?: Json | null;
          sub_hobby_name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'challenge_now_unit_fkey';
            columns: ['now_unit'];
            isOneToOne: false;
            referencedRelation: 'unit';
            referencedColumns: ['name'];
          },
          {
            foreignKeyName: 'challenge_sub_hobby_name_fkey';
            columns: ['sub_hobby_name'];
            isOneToOne: false;
            referencedRelation: 'sub_hobby';
            referencedColumns: ['name'];
          },
        ];
      };
      hobby: {
        Row: {
          id: string;
          name: string;
        };
        Insert: {
          id?: string;
          name: string;
        };
        Update: {
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      item: {
        Row: {
          id: string;
          image: string | null;
          name: string;
          price: number;
        };
        Insert: {
          id?: string;
          image?: string | null;
          name: string;
          price: number;
        };
        Update: {
          id?: string;
          image?: string | null;
          name?: string;
          price?: number;
        };
        Relationships: [];
      };
      question: {
        Row: {
          blank_content: string[] | null;
          id: number;
          is_answer_record: boolean;
          is_input_optional: boolean;
          not_question_content: string | null;
          order: number;
          parent_question: number | null;
          previous_response: string[] | null;
          question: string;
          select_content: string[] | null;
          type: Database['public']['Enums']['question_type'][];
          unit: string;
        };
        Insert: {
          blank_content?: string[] | null;
          id?: number;
          is_answer_record?: boolean;
          is_input_optional?: boolean;
          not_question_content?: string | null;
          order: number;
          parent_question?: number | null;
          previous_response?: string[] | null;
          question: string;
          select_content?: string[] | null;
          type: Database['public']['Enums']['question_type'][];
          unit: string;
        };
        Update: {
          blank_content?: string[] | null;
          id?: number;
          is_answer_record?: boolean;
          is_input_optional?: boolean;
          not_question_content?: string | null;
          order?: number;
          parent_question?: number | null;
          previous_response?: string[] | null;
          question?: string;
          select_content?: string[] | null;
          type?: Database['public']['Enums']['question_type'][];
          unit?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'question_parent_question_fkey';
            columns: ['parent_question'];
            isOneToOne: false;
            referencedRelation: 'question';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'question_unit_fkey';
            columns: ['unit'];
            isOneToOne: false;
            referencedRelation: 'unit';
            referencedColumns: ['name'];
          },
        ];
      };
      sub_hobby: {
        Row: {
          hobby_id: string | null;
          id: string;
          info: string;
          name: string;
        };
        Insert: {
          hobby_id?: string | null;
          id?: string;
          info: string;
          name: string;
        };
        Update: {
          hobby_id?: string | null;
          id?: string;
          info?: string;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'sub_hobby_hobby_id_fkey';
            columns: ['hobby_id'];
            isOneToOne: false;
            referencedRelation: 'hobby';
            referencedColumns: ['id'];
          },
        ];
      };
      title: {
        Row: {
          id: string;
          name: string;
        };
        Insert: {
          id?: string;
          name: string;
        };
        Update: {
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      unit: {
        Row: {
          id: string;
          level: number;
          name: string;
          section: number;
          sub_hobby: string;
        };
        Insert: {
          id?: string;
          level: number;
          name: string;
          section: number;
          sub_hobby: string;
        };
        Update: {
          id?: string;
          level?: number;
          name?: string;
          section?: number;
          sub_hobby?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'unit_sub_hobby_fkey';
            columns: ['sub_hobby'];
            isOneToOne: false;
            referencedRelation: 'sub_hobby';
            referencedColumns: ['name'];
          },
        ];
      };
      user: {
        Row: {
          created_date: string;
          exp: number | null;
          gem: number | null;
          id: string;
          image: string | null;
          item: string | null;
          main_hobby: string | null;
          nickname: string;
          now_challenge: string | null;
          now_hobby: string | null;
          password: string;
          title: string | null;
          uid: string;
        };
        Insert: {
          created_date?: string;
          exp?: number | null;
          gem?: number | null;
          id: string;
          image?: string | null;
          item?: string | null;
          main_hobby?: string | null;
          nickname: string;
          now_challenge?: string | null;
          now_hobby?: string | null;
          password: string;
          title?: string | null;
          uid?: string;
        };
        Update: {
          created_date?: string;
          exp?: number | null;
          gem?: number | null;
          id?: string;
          image?: string | null;
          item?: string | null;
          main_hobby?: string | null;
          nickname?: string;
          now_challenge?: string | null;
          now_hobby?: string | null;
          password?: string;
          title?: string | null;
          uid?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_item_fkey';
            columns: ['item'];
            isOneToOne: false;
            referencedRelation: 'item';
            referencedColumns: ['name'];
          },
          {
            foreignKeyName: 'user_main_hobby_fkey';
            columns: ['main_hobby'];
            isOneToOne: false;
            referencedRelation: 'hobby';
            referencedColumns: ['name'];
          },
          {
            foreignKeyName: 'user_now_challenge_fkey';
            columns: ['now_challenge'];
            isOneToOne: false;
            referencedRelation: 'challenge';
            referencedColumns: ['name'];
          },
          {
            foreignKeyName: 'user_now_hobby_fkey';
            columns: ['now_hobby'];
            isOneToOne: false;
            referencedRelation: 'hobby';
            referencedColumns: ['name'];
          },
          {
            foreignKeyName: 'user_title_fkey';
            columns: ['title'];
            isOneToOne: false;
            referencedRelation: 'title';
            referencedColumns: ['name'];
          },
        ];
      };
      user_achievements: {
        Row: {
          achievement_id: string | null;
          id: string;
          user_id: string | null;
        };
        Insert: {
          achievement_id?: string | null;
          id?: string;
          user_id?: string | null;
        };
        Update: {
          achievement_id?: string | null;
          id?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'user_achievements_achievement_id_fkey';
            columns: ['achievement_id'];
            isOneToOne: false;
            referencedRelation: 'achievement';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_achievements_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['uid'];
          },
        ];
      };
      user_completed_challenges: {
        Row: {
          challenge_id: string | null;
          id: string;
          user_id: string | null;
        };
        Insert: {
          challenge_id?: string | null;
          id?: string;
          user_id?: string | null;
        };
        Update: {
          challenge_id?: string | null;
          id?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'user_completed_challenges_challenge_id_fkey';
            columns: ['challenge_id'];
            isOneToOne: false;
            referencedRelation: 'challenge';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_completed_challenges_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['uid'];
          },
        ];
      };
      user_having_items: {
        Row: {
          id: string;
          item_id: string | null;
          user_id: string | null;
        };
        Insert: {
          id?: string;
          item_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          id?: string;
          item_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'user_having_items_item_id_fkey';
            columns: ['item_id'];
            isOneToOne: false;
            referencedRelation: 'item';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_having_items_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['uid'];
          },
        ];
      };
      user_having_titles: {
        Row: {
          id: string;
          title_id: string | null;
          user_id: string | null;
        };
        Insert: {
          id?: string;
          title_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          id?: string;
          title_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'user_having_titles_title_id_fkey';
            columns: ['title_id'];
            isOneToOne: false;
            referencedRelation: 'title';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_having_titles_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['uid'];
          },
        ];
      };
      user_hobbies: {
        Row: {
          hobby_id: string | null;
          id: string;
          user_id: string | null;
        };
        Insert: {
          hobby_id?: string | null;
          id?: string;
          user_id?: string | null;
        };
        Update: {
          hobby_id?: string | null;
          id?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'user_hobbies_hobby_id_fkey';
            columns: ['hobby_id'];
            isOneToOne: false;
            referencedRelation: 'hobby';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_hobbies_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['uid'];
          },
        ];
      };
      user_on_challenges: {
        Row: {
          challenge_id: string | null;
          id: string;
          user_id: string | null;
        };
        Insert: {
          challenge_id?: string | null;
          id?: string;
          user_id?: string | null;
        };
        Update: {
          challenge_id?: string | null;
          id?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'user_on_challenges_challenge_id_fkey';
            columns: ['challenge_id'];
            isOneToOne: false;
            referencedRelation: 'challenge';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_on_challenges_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['uid'];
          },
        ];
      };
    };
    Views: Record<never, never>;
    Functions: Record<never, never>;
    Enums: {
      achievement_type: 'completed_challenges' | 'exp' | 'attendance_days';
      question_type:
        | 'select'
        | 'file'
        | 'descript'
        | 'fill'
        | 'short_descript'
        | 'not_question';
    };
    CompositeTypes: Record<never, never>;
  };
}

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | Exclude<PublicSchema['CompositeTypes'], never>
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;
