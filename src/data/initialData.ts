import {
  Member,
  Trainer,
  MembershipPlan,
  Payment,
  Attendance,
  WorkoutPlan,
  DietPlan,
  ClassSchedule,
  Invoice,
  SupportTicket,
  ProgressMeasurement,
  ProgressPhoto,
  TrialBooking,
  GymSettings,
} from '../types';

export const initialGymSettings: GymSettings = {
  gymName: 'Royal Fitness Club',
  tagline: 'Train Like Royalty. Perform Like a Champion.',
  logo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=150&auto=format&fit=crop&q=80',
  currency: 'INR',
  currencySymbol: '₹',
  taxRatePercent: 18,
  branches: ['Central Connaught Place', 'Bandra Elite Center', 'Indiranagar Hub'],
  emailNotificationsEnabled: true,
  whatsappNotificationsEnabled: true,
  stripeEnabled: true,
  upiEnabled: true,
  razorpayEnabled: true,
  primaryColor: '#FF6A00',
};

export const initialPlans: MembershipPlan[] = [
  {
    id: 'plan-1',
    name: 'Basic Strength',
    price: 1999,
    durationMonths: 1,
    description: 'Perfect for independent lifters seeking top-tier facility access.',
    features: [
      'Full Gym Floor Access (All Hours)',
      'Locker & Shower Access',
      'Digital Attendance QR Pass',
      'Basic Mobile App Portal',
      'Free WiFi & Water Station',
    ],
    tier: 'basic',
  },
  {
    id: 'plan-2',
    name: 'Pro Performance',
    price: 3499,
    durationMonths: 1,
    description: 'Our most popular plan with group classes and custom workout tracking.',
    features: [
      'All Basic Strength Features',
      'Unlimited Group Fitness Classes',
      'Monthly Certified Trainer Consultation',
      'Personalized Digital Workout & Diet Plan',
      'InBody Composition Analysis (1x/month)',
      'Sauna & Steam Bath Pass',
    ],
    popular: true,
    tier: 'pro',
  },
  {
    id: 'plan-3',
    name: 'Elite VIP Athlete',
    price: 5999,
    durationMonths: 1,
    description: 'Unrestricted VIP experience with dedicated 1-on-1 coaching & recovery suite.',
    features: [
      'All Pro Performance Features',
      'Dedicated 1-on-1 Personal Trainer (2x/week)',
      'Customized Precision Nutrition Protocol',
      'VIP Recovery Suite & Cryotherapy',
      'Multi-Branch All-Access Pass',
      'Free Apparel & Protein Shake Pass',
    ],
    tier: 'elite',
  },
];

export const initialTrainers: Trainer[] = [
  {
    id: 'tr-1',
    userId: 'u-tr-1',
    name: 'Coach Marcus Vance',
    email: 'marcus@royalfitnessclub.in',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=300&auto=format&fit=crop&q=80',
    specialty: ['Hypertrophy', 'Powerlifting', 'Rehabilitation'],
    rating: 4.9,
    assignedMembersCount: 18,
    experienceYears: 8,
    branch: 'Central Connaught Place',
    bio: 'Former national lifting coach dedicated to building strength and injury-proof body structures.',
  },
  {
    id: 'tr-2',
    userId: 'u-tr-2',
    name: 'Sarah Jenkins',
    email: 'sarah@royalfitnessclub.in',
    phone: '+91 98765 43211',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    specialty: ['Fat Loss', 'HIIT', 'Functional Mobility'],
    rating: 4.95,
    assignedMembersCount: 22,
    experienceYears: 6,
    branch: 'Bandra Elite Center',
    bio: 'Specialist in rapid fat loss protocols and posture optimization for high-stress executives.',
  },
  {
    id: 'tr-3',
    userId: 'u-tr-3',
    name: 'David Chen',
    email: 'david@royalfitnessclub.in',
    phone: '+91 98765 43212',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    specialty: ['CrossFit', 'Endurance Athleticism', 'Calisthenics'],
    rating: 4.85,
    assignedMembersCount: 15,
    experienceYears: 5,
    branch: 'Indiranagar Hub',
    bio: 'CrossFit regional competitor focusing on metabolic conditioning and explosive power.',
  },
];

