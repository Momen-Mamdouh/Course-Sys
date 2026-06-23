import { Injectable, signal, computed } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Course } from '../interfaces/course';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private readonly STORAGE_KEY = 'courses';
  private courses = signal<Course[]>(this.loadCourses());
  private idCounter = signal(this.computeNextId());

  readonly courseCount = computed(() => this.courses().length);

  getCourses(): Observable<Course[]> {
    return of([...this.courses()]).pipe(delay(300));
  }

  getCourseById(id: number): Observable<Course | undefined> {
    const course = this.courses().find((c) => c.id === id);
    return of(course ? { ...course } : undefined).pipe(delay(200));
  }

  createCourse(course: Omit<Course, 'id' | 'createdDate'>): Observable<Course> {
    const newCourse: Course = {
      ...course,
      id: this.idCounter(),
      createdDate: new Date().toISOString().split('T')[0],
    };
    this.idCounter.update((id) => id + 1);
    this.courses.update((list) => [...list, newCourse]);
    this.persistCourses();
    return of({ ...newCourse }).pipe(delay(200));
  }

  updateCourse(id: number, changes: Partial<Course>): Observable<Course | null> {
    let updated: Course | null = null;
    this.courses.update((list) => {
      const index = list.findIndex((c) => c.id === id);
      if (index === -1) return list;
      updated = { ...list[index], ...changes, id };
      const copy = [...list];
      copy[index] = updated;
      return copy;
    });
    if (updated) this.persistCourses();
    return of(updated ? { ...(updated as Course) } : null).pipe(delay(200));
  }

  deleteCourse(id: number): Observable<boolean> {
    let found = false;
    this.courses.update((list) => {
      const filtered = list.filter((c) => c.id !== id);
      found = filtered.length < list.length;
      return filtered;
    });
    if (found) this.persistCourses();
    return of(found).pipe(delay(200));
  }

  searchCourses(query: string): Observable<Course[]> {
    const q = query.toLowerCase().trim();
    if (!q) return this.getCourses();
    const filtered = this.courses().filter((c) => c.courseName.toLowerCase().includes(q));
    return of(filtered).pipe(delay(200));
  }

  filterByStatus(status: string): Observable<Course[]> {
    if (!status || status === 'All') return this.getCourses();
    const filtered = this.courses().filter((c) => c.status === status);
    return of(filtered).pipe(delay(200));
  }

  private loadCourses(): Course[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) return JSON.parse(stored);
    return this.getDefaultCourses();
  }

  private persistCourses(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.courses()));
  }

  private computeNextId(): number {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      const courses: Course[] = JSON.parse(stored);
      return courses.length > 0 ? Math.max(...courses.map((c) => c.id)) + 1 : 1;
    }
    // Return 11 as ID if there is no stored courses in localStorage as all defaults are 10 ids from 1 to 10
    // And this function return the next ID from the last one we have
    return 11;
  }

  private getDefaultCourses(): Course[] {
    return [
      {
        id: 1,
        courseName: 'Introduction to Web Development',
        instructorName: 'Sarah Chen',
        category: 'Web Development',
        duration: 40,
        price: 299,
        status: 'Active',
        description:
          'Learn the fundamentals of HTML, CSS, and JavaScript to build modern websites from scratch.',
        createdDate: '2025-01-15',
      },
      {
        id: 2,
        courseName: 'Advanced Angular Architecture',
        instructorName: 'Marcus Johnson',
        category: 'Web Development',
        duration: 60,
        price: 499,
        status: 'Active',
        description:
          'Master Angular architecture patterns, state management, and enterprise application design.',
        createdDate: '2025-02-20',
      },
      {
        id: 3,
        courseName: 'Data Science with Python',
        instructorName: 'Emily Rodriguez',
        category: 'Data Science',
        duration: 50,
        price: 399,
        status: 'Draft',
        description:
          'Explore data analysis, visualization, and machine learning using Python ecosystems.',
        createdDate: '2025-03-10',
      },
      {
        id: 4,
        courseName: 'Cloud Computing Essentials',
        instructorName: 'David Kim',
        category: 'Cloud',
        duration: 35,
        price: 349,
        status: 'Active',
        description: 'Understand cloud infrastructure, AWS services, and deployment strategies.',
        createdDate: '2025-03-25',
      },
      {
        id: 5,
        courseName: 'React for Beginners',
        instructorName: 'Lisa Thompson',
        category: 'Web Development',
        duration: 45,
        price: 279,
        status: 'Archived',
        description:
          'Build interactive user interfaces with React, hooks, and component-based architecture.',
        createdDate: '2024-11-05',
      },
      {
        id: 6,
        courseName: 'Cybersecurity Fundamentals',
        instructorName: 'James Wilson',
        category: 'Security',
        duration: 30,
        price: 449,
        status: 'Active',
        description:
          'Learn network security, cryptography, threat detection, and security best practices.',
        createdDate: '2025-04-12',
      },
      {
        id: 7,
        courseName: 'Mobile App Development with Flutter',
        instructorName: 'Anna Martinez',
        category: 'Mobile',
        duration: 55,
        price: 529,
        status: 'Draft',
        description:
          'Create cross-platform mobile applications using Flutter and Dart programming language.',
        createdDate: '2025-05-01',
      },
      {
        id: 8,
        courseName: 'Machine Learning A-Z',
        instructorName: 'Dr. Robert Park',
        category: 'Data Science',
        duration: 70,
        price: 599,
        status: 'Active',
        description:
          'Comprehensive machine learning course covering supervised and unsupervised learning algorithms.',
        createdDate: '2025-01-28',
      },
      {
        id: 9,
        courseName: 'DevOps Pipeline Mastery',
        instructorName: 'Jennifer Lee',
        category: 'DevOps',
        duration: 40,
        price: 399,
        status: 'Active',
        description:
          'Automate CI/CD pipelines with Docker, Kubernetes, GitHub Actions, and infrastructure as code.',
        createdDate: '2025-04-05',
      },
      {
        id: 10,
        courseName: 'UI/UX Design Principles',
        instructorName: 'Michael Brown',
        category: 'Design',
        duration: 25,
        price: 249,
        status: 'Archived',
        description:
          'Learn user research, wireframing, prototyping, and visual design fundamentals.',
        createdDate: '2024-09-18',
      },
    ];
  }
}
