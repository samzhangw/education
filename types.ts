import React from 'react';

export type StudentCategory = 'high_school' | 'vocational' | 'junior_college' | 'freshman';

export interface AdmissionPath {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  details: string[];
  suitability: string;
  pros: string[]; // Advantages
  cons: string[]; // Disadvantages/Risks
  percentage?: string; // Estimated quota percentage
  link?: string; // Official website URL
}

export interface ImportantDate {
  date: string; // e.g., "2025-01-20" or "1月下旬"
  title: string;
  description: string;
  category: StudentCategory[];
  isHighlight: boolean;
}

export interface PreparationTip {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: StudentCategory | 'general';
  tags: string[];
  iconName?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}