export const initialMembers: Member[] = [
  {
    id: 'mem-1',
    userId: 'u-mem-1',
    name: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    phone: '+1 (555) 111-2233',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
    membershipPlanId: 'plan-2',
    membershipPlanName: 'Pro Performance',
    membershipStatus: 'active',
    startDate: '2026-01-10',
    endDate: '2026-08-10',
    trainerId: 'tr-1',
    trainerName: 'Coach Marcus Vance',
    branch: 'Central Connaught Place',
    qrCode: 'RFC-MEM-884920',
    emergencyContact: 'Maria Rivera (+1 555-999-8877)',
    weightKg: 78.5,
    heightCm: 178,
    targetWeightKg: 74.0,
    age: 28,
    gender: 'male',
    goal: 'muscle_gain',
    joinedDate: '2025-08-15',
  },
  {
    id: 'mem-2',
    userId: 'u-mem-2',
    name: 'Elena Rostova',
    email: 'elena.r@example.com',
    phone: '+1 (555) 222-3344',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
    membershipPlanId: 'plan-3',
    membershipPlanName: 'Elite VIP Athlete',
    membershipStatus: 'active',
    startDate: '2026-02-01',
    endDate: '2026-09-01',
    trainerId: 'tr-2',
    trainerName: 'Sarah Jenkins',
    branch: 'Bandra Elite Center',
    qrCode: 'RFC-MEM-330192',
    emergencyContact: 'Dmitri Rostov (+1 555-888-7766)',
    weightKg: 62.0,
    heightCm: 167,
    targetWeightKg: 58.0,
    age: 31,
    gender: 'female',
    goal: 'fat_loss',
    joinedDate: '2026-02-01',
  },
  {
    id: 'mem-3',
    userId: 'u-mem-3',
    name: 'Jordan Smith',
    email: 'jordan.s@example.com',
    phone: '+1 (555) 333-4455',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    membershipPlanId: 'plan-1',
    membershipPlanName: 'Basic Strength',
    membershipStatus: 'expired',
    startDate: '2025-12-01',
    endDate: '2026-06-01',
    trainerId: 'tr-3',
    trainerName: 'David Chen',
    branch: 'Indiranagar Hub',
    qrCode: 'RFC-MEM-771029',
    emergencyContact: 'Taylor Smith (+1 555-777-6655)',
    weightKg: 85.0,
    heightCm: 182,
    targetWeightKg: 80.0,
    age: 35,
    gender: 'male',
    goal: 'endurance',
    joinedDate: '2025-12-01',
  },
  {
    id: 'mem-4',
    userId: 'u-mem-4',
    name: 'Sophia Martinez',
    email: 'sophia.m@example.com',
    phone: '+1 (555) 444-5566',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
    membershipPlanId: 'plan-2',
    membershipPlanName: 'Pro Performance',
    membershipStatus: 'trial',
    startDate: '2026-07-28',
    endDate: '2026-08-04',
    trainerId: 'tr-2',
    trainerName: 'Sarah Jenkins',
    branch: 'Central Connaught Place',
    qrCode: 'RFC-MEM-119284',
    emergencyContact: 'Carlos Martinez (+1 555-666-5544)',
    weightKg: 59.0,
    heightCm: 165,
    targetWeightKg: 56.0,
    age: 26,
    gender: 'female',
    goal: 'maintenance',
    joinedDate: '2026-07-28',
  },
];

