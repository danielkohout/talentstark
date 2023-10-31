export const makeUrlFriendly = (str: string | undefined): string => {
  if (!str) return ""; // oder irgendein anderer Standardwert
  return str.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-");
};
