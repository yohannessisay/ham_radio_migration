import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.config";

export class UserProfile extends Model {}

UserProfile.init(
  {
    // Composite Primary Key
    firebase_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    uid: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },

    // Required Fields
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    callSign: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'call_sign',
    },
    callsignSearchIndex: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      field: 'callsign_search_index',
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coordinates: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    countryCode: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'country_code',
    },
    cqZone: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      field: 'cq_zone',
    },
    dxccNumber: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      field: 'dxcc_number',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'first_name',
    },
    flagCode: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'flag_code',
    },
    gridSquare: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'grid_square',
    },
    ituZone: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      field: 'itu_zone',
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'last_name',
    },
    nameSearchIndex: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      field: 'name_search_index',
    },
    needsLocationOnboarding: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'needs_location_onboarding',
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'phone_number',
    },
    provideId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'provide_id',
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    // Optional Fields
    lastContactModification: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'last_contact_modification',
    },
    needsAggregation: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'needs_aggregation',
    },
    numberOfContactsImported: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      field: 'number_of_contacts_imported',
    },
    quota: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    savedLocationId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'saved_location_id',
    },
    hasStreak: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'has_streak',
    },
    streakStats: {
      type: DataTypes.JSONB,
      allowNull: true,
      field: 'streak_stats',
    },
    contests: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    stripeId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'stripe_id',
    },
    stripeLink: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'stripe_link',
    },
    foundingMemberCount: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      field: 'founding_member_count',
    },
    membershipStatus: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'membership_status',
    },
    numberOfContacts: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      field: 'number_of_contacts',
    },
    settings: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    spottingFilters: {
      type: DataTypes.JSONB,
      allowNull: true,
      field: 'spotting_filters',
    },
    subscriptionCanceledAt: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'subscription_canceled_at',
    },
    subscriptionCancelOnPeriodEnd: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'subscription_cancel_on_period_end',
    },
    subscriptionCreatedAt: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'subscription_created_at',
    },
    subscriptionEndedAt: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'subscription_ended_at',
    },
    subscriptionStatus: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'subscription_status',
    },
    bands: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    modes: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    longBio: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'long_bio',
    },
    stateLongName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'state_long_name',
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    autoExportToQrzLotw: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'auto_export_to_qrz_lotw',
    },
    defaultLogbookSettings: {
      type: DataTypes.JSONB,
      allowNull: true,
      field: 'default_logbook_settings',
    },
    facebook: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    instagram: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkedin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profilePic: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'profile_pic',
    },
    twitter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    activator: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    activityGraphRepaired: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'activity_graph_repaired',
    },
    bugCount: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      field: 'bug_count',
    },
    hunter: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    spotsCreated: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      field: 'spots_created',
    },
  },
  {
    sequelize,
    tableName: 'UserProfile',
    modelName: 'UserProfile',
    timestamps: false, // We manage time manually
    indexes: [
      {
        fields: ['callSign'], // JS field name
        name: 'userprofile_call_sign_idx',
      },
      {
        fields: ['uid'],
        name: 'userprofile_uid_idx',
      },
      {
        fields: ['email'],
        name: 'userprofile_email_idx',
      },
      {
        fields: ['timestamp'],
        name: 'userprofile_timestamp_idx',
      },
    ],
  }
);