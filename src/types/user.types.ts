export interface UserProfile {
  firebase_id?: string;
  uid?: string;
  address?: string;
  bio?: string;
  callSign?: string;
  callsignSearchIndex?: string[];
  city?: string;
  continent?: string;
  coordinates?: any; // JSONB type
  country?: string;
  countryCode?: string;
  cqZone?: number;
  dxccNumber?: number;
  email?: string;
  firstName?: string;
  flagCode?: string;
  gridSquare?: string;
  ituZone?: number;
  lastName?: string;
  nameSearchIndex?: string[];
  needsLocationOnboarding?: boolean;
  phoneNumber?: string;
  provideId?: string;
  state?: string;
  timestamp?: Date;
  lastContactModification?: Date;
  needsAggregation?: boolean;
  numberOfContactsImported?: number;
  quota?: any; // JSONB type
  savedLocationId?: string;
  hasStreak?: boolean;
  streakStats?: any; // JSONB type
  contests?: string[];
  stripeId?: string;
  stripeLink?: string;
  foundingMemberCount?: number;
  membershipStatus?: string;
  numberOfContacts?: number;
  settings?: any; // JSONB type
  spottingFilters?: any; // JSONB type
  subscriptionCanceledAt?: string;
  subscriptionCancelOnPeriodEnd?: string;
  subscriptionCreatedAt?: string;
  subscriptionEndedAt?: string;
  subscriptionStatus?: string;
  bands?: any; // JSONB type
  modes?: any; // JSONB type
  longBio?: string;
  stateLongName?: string;
  admin?: boolean;
  autoExportToQrzLotw?: boolean;
  defaultLogbookSettings?: any; // JSONB type
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  profilePic?: string;
  twitter?: string;
  activator?: any; // JSONB type
  activityGraphRepaired?: boolean;
  bugCount?: number;
  hunter?: any; // JSONB type
  spotsCreated?: number;
}