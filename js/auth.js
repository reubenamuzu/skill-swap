const SS_USERS_KEY = 'ss_users';
const SS_CURRENT_USER_KEY = 'ss_current_user';

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(SS_USERS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveUsers(arr) {
  localStorage.setItem(SS_USERS_KEY, JSON.stringify(arr));
}

function getCurrentUser() {
  const id = localStorage.getItem(SS_CURRENT_USER_KEY);
  if (!id) return null;
  const user = getUsers().find(u => u.id === id);
  return user || null;
}

function setCurrentUser(id) {
  localStorage.setItem(SS_CURRENT_USER_KEY, id);
}

function clearCurrentUser() {
  localStorage.removeItem(SS_CURRENT_USER_KEY);
}

function generateId() {
  return 'usr_' + Date.now();
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function guardPage() {
  if (!getCurrentUser()) {
    window.location.href = 'login.html';
  }
}

function getInitials(name) {
  if (!name || !name.trim()) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
