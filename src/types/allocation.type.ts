export type Allocation = {
  name: string;
  value: number;
  fill: string;
};

export interface TAllocation {
  id: string;
  name: string;
  key: string;
  date: string;
  currentBalance: number;
  createdAt: string;
  updatedAt: string;
}

export type TAllocationKeyData = {
  starting_balance: number;
  ending_balance: number;
  notes: string;
  createdAt: string;
};
