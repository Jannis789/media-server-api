// soll später über roles passieren


// Refactor guest_only to a readonly Record for better structure
const guest_only: Readonly<Record<string, string>> = {
  login: "/login",
};

export { guest_only };