export const initialPayments: Payment[] = [
  {
    id: 'pay-101',
    memberId: 'mem-1',
    memberName: 'Alex Rivera',
    planName: 'Pro Performance',
    amount: 3499,
    currency: '₹',
    paymentMethod: 'upi',
    status: 'paid',
    transactionId: 'txn_3M2918841902',
    invoiceId: 'INV-2026-001',
    date: '2026-07-10',
  },
  {
    id: 'pay-102',
    memberId: 'mem-2',
    memberName: 'Elena Rostova',
    planName: 'Elite VIP Athlete',
    amount: 5999,
    currency: '₹',
    paymentMethod: 'razorpay',
    status: 'paid',
    transactionId: 'txn_9P2019481203',
    invoiceId: 'INV-2026-002',
    date: '2026-07-12',
  },
  {
    id: 'pay-103',
    memberId: 'mem-3',
    memberName: 'Jordan Smith',
    planName: 'Basic Strength',
    amount: 1999,
    currency: '₹',
    paymentMethod: 'cash',
    status: 'paid',
    transactionId: 'txn_CASH_88301',
    invoiceId: 'INV-2026-003',
    date: '2026-06-01',
  },
];

export const initialAttendances: Attendance[] = [
  {
    id: 'att-1',
    memberId: 'mem-1',
    memberName: 'Alex Rivera',
    qrCode: 'RFC-MEM-884920',
    checkInTime: '2026-08-01 07:15 AM',
    branch: 'Central Connaught Place',
    status: 'present',
  },
  {
    id: 'att-2',
    memberId: 'mem-2',
    memberName: 'Elena Rostova',
    qrCode: 'RFC-MEM-330192',
    checkInTime: '2026-08-01 08:30 AM',
    branch: 'Bandra Elite Center',
    status: 'present',
  },
  {
    id: 'att-3',
    memberId: 'mem-4',
    memberName: 'Sophia Martinez',
    qrCode: 'RFC-MEM-119284',
    checkInTime: '2026-08-01 09:05 AM',
    branch: 'Central Connaught Place',
    status: 'present',
  },
];

export const initialWorkoutPlan: WorkoutPlan = {
  id: 'wp-1',
  memberId: 'mem-1',
  trainerId: 'tr-1',
  title: 'Hypertrophy & Upper Body Power Split',
  goal: 'Lean Muscle Mass & Shoulder Width Expansion',
  daysPerWeek: 4,
  updatedAt: '2026-07-25',
  exercises: [
    {
      id: 'ex-1',
      name: 'Incline Barbell Bench Press',
      category: 'chest',
      sets: 4,
      reps: '8 - 10 reps',
      weightKg: 75,
      restSeconds: 90,
      instructions: 'Pause 1 second at chest level, drive explosively through upper chest.',
      videoUrl: 'https://www.youtube.com/embed/5CECBjd71yM',
      completed: true,
    },
    {
      id: 'ex-2',
      name: 'Weighted Pull-Ups',
      category: 'back',
      sets: 4,
      reps: '6 - 8 reps',
      weightKg: 10,
      restSeconds: 90,
      instructions: 'Squeeze lats at peak contraction and control 3-second eccentric descent.',
      videoUrl: 'https://www.youtube.com/embed/eGo4IYlbE5g',
      completed: true,
    },
    {
      id: 'ex-3',
      name: 'Seated Dumbbell Shoulder Press',
      category: 'shoulders',
      sets: 3,
      reps: '10 - 12 reps',
      weightKg: 24,
      restSeconds: 60,
      instructions: 'Maintain 75 degree bench angle, protect rotator cuff.',
      videoUrl: 'https://www.youtube.com/embed/qEwKCR5JCog',
      completed: false,
    },
    {
      id: 'ex-4',
      name: 'Cable Lateral Raises',
      category: 'shoulders',
      sets: 4,
      reps: '12 - 15 reps',
      weightKg: 12,
      restSeconds: 45,
      instructions: 'Slight forward lean, drive elbows outward toward side walls.',
      videoUrl: 'https://www.youtube.com/embed/PPro405qGEI',
      completed: false,
    },
    {
      id: 'ex-5',
      name: 'Incline Dumbbell Bicep Curls',
      category: 'arms',
      sets: 3,
      reps: '12 reps',
      weightKg: 14,
      restSeconds: 60,
      instructions: 'Full stretch at bottom, strict supination at peak contraction.',
      completed: false,
    },
  ],
};

