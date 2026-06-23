export interface Course {
  id: number;
  courseName: string;
  instructorName: string;
  category: string;
  duration: number;
  price: number;
  status: 'Active' | 'Draft' | 'Archived';
  description?: string;
  createdDate: string;
}
