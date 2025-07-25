/**
 * Defines the structure for a member's notification settings.
 * This is an embedded object within the Member entity, not a separate collection.
 */
export class EmailPreferences {
  weeklyDigest: boolean;
  instantAlerts: boolean;
}

export class NotificationPreferences {
  email: EmailPreferences;
  inApp: {
    enabled: boolean;
  };
}

export class InAppOption {
  enable: boolean;
}
