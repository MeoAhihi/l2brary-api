export enum Permission {
  // User permissions
  READ_USER = 'read:user',
  WRITE_USER = 'write:user',
  DELETE_USER = 'delete:user',

  // Book permissions
  READ_BOOK = 'read:book',
  WRITE_BOOK = 'write:book',
  DELETE_BOOK = 'delete:book',

  // Loan permissions
  READ_LOAN = 'read:loan',
  WRITE_LOAN = 'write:loan',
  DELETE_LOAN = 'delete:loan',

  // Admin permissions
  ADMIN = 'ADMIN'
}