export const initialDietPlan: DietPlan = {
  id: 'dp-1',
  memberId: 'mem-1',
  trainerId: 'tr-1',
  title: 'Lean Bulk High-Protein Nutrition Matrix',
  targetCalories: 2850,
  targetProteinG: 190,
  targetCarbsG: 320,
  targetFatsG: 75,
  waterTargetLiters: 4.0,
  updatedAt: '2026-07-26',
  meals: [
    {
      id: 'm-1',
      time: '07:30 AM',
      title: 'Power Anabolic Breakfast',
      foodItems: ['4 Whole Organic Eggs', '100g Rolled Oats with Blueberries', '1 Scoop Whey Isolate', '10g Almond Butter'],
      calories: 720,
      proteinG: 52,
      carbsG: 68,
      fatsG: 24,
      completed: true,
    },
    {
      id: 'm-2',
      time: '12:30 PM',
      title: 'High-Performance Lunch',
      foodItems: ['200g Grilled Chicken Breast', '220g Jasmine Rice', 'Steamed Broccoli & Olive Oil Drizzle'],
      calories: 780,
      proteinG: 58,
      carbsG: 82,
      fatsG: 18,
      completed: true,
    },
    {
      id: 'm-3',
      time: '04:30 PM',
      title: 'Pre-Workout Energy Boost',
      foodItems: ['1 Large Banana', '30g Whey Isolate Shake', '2 Rice Cakes with Honey'],
      calories: 450,
      proteinG: 32,
      carbsG: 70,
      fatsG: 4,
      completed: false,
    },
    {
      id: 'm-4',
      time: '08:00 PM',
      title: 'Recovery Dinner',
      foodItems: ['200g Wild Salmon Fillet', '250g Roasted Sweet Potato', 'Mixed Green Garden Salad'],
      calories: 700,
      proteinG: 48,
      carbsG: 60,
      fatsG: 22,
      completed: false,
    },
  ],
};

export const initialClasses: ClassSchedule[] = [
  {
    id: 'cls-1',
    title: 'HIIT Metabolic Burnout',
    instructorName: 'Sarah Jenkins',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    startTime: '07:00 AM',
    durationMinutes: 45,
    capacity: 20,
    bookedCount: 16,
    branch: 'Central Connaught Place',
    category: 'HIIT',
    room: 'Studio A - Thermo Zone',
    dayOfWeek: 'Monday',
  },
  {
    id: 'cls-2',
    title: 'Heavy Barbell Conditioning',
    instructorName: 'Coach Marcus Vance',
    instructorAvatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=300&auto=format&fit=crop&q=80',
    startTime: '05:30 PM',
    durationMinutes: 60,
    capacity: 15,
    bookedCount: 15,
    branch: 'Central Connaught Place',
    category: 'CrossFit',
    room: 'Main Rig Platform',
    dayOfWeek: 'Wednesday',
  },
  {
    id: 'cls-3',
    title: 'Core Stability & Recovery Pilates',
    instructorName: 'David Chen',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    startTime: '06:00 PM',
    durationMinutes: 50,
    capacity: 25,
    bookedCount: 19,
    branch: 'Uptown Executive',
    category: 'Pilates',
    room: 'Zen Recovery Suite',
    dayOfWeek: 'Friday',
  },
];

