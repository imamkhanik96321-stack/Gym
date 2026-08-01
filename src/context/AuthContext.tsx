import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
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
import {
  initialGymSettings,
  initialPlans,
  initialTrainers,
  initialMembers,
  initialPayments,
  initialAttendances,
  initialWorkoutPlan,
  initialDietPlan,
  initialClasses,
  initialInvoices,
  initialSupportTickets,
  initialProgressMeasurements,
  initialProgressPhotos,
  initialTrialBookings,
} from '../data/initialData';

interface AuthContextType {
  currentRole: UserRole;
  currentUser: User | null;
  switchRole: (role: UserRole) => void;
  members: Member[];
  trainers: Trainer[];
  plans: MembershipPlan[];
  payments: Payment[];
  attendances: Attendance[];
  workoutPlan: WorkoutPlan;
  dietPlan: DietPlan;
  classes: ClassSchedule[];
  invoices: Invoice[];
  supportTickets: SupportTicket[];
  progressMeasurements: ProgressMeasurement[];
  progressPhotos: ProgressPhoto[];
  trialBookings: TrialBooking[];
  settings: GymSettings;
  activeBranch: string;
  setActiveBranch: (branch: string) => void;
  // Mutations
  addMember: (member: Omit<Member, 'id' | 'qrCode' | 'joinedDate'>) => void;
  updateMember: (id: string, updates: Partial<Member>) => void;
  deleteMember: (id: string) => void;
  recordCheckIn: (qrCode: string) => { success: boolean; message: string; member?: Member };
  addPayment: (payment: Omit<Payment, 'id' | 'date'>) => void;
  addTrialBooking: (booking: Omit<TrialBooking, 'id' | 'createdAt' | 'status'>) => void;
  bookClass: (classId: string) => void;
  updateWorkoutPlan: (plan: WorkoutPlan) => void;
  updateDietPlan: (plan: DietPlan) => void;
  toggleExerciseComplete: (exerciseId: string) => void;
  toggleMealComplete: (mealId: string) => void;
  addMeasurement: (measurement: Omit<ProgressMeasurement, 'id'>) => void;
  addProgressPhoto: (photo: Omit<ProgressPhoto, 'id'>) => void;
  updateSettings: (newSettings: Partial<GymSettings>) => void;
  resetAllData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: Record<UserRole, User> = {
  admin: {
    id: 'u-admin-1',
    name: 'Marcus Vance (Admin)',
    email: 'admin@irontemplefitness.in',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    branch: 'Central Connaught Place',
    createdAt: '2025-01-01',
  },
  trainer: {
    id: 'u-tr-1',
    name: 'Coach Marcus Vance',
    email: 'marcus@irontemplefitness.in',
    role: 'trainer',
    avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=150&auto=format&fit=crop&q=80',
    branch: 'Central Connaught Place',
    createdAt: '2025-02-10',
  },
  receptionist: {
    id: 'u-rec-1',
    name: 'Elena Rostova (Desk)',
    email: 'reception@irontemplefitness.in',
    role: 'receptionist',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    branch: 'Central Connaught Place',
    createdAt: '2025-03-15',
  },
  member: {
    id: 'u-mem-1',
    name: 'Alex Rivera (Member)',
    email: 'alex.rivera@example.com',
    role: 'member',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    branch: 'Central Connaught Place',
    createdAt: '2025-08-15',
  },
  public: {
    id: 'u-guest',
    name: 'Guest Visitor',
    email: 'guest@visitor.com',
    role: 'public',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-08-01',
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('public');
  const [currentUser, setCurrentUser] = useState<User | null>(DEMO_USERS.public);
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [trainers, setTrainers] = useState<Trainer[]>(initialTrainers);
  const [plans, setPlans] = useState<MembershipPlan[]>(initialPlans);
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [attendances, setAttendances] = useState<Attendance[]>(initialAttendances);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan>(initialWorkoutPlan);
  const [dietPlan, setDietPlan] = useState<DietPlan>(initialDietPlan);
  const [classes, setClasses] = useState<ClassSchedule[]>(initialClasses);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(initialSupportTickets);
  const [progressMeasurements, setProgressMeasurements] = useState<ProgressMeasurement[]>(initialProgressMeasurements);
  const [progressPhotos, setProgressPhotos] = useState<ProgressPhoto[]>(initialProgressPhotos);
  const [trialBookings, setTrialBookings] = useState<TrialBooking[]>(initialTrialBookings);
  const [settings, setSettings] = useState<GymSettings>(initialGymSettings);
  const [activeBranch, setActiveBranch] = useState<string>('All Branches');

  // Load from local storage if available
  useEffect(() => {
    try {
      const savedRole = localStorage.getItem('apex_role') as UserRole;
      if (savedRole && DEMO_USERS[savedRole]) {
        setCurrentRole(savedRole);
        setCurrentUser(DEMO_USERS[savedRole]);
      }
      const savedMembers = localStorage.getItem('apex_members');
      if (savedMembers) setMembers(JSON.parse(savedMembers));
      const savedPayments = localStorage.getItem('apex_payments');
      if (savedPayments) setPayments(JSON.parse(savedPayments));
    } catch {
      // Ignore storage error
    }
  }, []);

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    setCurrentUser(DEMO_USERS[role] || null);
    try {
      localStorage.setItem('apex_role', role);
    } catch {
      // ignore
    }
  };

  const addMember = (newMem: Omit<Member, 'id' | 'qrCode' | 'joinedDate'>) => {
    const id = `mem-${Date.now().toString().slice(-4)}`;
    const qrCode = `ITF-MEM-${Math.floor(100000 + Math.random() * 900000)}`;
    const joinedDate = new Date().toISOString().split('T')[0];
    const created: Member = { ...newMem, id, qrCode, joinedDate };
    const updated = [created, ...members];
    setMembers(updated);
    try {
      localStorage.setItem('apex_members', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const updateMember = (id: string, updates: Partial<Member>) => {
    const updated = members.map((m) => (m.id === id ? { ...m, ...updates } : m));
    setMembers(updated);
    try {
      localStorage.setItem('apex_members', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const deleteMember = (id: string) => {
    const updated = members.filter((m) => m.id !== id);
    setMembers(updated);
  };

  const recordCheckIn = (qrCode: string) => {
    const matchedMember = members.find(
      (m) => m.qrCode.toUpperCase() === qrCode.trim().toUpperCase() || m.id === qrCode || m.phone.includes(qrCode)
    );

    if (!matchedMember) {
      return { success: false, message: 'Invalid Barcode / Member QR Code Not Found' };
    }

    if (matchedMember.membershipStatus === 'expired' || matchedMember.membershipStatus === 'suspended') {
      return {
        success: false,
        message: `Membership ${matchedMember.membershipStatus.toUpperCase()}! Contact Reception Desk.`,
        member: matchedMember,
      };
    }

    const now = new Date();
    const timeStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newAttendance: Attendance = {
      id: `att-${Date.now()}`,
      memberId: matchedMember.id,
      memberName: matchedMember.name,
      qrCode: matchedMember.qrCode,
      checkInTime: timeStr,
      branch: matchedMember.branch,
      status: 'present',
    };

    setAttendances([newAttendance, ...attendances]);
    return {
      success: true,
      message: `Access Granted! Welcome ${matchedMember.name}.`,
      member: matchedMember,
    };
  };

  const addPayment = (p: Omit<Payment, 'id' | 'date'>) => {
    const id = `pay-${Date.now()}`;
    const date = new Date().toISOString().split('T')[0];
    const created: Payment = { ...p, id, date };
    setPayments([created, ...payments]);

    // Create Invoice
    const newInv: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      memberId: p.memberId,
      memberName: p.memberName,
      memberEmail: `${p.memberName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      planName: p.planName,
      subtotal: p.amount * 0.92,
      tax: p.amount * 0.08,
      discount: 0,
      total: p.amount,
      currency: p.currency,
      issueDate: date,
      dueDate: date,
      status: 'paid',
      paymentMethod: p.paymentMethod.toUpperCase(),
    };
    setInvoices([newInv, ...invoices]);
  };

  const addTrialBooking = (tb: Omit<TrialBooking, 'id' | 'createdAt' | 'status'>) => {
    const id = `tb-${Date.now()}`;
    const createdAt = new Date().toISOString().split('T')[0];
    const created: TrialBooking = { ...tb, id, createdAt, status: 'confirmed' };
    setTrialBookings([created, ...trialBookings]);
  };

  const bookClass = (classId: string) => {
    setClasses(
      classes.map((c) => {
        if (c.id === classId && c.bookedCount < c.capacity) {
          return { ...c, bookedCount: c.bookedCount + 1 };
        }
        return c;
      })
    );
  };

  const updateWorkoutPlan = (plan: WorkoutPlan) => setWorkoutPlan(plan);
  const updateDietPlan = (plan: DietPlan) => setDietPlan(plan);

  const toggleExerciseComplete = (exerciseId: string) => {
    setWorkoutPlan({
      ...workoutPlan,
      exercises: workoutPlan.exercises.map((ex) => (ex.id === exerciseId ? { ...ex, completed: !ex.completed } : ex)),
    });
  };

  const toggleMealComplete = (mealId: string) => {
    setDietPlan({
      ...dietPlan,
      meals: dietPlan.meals.map((m) => (m.id === mealId ? { ...m, completed: !m.completed } : m)),
    });
  };

  const addMeasurement = (m: Omit<ProgressMeasurement, 'id'>) => {
    const newM = { ...m, id: `pm-${Date.now()}` };
    setProgressMeasurements([...progressMeasurements, newM]);
  };

  const addProgressPhoto = (p: Omit<ProgressPhoto, 'id'>) => {
    const newP = { ...p, id: `pp-${Date.now()}` };
    setProgressPhotos([newP, ...progressPhotos]);
  };

  const updateSettings = (newSettings: Partial<GymSettings>) => {
    setSettings({ ...settings, ...newSettings });
  };

  const resetAllData = () => {
    setMembers(initialMembers);
    setTrainers(initialTrainers);
    setPlans(initialPlans);
    setPayments(initialPayments);
    setAttendances(initialAttendances);
    setWorkoutPlan(initialWorkoutPlan);
    setDietPlan(initialDietPlan);
    setClasses(initialClasses);
    setInvoices(initialInvoices);
    setSupportTickets(initialSupportTickets);
    setProgressMeasurements(initialProgressMeasurements);
    setProgressPhotos(initialProgressPhotos);
    setTrialBookings(initialTrialBookings);
    setSettings(initialGymSettings);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        currentRole,
        currentUser,
        switchRole,
        members,
        trainers,
        plans,
        payments,
        attendances,
        workoutPlan,
        dietPlan,
        classes,
        invoices,
        supportTickets,
        progressMeasurements,
        progressPhotos,
        trialBookings,
        settings,
        activeBranch,
        setActiveBranch,
        addMember,
        updateMember,
        deleteMember,
        recordCheckIn,
        addPayment,
        addTrialBooking,
        bookClass,
        updateWorkoutPlan,
        updateDietPlan,
        toggleExerciseComplete,
        toggleMealComplete,
        addMeasurement,
        addProgressPhoto,
        updateSettings,
        resetAllData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
