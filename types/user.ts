/**
 * Represents a user with various attributes.
 */
export type User = {
  // Unique identifier for the user.
  id: number;

  // The username of the user.
  username: string;

  // The first name of the user.
  first_name: string;

  // The user's role or permission level.
  permission_role: string;

  // The date and time of the user's last login.
  last_login: string;

  // Indicates whether the user is a staff member (true/false).
  is_staff: boolean;

  // The date and time when the user joined.
  date_joined: string;

  // The last name of the user.
  last_name: string;

  // The email address associated with the user.
  email: string;

  // Indicates whether the user's account is verified (true/false).
  is_verified: boolean;

  // Indicates the type of the user's account (true/false).
  account_type: boolean;

  // Indicates whether the user has logged in using Google authentication (true/false).
  googleLogin: boolean;

  // The URL or path to the user's profile image.
  image: string;

  // A unique identifier (UUID) associated with the user.
  uuid: string;
};