export const initialInvoices: Invoice[] = [
  {
    id: 'inv-1',
    invoiceNumber: 'INV-2026-001',
    memberId: 'mem-1',
    memberName: 'Alex Rivera',
    memberEmail: 'alex.rivera@example.com',
    planName: 'Pro Performance (1 Month)',
    subtotal: 82.41,
    tax: 6.59,
    discount: 0,
    total: 89.0,
    currency: '$',
    issueDate: '2026-07-10',
    dueDate: '2026-07-10',
    status: 'paid',
    paymentMethod: 'Stripe Card (**** 4242)',
  },
  {
    id: 'inv-2',
    invoiceNumber: 'INV-2026-002',
    memberId: 'mem-2',
    memberName: 'Elena Rostova',
    memberEmail: 'elena.r@example.com',
    planName: 'Elite VIP Athlete (1 Month)',
    subtotal: 147.22,
    tax: 11.78,
    discount: 0,
    total: 159.0,
    currency: '$',
    issueDate: '2026-07-12',
    dueDate: '2026-07-12',
    status: 'paid',
    paymentMethod: 'UPI Direct Transfer',
  },
];

export const initialSupportTickets: SupportTicket[] = [
  {
    id: 'st-1',
    memberId: 'mem-1',
    memberName: 'Alex Rivera',
    subject: 'Request to swap workout days due to business trip',
    category: 'workout',
    priority: 'medium',
    status: 'in_progress',
    createdAt: '2026-07-29',
    lastReply: 'Coach Marcus: Adjusted your chest/back split to Friday.',
  },
  {
    id: 'st-2',
    memberId: 'mem-3',
    memberName: 'Jordan Smith',
    subject: 'Inquiry on VIP sauna locker availability',
    category: 'facilities',
    priority: 'low',
    status: 'resolved',
    createdAt: '2026-07-15',
    lastReply: 'Front Desk: Reserved Locker #42 for your next visit.',
  },
];

export const initialProgressMeasurements: ProgressMeasurement[] = [
  { id: 'pm-1', memberId: 'mem-1', date: '2026-05-01', weightKg: 82.5, chestCm: 102, waistCm: 86, bicepsCm: 37, thighsCm: 58, bodyFatPercentage: 18.5 },
  { id: 'pm-2', memberId: 'mem-1', date: '2026-06-01', weightKg: 80.8, chestCm: 104, waistCm: 84, bicepsCm: 38, thighsCm: 59, bodyFatPercentage: 16.8 },
  { id: 'pm-3', memberId: 'mem-1', date: '2026-07-01', weightKg: 79.2, chestCm: 106, waistCm: 82, bicepsCm: 39, thighsCm: 60, bodyFatPercentage: 15.2 },
  { id: 'pm-4', memberId: 'mem-1', date: '2026-08-01', weightKg: 78.5, chestCm: 107, waistCm: 80, bicepsCm: 39.5, thighsCm: 61, bodyFatPercentage: 14.1 },
];

export const initialProgressPhotos: ProgressPhoto[] = [
  {
    id: 'pp-1',
    memberId: 'mem-1',
    date: '2025-08-15',
    photoUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&auto=format&fit=crop&q=80',
    type: 'before',
    note: 'Starting point: 84kg, body fat 20%',
  },
  {
    id: 'pp-2',
    memberId: 'mem-1',
    date: '2026-08-01',
    photoUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&auto=format&fit=crop&q=80',
    type: 'after',
    note: 'Current state: 78.5kg, body fat 14.1%, visible abs & shoulders!',
  },
];

export const initialTrialBookings: TrialBooking[] = [
  {
    id: 'tb-1',
    name: 'Michael Chang',
    email: 'm.chang@example.com',
    phone: '+91 98765 00011',
    preferredDate: '2026-08-03',
    preferredTimeSlot: '10:00 AM',
    goal: 'Hypertrophy & Strength',
    branch: 'Central Connaught Place',
    status: 'pending',
    createdAt: '2026-07-31',
  },
];

