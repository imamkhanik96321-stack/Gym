export type UserRole = 'admin' | 'trainer' | 'receptionist' | 'member' | 'public';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone?: string;
  branch?: string;
  createdAt: string;
}

export interface Member {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  membershipPlanId: string;
  membershipPlanName: string;
  membershipStatus: 'active' | 'expired' | 'suspended' | 'trial';
  startDate: string;
  endDate: string;
  trainerId?: string;
  trainerName?: string;
  branch: string;
  qrCode: string;
  emergencyContact: string;
  weightKg: number;
  heightCm: number;
  targetWeightKg: number;
  age: number;
  gender: 'male' | 'female' | 'other';
  goal: 'muscle_gain' | 'fat_loss' | 'maintenance' | 'endurance' | 'rehab';
  joinedDate: string;
}

export interface Trainer {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  specialty: string[];
  rating: number;
  assignedMembersCount: number;
  experienceYears: number;
  branch: string;
  bio: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  durationMonths: number;
  description: string;
  features: string[];
  popular?: boolean;
  tier: 'basic' | 'pro' | 'elite';
}

export interface Payment {
  id: string;
  memberId: string;
  memberName: string;
  planName: string;
  amount: number;
  currency: string;
  paymentMethod: 'stripe' | 'upi' | 'cash' | 'razorpay';
  status: 'paid' | 'pending' | 'failed' | 'refunded';
  transactionId: string;
  invoiceId: string;
  date: string;
}

export interface Attendance {
  id: string;
  memberId: string;
  memberName: string;
  qrCode: string;
  checkInTime: string;
  checkOutTime?: string;
  branch: string;
  status: 'present' | 'late' | 'excused';
}

export interface Exercise {
  id: string;
  name: string;
  category: 'chest' | 'back' | 'legs' | 'shoulders' | 'arms' | 'core' | 'cardio';
  sets: number;
  reps: string;
  weightKg?: number;
  restSeconds: number;
  instructions: string;
  videoUrl?: string;
  completed?: boolean;
}

export interface WorkoutPlan {
  id: string;
  memberId: string;
  trainerId: string;
  title: string;
  goal: string;
  daysPerWeek: number;
  exercises: Exercise[];
  updatedAt: string;
}

export interface Meal {
  id: string;
  time: string;
  title: string;
  foodItems: string[];
  calories: number;
  proteinG: number;
  carbsG: number;
  fatsG: number;
  completed?: boolean;
}

export interface DietPlan {
  id: string;
  memberId: string;
  trainerId: string;
  title: string;
  targetCalories: number;
  targetProteinG: number;
  targetCarbsG: number;
  targetFatsG: number;
  meals: Meal[];
  waterTargetLiters: number;
  updatedAt: string;
}

export interface ClassSchedule {
  id: string;
  title: string;
  instructorName: string;
  instructorAvatar: string;
  startTime: string;
  durationMinutes: number;
  capacity: number;
  bookedCount: number;
  branch: string;
  category: 'HIIT' | 'Yoga' | 'Spinning' | 'CrossFit' | 'Boxing' | 'Pilates';
  room: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  memberId: string;
  memberName: string;
  memberEmail: string;
  planName: string;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  currency: string;
  issueDate: string;
  dueDate: string;
  status: 'paid' | 'unpaid' | 'overdue';
  paymentMethod: string;
}

export interface ProgressMeasurement {
  id: string;
  memberId: string;
  date: string;
  weightKg: number;
  chestCm: number;
  waistCm: number;
  bicepsCm: number;
  thighsCm: number;
  bodyFatPercentage?: number;
}

export interface ProgressPhoto {
  id: string;
  memberId: string;
  date: string;
  photoUrl: string;
  type: 'before' | 'after' | 'milestone';
  note?: string;
}

export interface SupportTicket {
  id: string;
  memberId: string;
  memberName: string;
  subject: string;
  category: 'billing' | 'workout' | 'facilities' | 'account';
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: string;
  lastReply: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  text: string;
  timestamp: string;
}

export interface TrialBooking {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTimeSlot: string;
  goal: string;
  branch: string;
  status: 'pending' | 'confirmed' | 'completed';
  createdAt: string;
}

export interface GymSettings {
  gymName: string;
  tagline: string;
  logo: string;
  currency: string;
  currencySymbol: string;
  taxRatePercent: number;
  branches: string[];
  emailNotificationsEnabled: boolean;
  whatsappNotificationsEnabled: boolean;
  stripeEnabled: boolean;
  upiEnabled: boolean;
  razorpayEnabled: boolean;
  primaryColor: string;
}
