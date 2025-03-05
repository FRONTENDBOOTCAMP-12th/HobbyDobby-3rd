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
          condition: string;
          id: number;
          max_progress: number;
          name: string;
          reward: string;
        };
        Insert: {
          condition: string;
          id?: number;
          max_progress: number;
          name: string;
          reward: string;
        };
        Update: {
          condition?: string;
          id?: number;
          max_progress?: number;
          name?: string;
          reward?: string;
        };
        Relationships: [];
      };
      challenge: {
        Row: {
          completed_date: string | null;
          created_date: string | null;
          id: number;
          name: string;
          progress: string | null;
          sub_hobby_id: number | null;
        };
        Insert: {
          completed_date?: string | null;
          created_date?: string | null;
          id?: number;
          name: string;
          progress?: string | null;
          sub_hobby_id?: number | null;
        };
        Update: {
          completed_date?: string | null;
          created_date?: string | null;
          id?: number;
          name?: string;
          progress?: string | null;
          sub_hobby_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'challenge_sub_hobby_id_fkey';
            columns: ['sub_hobby_id'];
            isOneToOne: false;
            referencedRelation: 'sub_hobby';
            referencedColumns: ['id'];
          },
        ];
      };
      hobby: {
        Row: {
          id: number;
          name: string;
        };
        Insert: {
          id?: number;
          name: string;
        };
        Update: {
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      item: {
        Row: {
          id: number;
          image: string | null;
          name: string;
          price: number;
        };
        Insert: {
          id?: number;
          image?: string | null;
          name: string;
          price: number;
        };
        Update: {
          id?: number;
          image?: string | null;
          name?: string;
          price?: number;
        };
        Relationships: [];
      };
      sub_hobby: {
        Row: {
          hobby_id: number | null;
          id: number;
          name: string;
        };
        Insert: {
          hobby_id?: number | null;
          id?: number;
          name: string;
        };
        Update: {
          hobby_id?: number | null;
          id?: number;
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
          achievement_id: number | null;
          id: number;
          name: string;
        };
        Insert: {
          achievement_id?: number | null;
          id?: number;
          name: string;
        };
        Update: {
          achievement_id?: number | null;
          id?: number;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'title_achievement_id_fkey';
            columns: ['achievement_id'];
            isOneToOne: false;
            referencedRelation: 'achievement';
            referencedColumns: ['id'];
          },
        ];
      };
      unit: {
        Row: {
          id: number;
          level: string | null;
          name: string;
          question: string | null;
          section: number | null;
          sub_hobby_id: number | null;
        };
        Insert: {
          id?: number;
          level?: string | null;
          name: string;
          question?: string | null;
          section?: number | null;
          sub_hobby_id?: number | null;
        };
        Update: {
          id?: number;
          level?: string | null;
          name?: string;
          question?: string | null;
          section?: number | null;
          sub_hobby_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'unit_sub_hobby_id_fkey';
            columns: ['sub_hobby_id'];
            isOneToOne: false;
            referencedRelation: 'sub_hobby';
            referencedColumns: ['id'];
          },
        ];
      };
      user_achievements: {
        Row: {
          achievement_id: number;
          user_id: number;
        };
        Insert: {
          achievement_id: number;
          user_id: number;
        };
        Update: {
          achievement_id?: number;
          user_id?: number;
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
          challenge_id: number;
          user_id: number;
        };
        Insert: {
          challenge_id: number;
          user_id: number;
        };
        Update: {
          challenge_id?: number;
          user_id?: number;
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
          item_id: number;
          user_id: number;
        };
        Insert: {
          item_id: number;
          user_id: number;
        };
        Update: {
          item_id?: number;
          user_id?: number;
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
          title_id: number;
          user_id: number;
        };
        Insert: {
          title_id: number;
          user_id: number;
        };
        Update: {
          title_id?: number;
          user_id?: number;
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
          hobby_id: number;
          user_id: number;
        };
        Insert: {
          hobby_id: number;
          user_id: number;
        };
        Update: {
          hobby_id?: number;
          user_id?: number;
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
          challenge_id: number;
          user_id: number;
        };
        Insert: {
          challenge_id: number;
          user_id: number;
        };
        Update: {
          challenge_id?: number;
          user_id?: number;
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
      user: {
        Row: {
          created_date: string | null;
          exp: number | null;
          gem: number | null;
          id: string;
          image: string | null;
          item: number | null;
          main_hobby: number | null;
          nickname: string;
          now_challenge: number | null;
          now_hobby: number | null;
          password: string;
          title: number | null;
          uid: number;
        };
        Insert: {
          created_date?: string | null;
          exp?: number | null;
          gem?: number | null;
          id: string;
          image?: string | null;
          item?: number | null;
          main_hobby?: number | null;
          nickname: string;
          now_challenge?: number | null;
          now_hobby?: number | null;
          password: string;
          title?: number | null;
          uid?: number;
        };
        Update: {
          created_date?: string | null;
          exp?: number | null;
          gem?: number | null;
          id?: string;
          image?: string | null;
          item?: number | null;
          main_hobby?: number | null;
          nickname?: string;
          now_challenge?: number | null;
          now_hobby?: number | null;
          password?: string;
          title?: number | null;
          uid?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'user_item_fkey';
            columns: ['item'];
            isOneToOne: false;
            referencedRelation: 'item';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_main_hobby_fkey';
            columns: ['main_hobby'];
            isOneToOne: false;
            referencedRelation: 'hobby';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_now_challenge_fkey';
            columns: ['now_challenge'];
            isOneToOne: false;
            referencedRelation: 'challenge';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_now_hobby_fkey';
            columns: ['now_hobby'];
            isOneToOne: false;
            referencedRelation: 'hobby';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_title_fkey';
            columns: ['title'];
            isOneToOne: false;
            referencedRelation: 'title';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: Record<never, never>;
    Functions: Record<never, never>;
    Enums: Record<never, never>;
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
    | Exclude<PublicSchema['Enums'], never>
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
