export interface LogbookContacts {
  firebase_id: string;
  uid: string;
  id?: string;
  
  // Required fields
  adi_imported: boolean;
  band: string;
  call_sign_search_index: string[];
  contact_time_stamp: Date;
  contest_id: string;
  country: string;
  date: Date;
  distance: number;
  frequency: string;
  grid: string;
  log_book: any; // JSONB type
  log_book_id: string;
  my_call_sign: string;
  my_city: string;
  my_coordinates: any; // JSONB type
  my_country: string;
  my_flag_code: string;
  my_name: string;
  my_profile_pic: string;
  my_state: string;
  my_state_long_name: string;
  notes: string;
  power: string;
  profile_call_sign: string;
  rst_r_c_v_d: Date; // Note: This might need to be string if it's a signal report
  rst_sent: string;
  state: string;
  state_long_name: string;
  tags: string[];
  their_callsign: string;
  their_coordinates: any; // JSONB type
  their_country: string;
  their_name: string;
  their_state: string;
  time: string;
  timestamp: Date;
  updated_at: Date;
  user_grid: string;
  user_mode: string;
  
  // Optional fields
  my_antenna?: string;
  my_radio?: string;
  name_search_index?: string[];
  operator?: string;
  qth?: string;
  their_city?: string;
  their_park?: string;
  user_qth?: string;
  active?: boolean;
  activities?: string[];
  activities_data?: any; // JSONB type
  activities_references?: string[];
  adi_error?: boolean;
  adi_file_name?: string;
  contact_TEXT?: string;
  error_message?: string;
  has_validation_errors?: boolean;
  my_activity_references?: string[];
  my_park?: Date; // Note: This might need to be string if storing park codes
  primary_activity?: string;
  raw_data?: any; // JSONB type
  their_activities?: string[];
  their_activity_references?: string[];
  validation_errors?: any; // JSONB type
  lotw_imported_on?: string;
  lotw_uploaded_on?: string;
  qrz_imported_on?: string;
  qrz_uploaded_on?: string;
  duplicate?: boolean;
  contest_points?: number;
  continent?: string;
  country_code?: string;
  cw?: number;
  digital?: number;
  dxcc_number?: number;
  exchange_one?: string;
  exchange_two?: string;
  flag_code?: string;
  is_w_f_d_contact?: boolean;
  item_index?: number;
  their_call_sign?: string;
  voice?: number;
  app_version?: string;
  contest_name?: string;
  created_at?: number;
  exchange_four?: string;
  exchange_three?: string;
  my_antenna_id?: string;
  my_name_search_index?: string[];
  my_radio_id?: string;
  my_saved_location_id?: string;
  their_address?: string;
  their_profile_pic?: string;
}