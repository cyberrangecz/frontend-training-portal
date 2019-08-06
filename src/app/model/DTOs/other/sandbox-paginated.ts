export interface SandboxPaginated<T> {
  count: number; //totalElements
  page_size: number,
  page_count: number,
  page: number;
  next: string;
  previous: string;
  results: T[];
}