export const postgresSchemaSql = `-- =========================================================
-- ROYAL FITNESS CLUB ENTERPRISE POSTGRESQL / SUPABASE DATABASE SCHEMA
-- Generated automatically for production deployment
-- =========================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'trainer', 'receptionist', 'member')),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  avatar_url TEXT,
  branch VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. TRAINERS TABLE
CREATE TABLE IF NOT EXISTS trainers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  specialties TEXT[],
  rating NUMERIC(3,2) DEFAULT 5.0,
  experience_years INT DEFAULT 0,
  bio TEXT,
  assigned_members_count INT DEFAULT 0,
  branch VARCHAR(100)
);

-- 3. MEMBERSHIP PLANS TABLE
CREATE TABLE IF NOT EXISTS plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  duration_months INT NOT NULL,
  description TEXT,
  features TEXT[],
  tier VARCHAR(50) CHECK (tier IN ('basic', 'pro', 'elite')),
  is_popular BOOLEAN DEFAULT false
);

-- 4. MEMBERS TABLE
CREATE TABLE IF NOT EXISTS members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES plans(id),
  trainer_id UUID REFERENCES trainers(id),
  membership_status VARCHAR(50) CHECK (membership_status IN ('active', 'expired', 'suspended', 'trial')),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  qr_code VARCHAR(100) UNIQUE NOT NULL,
  emergency_contact TEXT,
  weight_kg NUMERIC(5,2),
  height_cm NUMERIC(5,2),
  target_weight_kg NUMERIC(5,2),
  age INT,
  gender VARCHAR(20),
  fitness_goal VARCHAR(50),
  branch VARCHAR(100),
  joined_date DATE DEFAULT CURRENT_DATE
);

-- 5. ATTENDANCE TABLE
CREATE TABLE IF NOT EXISTS attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID REFERENCES members(id) ON DELETE CASCADE,
  check_in_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  check_out_time TIMESTAMP WITH TIME ZONE,
  qr_code VARCHAR(100),
  branch VARCHAR(100),
  status VARCHAR(50) DEFAULT 'present'
);

-- 6. PAYMENTS & INVOICES TABLE
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID REFERENCES members(id),
  amount NUMERIC(10,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'USD',
  payment_method VARCHAR(50) CHECK (payment_method IN ('stripe', 'upi', 'cash', 'razorpay')),
  status VARCHAR(50) DEFAULT 'paid',
  transaction_id VARCHAR(255),
  invoice_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. WORKOUT PLANS & EXERCISES
CREATE TABLE IF NOT EXISTS workout_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID REFERENCES members(id) ON DELETE CASCADE,
  trainer_id UUID REFERENCES trainers(id),
  title VARCHAR(255) NOT NULL,
  goal TEXT,
  days_per_week INT DEFAULT 4,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS exercises (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workout_plan_id UUID REFERENCES workout_plans(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50),
  sets INT NOT NULL,
  reps VARCHAR(50) NOT NULL,
  weight_kg NUMERIC(5,2),
  rest_seconds INT DEFAULT 60,
  instructions TEXT,
  video_url TEXT
);

-- 8. DIET PLANS & MEALS
CREATE TABLE IF NOT EXISTS diet_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID REFERENCES members(id) ON DELETE CASCADE,
  trainer_id UUID REFERENCES trainers(id),
  title VARCHAR(255) NOT NULL,
  target_calories INT NOT NULL,
  target_protein_g INT,
  target_carbs_g INT,
  target_fats_g INT,
  water_target_liters NUMERIC(3,1) DEFAULT 3.5,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS meals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  diet_plan_id UUID REFERENCES diet_plans(id) ON DELETE CASCADE,
  time_slot VARCHAR(50),
  title VARCHAR(255) NOT NULL,
  food_items TEXT[],
  calories INT,
  protein_g INT,
  carbs_g INT,
  fats_g INT
);

-- INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_members_qr ON members(qr_code);
CREATE INDEX IF NOT EXISTS idx_attendance_checkin ON attendance(check_in_time);
CREATE INDEX IF NOT EXISTS idx_payments_member ON payments(member_id);
`;
