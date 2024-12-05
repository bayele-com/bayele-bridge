export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ad_categories: {
        Row: {
          display_order: number | null
          icon: string | null
          id: string
          name: string
          parent_id: string | null
          slug: string
        }
        Insert: {
          display_order?: number | null
          icon?: string | null
          id?: string
          name: string
          parent_id?: string | null
          slug: string
        }
        Update: {
          display_order?: number | null
          icon?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "ad_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "ad_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      ad_interactions: {
        Row: {
          ad_id: string | null
          created_at: string | null
          id: string
          interaction_type: string
          metadata: Json | null
          user_ip_hash: string | null
        }
        Insert: {
          ad_id?: string | null
          created_at?: string | null
          id?: string
          interaction_type: string
          metadata?: Json | null
          user_ip_hash?: string | null
        }
        Update: {
          ad_id?: string | null
          created_at?: string | null
          id?: string
          interaction_type?: string
          metadata?: Json | null
          user_ip_hash?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_interactions_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "admin_pending_ads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ad_interactions_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "classified_ads"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliate_earnings: {
        Row: {
          affiliate_id: string | null
          amount: number
          created_at: string | null
          id: string
          link_id: string | null
          payout_date: string | null
          status: string | null
        }
        Insert: {
          affiliate_id?: string | null
          amount: number
          created_at?: string | null
          id?: string
          link_id?: string | null
          payout_date?: string | null
          status?: string | null
        }
        Update: {
          affiliate_id?: string | null
          amount?: number
          created_at?: string | null
          id?: string
          link_id?: string | null
          payout_date?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_earnings_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "affiliate_earnings_link_id_fkey"
            columns: ["link_id"]
            isOneToOne: false
            referencedRelation: "affiliate_links"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliate_links: {
        Row: {
          affiliate_id: string | null
          created_at: string | null
          id: string
          metadata: Json | null
          product_id: string | null
          status: string | null
          unique_code: string
          updated_at: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          affiliate_id?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          product_id?: string | null
          status?: string | null
          unique_code: string
          updated_at?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          affiliate_id?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          product_id?: string | null
          status?: string | null
          unique_code?: string
          updated_at?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_links_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "affiliate_links_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      classified_ads: {
        Row: {
          ad_type: string
          approved_at: string | null
          approved_by: string | null
          category: string
          contact_info: Json
          created_at: string | null
          description: string
          expires_at: string | null
          featured: boolean | null
          id: string
          image_urls: string[] | null
          location: string | null
          metadata: Json | null
          price: number | null
          rejection_reason: string | null
          status: string | null
          subcategory: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          ad_type: string
          approved_at?: string | null
          approved_by?: string | null
          category: string
          contact_info: Json
          created_at?: string | null
          description: string
          expires_at?: string | null
          featured?: boolean | null
          id?: string
          image_urls?: string[] | null
          location?: string | null
          metadata?: Json | null
          price?: number | null
          rejection_reason?: string | null
          status?: string | null
          subcategory?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          ad_type?: string
          approved_at?: string | null
          approved_by?: string | null
          category?: string
          contact_info?: Json
          created_at?: string | null
          description?: string
          expires_at?: string | null
          featured?: boolean | null
          id?: string
          image_urls?: string[] | null
          location?: string | null
          metadata?: Json | null
          price?: number | null
          rejection_reason?: string | null
          status?: string | null
          subcategory?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "classified_ads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      districts: {
        Row: {
          city: Database["public"]["Enums"]["city_name"]
          created_at: string
          id: string
          name: string
        }
        Insert: {
          city: Database["public"]["Enums"]["city_name"]
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          city?: Database["public"]["Enums"]["city_name"]
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      link_analytics: {
        Row: {
          click_timestamp: string | null
          conversion_status: boolean | null
          created_at: string | null
          id: string
          ip_hash: string | null
          link_id: string | null
          referrer: string | null
          user_agent: string | null
        }
        Insert: {
          click_timestamp?: string | null
          conversion_status?: boolean | null
          created_at?: string | null
          id?: string
          ip_hash?: string | null
          link_id?: string | null
          referrer?: string | null
          user_agent?: string | null
        }
        Update: {
          click_timestamp?: string | null
          conversion_status?: boolean | null
          created_at?: string | null
          id?: string
          ip_hash?: string | null
          link_id?: string | null
          referrer?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "link_analytics_link_id_fkey"
            columns: ["link_id"]
            isOneToOne: false
            referencedRelation: "affiliate_links"
            referencedColumns: ["id"]
          },
        ]
      }
      neighborhoods: {
        Row: {
          city: Database["public"]["Enums"]["city_name"]
          created_at: string
          district_id: string | null
          id: string
          name: string
        }
        Insert: {
          city: Database["public"]["Enums"]["city_name"]
          created_at?: string
          district_id?: string | null
          id?: string
          name: string
        }
        Update: {
          city?: Database["public"]["Enums"]["city_name"]
          created_at?: string
          district_id?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "neighborhoods_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
        ]
      }
      order_details: {
        Row: {
          created_at: string | null
          delivery_address:
            | Database["public"]["CompositeTypes"]["delivery_address_type"]
            | null
          email: string
          full_name: string
          id: string
          notes: string | null
          order_id: string | null
          phone: string | null
        }
        Insert: {
          created_at?: string | null
          delivery_address?:
            | Database["public"]["CompositeTypes"]["delivery_address_type"]
            | null
          email: string
          full_name: string
          id?: string
          notes?: string | null
          order_id?: string | null
          phone?: string | null
        }
        Update: {
          created_at?: string | null
          delivery_address?:
            | Database["public"]["CompositeTypes"]["delivery_address_type"]
            | null
          email?: string
          full_name?: string
          id?: string
          notes?: string | null
          order_id?: string | null
          phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_details_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_status_history: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          notes: string | null
          order_id: string | null
          status: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          notes?: string | null
          order_id?: string | null
          status: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          notes?: string | null
          order_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_status_history_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_status_history_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          affiliate_earnings: number | null
          affiliate_id: string | null
          business_id: string | null
          commission_amount: number
          created_at: string | null
          customer_id: string | null
          id: string
          metadata: Json | null
          payment_method: string | null
          payment_status: string | null
          platform_fee: number | null
          product_id: string | null
          status: string | null
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          affiliate_earnings?: number | null
          affiliate_id?: string | null
          business_id?: string | null
          commission_amount: number
          created_at?: string | null
          customer_id?: string | null
          id?: string
          metadata?: Json | null
          payment_method?: string | null
          payment_status?: string | null
          platform_fee?: number | null
          product_id?: string | null
          status?: string | null
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          affiliate_earnings?: number | null
          affiliate_id?: string | null
          business_id?: string | null
          commission_amount?: number
          created_at?: string | null
          customer_id?: string | null
          id?: string
          metadata?: Json | null
          payment_method?: string | null
          payment_status?: string | null
          platform_fee?: number | null
          product_id?: string | null
          status?: string | null
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          business_id: string | null
          category: string
          commission_rate: number
          created_at: string | null
          description: string | null
          id: string
          image_urls: string[] | null
          metadata: Json | null
          name: string
          price: number
          status: string | null
          updated_at: string | null
        }
        Insert: {
          business_id?: string | null
          category: string
          commission_rate: number
          created_at?: string | null
          description?: string | null
          id?: string
          image_urls?: string[] | null
          metadata?: Json | null
          name: string
          price: number
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          business_id?: string | null
          category?: string
          commission_rate?: number
          created_at?: string | null
          description?: string | null
          id?: string
          image_urls?: string[] | null
          metadata?: Json | null
          name?: string
          price?: number
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          updated_at: string
          user_type: Database["public"]["Enums"]["user_type"]
          whatsapp_number: string | null
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          updated_at?: string
          user_type: Database["public"]["Enums"]["user_type"]
          whatsapp_number?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_type?: Database["public"]["Enums"]["user_type"]
          whatsapp_number?: string | null
        }
        Relationships: []
      }
      rental_properties: {
        Row: {
          address: string | null
          bathrooms: number | null
          bedrooms: number | null
          city: Database["public"]["Enums"]["city_name"]
          contact_info: Json
          created_at: string
          description: string
          features: Json | null
          id: string
          image_urls: string[] | null
          neighborhood_id: string
          price: number
          property_type: string
          status: string | null
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          address?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          city: Database["public"]["Enums"]["city_name"]
          contact_info?: Json
          created_at?: string
          description: string
          features?: Json | null
          id?: string
          image_urls?: string[] | null
          neighborhood_id: string
          price: number
          property_type: string
          status?: string | null
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          address?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          city?: Database["public"]["Enums"]["city_name"]
          contact_info?: Json
          created_at?: string
          description?: string
          features?: Json | null
          id?: string
          image_urls?: string[] | null
          neighborhood_id?: string
          price?: number
          property_type?: string
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rental_properties_neighborhood_id_fkey"
            columns: ["neighborhood_id"]
            isOneToOne: false
            referencedRelation: "neighborhoods"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      admin_pending_ads: {
        Row: {
          ad_type: string | null
          category: string | null
          created_at: string | null
          id: string | null
          location: string | null
          price: number | null
          status: string | null
          submitter_email: string | null
          submitter_name: string | null
          title: string | null
        }
        Relationships: []
      }
      affiliate_earnings_summary: {
        Row: {
          affiliate_id: string | null
          affiliate_name: string | null
          first_sale_date: string | null
          last_sale_date: string | null
          total_earnings: number | null
          total_sales: number | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      business_commission_summary: {
        Row: {
          business_id: string | null
          business_name: string | null
          total_affiliate_earnings: number | null
          total_commission_paid: number | null
          total_orders: number | null
          total_platform_fees: number | null
          total_sales: number | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      insert_neighborhoods: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      city_name: "Yaounde" | "Douala"
      user_type: "affiliate" | "business" | "user" | "admin"
    }
    CompositeTypes: {
      delivery_address_type: {
        address: string | null
        city: string | null
        state: string | null
        zipcode: string | null
      }
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
