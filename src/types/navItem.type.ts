export type NavItem = {
  title: string;
  url?: string;
  icon?: React.ReactNode;
  end?: boolean;
  childLinks?: {
    title: string;
    url: string;
  }[];
};
