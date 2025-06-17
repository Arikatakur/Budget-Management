export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  description?: string;
  date: string;
  categoryId?: string;
}
