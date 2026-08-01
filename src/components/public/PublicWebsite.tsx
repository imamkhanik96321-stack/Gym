import React, { useState } from 'react';
import { motion } from 'motion/react';
import heroGymFallback from '../../assets/images/hero-gym.webp';
import { useAuth } from '../../context/AuthContext';
import { MembershipPlan } from '../../types';
import {
  Dumbbell,
  Crown,
  Flame,
  Zap,
  CheckCircle2,
  Calculator,
  ArrowRight,
  Star,
  Users,
  Building2,
  Clock,
  Sparkles,
  PhoneCall,
  Calendar,
  CreditCard,
  QrCode,
  Check,
  ShieldCheck,
  ChevronDown,
  HelpCircle,
  MessageSquare,
  MapPin,
  X,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Award,
  Video,
  Trophy,
  Image,
  Send,
} from 'lucide-react';

interface PublicWebsiteProps {
  onSelectRole?: (role: 'admin' | 'trainer' | 'receptionist' | 'member') => void;
  onSwitchToDashboard?: () => void;
}

export const PublicWebsite: React.FC<PublicWebsiteProps> = ({ onSelectRole, onSwitchToDashboard }) => {
  const { plans, trainers, addTrialBooking, addPayment, settings } = useAuth();

  const handleRoleSelect = (role: 'admin' | 'trainer' | 'receptionist' | 'member') => {
    if (onSelectRole) {
      onSelectRole(role);
    } else if (onSwitchToDashboard) {
      onSwitchToDashboard();
    }
  };

  // BMI State
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(26);
  // Metric Inputs
  const [heightCm, setHeightCm] = useState<number>(178);
  const [weightKg, setWeightKg] = useState<number>(75);
  // Imperial Inputs
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(10);
  const [weightLbs, setWeightLbs] = useState<number>(165);

  const [detailedBmi, setDetailedBmi] = useState<{
    bmi: number;
    category: 'Underweight' | 'Normal' | 'Overweight' | 'Obese';
    healthyRange: string;
    weightRec: string;
    calorieRec: number;
    tip: string;
  } | null>({
    bmi: 23.7,
    category: 'Normal',
    healthyRange: '18.5 – 24.9 BMI',
    weightRec: 'You are currently within your ideal weight range (58.6 kg – 78.9 kg). Maintain your streak!',
    calorieRec: 2550,
    tip: 'Optimize athletic performance and body composition by pairing heavy compound lifting 3x/week with high-intensity functional conditioning & mobility sessions.',
  });

  // Billing Toggle
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  // Modals
  const [showTrialModal, setShowTrialModal] = useState(false);
  const [selectedPlanForPurchase, setSelectedPlanForPurchase] = useState<MembershipPlan | null>(null);
  const [trialForm, setTrialForm] = useState({ name: '', email: '', phone: '', date: '', slot: '10:00 AM', goal: 'Hypertrophy & Strength', branch: settings.branches[0] });
  const [trialSubmitted, setTrialSubmitted] = useState(false);

  // Purchase Form
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'upi' | 'cash' | 'razorpay'>('stripe');
  const [purchaseMemberName, setPurchaseMemberName] = useState('');
  const [purchaseMemberEmail, setPurchaseMemberEmail] = useState('');
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  // Hero & Athlete Image State
  const [athleteImgSrc, setAthleteImgSrc] = useState<string>(
    'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=900&auto=format&fit=crop'
  );
  const [heroBgSrc, setHeroBgSrc] = useState<string>(
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auto=format&fit=crop'
  );

  // FAQ Accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleCalculateBmi = () => {
    let heightM = 0;
    let weightInKg = 0;

    if (unit === 'metric') {
      heightM = heightCm / 100;
      weightInKg = weightKg;
    } else {
      const totalInches = (heightFt * 12) + heightIn;
      heightM = totalInches * 0.0254;
      weightInKg = weightLbs * 0.453592;
    }

    if (!heightM || heightM <= 0 || !weightInKg || weightInKg <= 0) return;

    const bmiValue = parseFloat((weightInKg / (heightM * heightM)).toFixed(1));

    let category: 'Underweight' | 'Normal' | 'Overweight' | 'Obese' = 'Normal';
    if (bmiValue < 18.5) category = 'Underweight';
    else if (bmiValue < 25) category = 'Normal';
    else if (bmiValue < 30) category = 'Overweight';
    else category = 'Obese';

    // Healthy weight bounds
    const minIdealKg = 18.5 * heightM * heightM;
    const maxIdealKg = 24.9 * heightM * heightM;

    let weightRec = '';
    if (unit === 'metric') {
      if (category === 'Underweight') {
        const diff = (minIdealKg - weightInKg).toFixed(1);
        weightRec = `Target gaining approximately ${diff} kg to enter the healthy weight range (${minIdealKg.toFixed(1)} kg – ${maxIdealKg.toFixed(1)} kg).`;
      } else if (category === 'Normal') {
        weightRec = `You are currently within your ideal weight range (${minIdealKg.toFixed(1)} kg – ${maxIdealKg.toFixed(1)} kg). Maintain your streak!`;
      } else {
        const diff = (weightInKg - maxIdealKg).toFixed(1);
        weightRec = `Target losing approximately ${diff} kg to enter the healthy weight range (${minIdealKg.toFixed(1)} kg – ${maxIdealKg.toFixed(1)} kg).`;
      }
    } else {
      const minIdealLbs = minIdealKg * 2.20462;
      const maxIdealLbs = maxIdealKg * 2.20462;
      const weightInLbs = weightInKg * 2.20462;
      if (category === 'Underweight') {
        const diff = (minIdealLbs - weightInLbs).toFixed(1);
        weightRec = `Target gaining approx ${diff} lbs to enter healthy weight range (${minIdealLbs.toFixed(0)} lbs – ${maxIdealLbs.toFixed(0)} lbs).`;
      } else if (category === 'Normal') {
        weightRec = `You are currently within your ideal weight range (${minIdealLbs.toFixed(0)} lbs – ${maxIdealLbs.toFixed(0)} lbs). Great job!`;
      } else {
        const diff = (weightInLbs - maxIdealLbs).toFixed(1);
        weightRec = `Target losing approx ${diff} lbs to enter healthy weight range (${minIdealLbs.toFixed(0)} lbs – ${maxIdealLbs.toFixed(0)} lbs).`;
      }
    }

    // Calorie calculation (Mifflin-St Jeor)
    const bmr = (10 * weightInKg) + (6.25 * (heightM * 100)) - (5 * age) + (gender === 'male' ? 5 : -161);
    const maintenance = Math.round(bmr * 1.375); // moderate activity
    let calorieRec = maintenance;
    if (category === 'Underweight') calorieRec = maintenance + 450;
    else if (category === 'Overweight') calorieRec = maintenance - 400;
    else if (category === 'Obese') calorieRec = maintenance - 600;

    // Personalized tip
    let tip = '';
    if (category === 'Underweight') {
      tip = 'Prioritize progressive hypertrophy training 4x/week with a caloric surplus (+450 kcal). Focus on high protein intake (1.8g - 2.2g per kg) and compound lifts.';
    } else if (category === 'Normal') {
      tip = 'Optimize athletic performance and body composition by pairing heavy compound lifting 3x/week with high-intensity functional conditioning & mobility sessions.';
    } else if (category === 'Overweight') {
      tip = 'Combine multi-joint resistance training with 25-30 minutes of post-workout cardio. Maintain a 400 kcal deficit while keeping protein high to preserve muscle.';
    } else {
      tip = 'Begin with structured personal training, low-impact functional exercises, and sustainable nutritional adjustments. Focus on consistency and hydration.';
    }

    setDetailedBmi({
      bmi: bmiValue,
      category,
      healthyRange: '18.5 – 24.9 BMI',
      weightRec,
      calorieRec,
      tip,
    });
  };

  const handleTrialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTrialBooking({
      name: trialForm.name,
      email: trialForm.email,
      phone: trialForm.phone,
      preferredDate: trialForm.date || new Date().toISOString().split('T')[0],
      preferredTimeSlot: trialForm.slot,
      goal: trialForm.goal,
      branch: trialForm.branch,
    });
    setTrialSubmitted(true);
  };

  const handlePurchaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlanForPurchase) return;

    addPayment({
      memberId: `mem-${Date.now()}`,
      memberName: purchaseMemberName || 'New Member',
      planName: selectedPlanForPurchase.name,
      amount: selectedPlanForPurchase.price * (billingCycle === 'annual' ? 10 : 1),
      currency: settings.currencySymbol,
      paymentMethod,
      status: 'paid',
      transactionId: `txn_${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      invoiceId: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
    });
    setPurchaseSuccess(true);
  };

  const faqs = [
    { q: 'Can I switch between branches with one membership pass?', a: 'Yes! Pro and Elite VIP memberships include multi-branch access across all our Central Connaught Place, Bandra Elite, and Indiranagar Royal Fitness centers.' },
    { q: 'How does the QR attendance scanner work at the reception desk?', a: 'Simply open your mobile Digital Pass in the Member Portal, show the live QR code or barcode to our desk optical scanner, and your check-in is logged instantly.' },
    { q: 'Do you offer custom diet and workout plan design?', a: 'All Pro and Elite plans come with certified trainer consultation and digital workout/diet builders accessible directly from your member app.' },
    { q: 'What payment methods are supported for online subscription renewal?', a: 'We support Stripe Credit/Debit cards, UPI QR Code direct transfers, Razorpay, and Over-the-Counter Cash at reception.' },
  ];

  return (
    <div className="relative min-h-screen bg-[#050505] text-zinc-100 selection:bg-[#FF6A00] selection:text-black">
      {/* Background Ambient Glows */}
      <div className="ambient-glow-1" />
      <div className="ambient-glow-2" />

      {/* Top Banner Navigation */}
      <nav id="home" className="sticky top-0 z-40 bg-[#050505]/90 backdrop-blur-2xl border-b border-white/10 px-4 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF6A00] via-orange-500 to-amber-400 p-0.5 shadow-lg shadow-[#FF6A00]/25">
            <div className="w-full h-full bg-[#050505] rounded-[14px] flex items-center justify-center relative overflow-hidden">
              <Crown className="w-3.5 h-3.5 text-amber-300 absolute top-0.5 left-1/2 -translate-x-1/2 drop-shadow" />
              <Dumbbell className="w-5 h-5 text-[#FF6A00] transform -rotate-45 mt-2" />
            </div>
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-white">{settings.gymName}</span>
            <span className="text-[10px] text-[#FF6A00] block font-semibold -mt-1">Train Like Royalty</span>
          </div>
        </div>

        {/* Navbar Links */}
        <div className="hidden lg:flex items-center gap-5 text-xs font-semibold text-zinc-300">
          <a href="#home" className="hover:text-[#FF6A00] transition-colors">Home</a>
          <a href="#about" className="hover:text-[#FF6A00] transition-colors">About</a>
          <a href="#membership" className="hover:text-[#FF6A00] transition-colors">Membership</a>
          <a href="#programs" className="hover:text-[#FF6A00] transition-colors">Programs</a>
          <a href="#bmi" className="hover:text-[#FF6A00] transition-colors">BMI Calculator</a>
          <a href="#trainers" className="hover:text-[#FF6A00] transition-colors">Trainers</a>
          <a href="#transformations" className="hover:text-[#FF6A00] transition-colors">Transformations</a>
          <a href="#gallery" className="hover:text-[#FF6A00] transition-colors">Gallery</a>
          <a href="#contact" className="hover:text-[#FF6A00] transition-colors">Contact</a>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowTrialModal(true)}
            className="px-4 py-2 rounded-xl bg-[#FF6A00] hover:bg-[#FF6A00]/90 text-black font-extrabold text-xs shadow-lg shadow-[#FF6A00]/25 transition-all cursor-pointer"
          >
            Book Free Trial
          </button>

          <div className="hidden sm:flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-xs">
            <span className="text-[10px] text-zinc-400 uppercase font-bold px-2">Demo Hubs:</span>
            <button
              onClick={() => handleRoleSelect('admin')}
              className="px-2.5 py-1 rounded-lg hover:bg-[#FF6A00]/20 hover:text-[#FF6A00] text-zinc-300 font-medium transition-all cursor-pointer"
            >
              Admin
            </button>
            <button
              onClick={() => handleRoleSelect('trainer')}
              className="px-2.5 py-1 rounded-lg hover:bg-[#FF6A00]/20 hover:text-[#FF6A00] text-zinc-300 font-medium transition-all cursor-pointer"
            >
              Trainer
            </button>
            <button
              onClick={() => handleRoleSelect('member')}
              className="px-2.5 py-1 rounded-lg hover:bg-[#FF6A00]/20 hover:text-[#FF6A00] text-zinc-300 font-medium transition-all cursor-pointer"
            >
              Member
            </button>
          </div>
        </div>
      </nav>

      {/* FULL-SCREEN HERO SECTION WITH LUXURY BACKDROP & MUSCULAR ATHLETE */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative min-h-[92vh] flex items-center pt-12 pb-20 px-4 lg:px-8 max-w-7xl mx-auto overflow-hidden"
      >
        {/* Cinematic Background Image of Luxury Gym with Dark Overlay */}
        <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none rounded-3xl my-2">
          <img
            src={heroBgSrc}
            alt="Royal Fitness Luxury Gym Interior"
            loading="lazy"
            decoding="async"
            onError={() => setHeroBgSrc(heroGymFallback)}
            className="w-full h-full object-cover object-center filter brightness-50 contrast-125 scale-105"
          />
          {/* 75-80% Dark Gradient Overlay for Crisp Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/85 to-[#050505]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/80" />
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[400px] bg-[#FF6A00]/20 rounded-full blur-[150px] pointer-events-none" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10 w-full py-6">
          {/* Left Text Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6A00]/15 border border-[#FF6A00]/40 text-[#FF6A00] text-xs font-extrabold backdrop-blur-md shadow-lg shadow-[#FF6A00]/10">
              <Trophy className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>🏆 India's Premium Fitness Club</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
              Transform Your Body. <br />
              <span className="bg-gradient-to-r from-[#FF6A00] via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Rule Your Fitness Journey.
              </span>
            </h1>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              Achieve your fitness goals with expert trainers, customized workout plans, nutrition guidance, and world-class facilities at Royal Fitness Club.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#membership"
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#FF6A00] to-amber-500 hover:brightness-110 text-black font-extrabold text-sm shadow-xl shadow-[#FF6A00]/25 flex items-center gap-2.5 cursor-pointer transition-all"
              >
                <span>Join Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => setShowTrialModal(true)}
                className="px-7 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm flex items-center gap-2 cursor-pointer transition-all backdrop-blur-md shadow-lg"
              >
                <span>Book Free Trial</span>
              </button>
            </div>

            {/* Metrics Ticker */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/15">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">2,500+</p>
                <p className="text-xs text-zinc-400 font-medium">Active Members</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-[#FF6A00]">98%</p>
                <p className="text-xs text-zinc-400 font-medium">Success Rate</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">15+</p>
                <p className="text-xs text-zinc-400 font-medium">Expert Trainers</p>
              </div>
            </div>
          </div>

          {/* Right Hero Image Section - Muscular Indian Bodybuilder with Glowing Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="lg:col-span-6 relative w-full mt-4 lg:mt-0"
          >
            {/* Orange Glow Effects Behind the Bodybuilder */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#FF6A00]/60 via-amber-500/40 to-orange-600/50 rounded-3xl blur-3xl -z-10 animate-pulse opacity-90" />

            <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl bg-black/60 backdrop-blur-2xl group">
              <img
                src={athleteImgSrc}
                alt="Muscular Royal Fitness Athlete"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={() => setAthleteImgSrc(heroGymFallback)}
                className="w-full h-[480px] sm:h-[540px] lg:h-[600px] object-cover object-top rounded-3xl group-hover:scale-105 transition-transform duration-700 shadow-2xl"
              />

              {/* Dark Gradient Overlay for Cinematic Atmosphere */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80 pointer-events-none rounded-3xl" />

              {/* 4 FLOATING GLASSMORPHISM CARDS */}
              {/* Floating Card 1: 💪 2,500+ Active Members (Top Left) */}
              <div className="absolute top-4 left-4 p-3 sm:p-3.5 rounded-2xl bg-black/75 border border-amber-500/30 backdrop-blur-xl flex items-center gap-3 shadow-2xl shadow-black/90 hover:border-[#FF6A00] transition-all">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF6A00] to-amber-500 text-black font-extrabold flex items-center justify-center text-lg shadow-md">
                  💪
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-black text-white">2,500+</p>
                  <p className="text-[10px] text-zinc-300 font-semibold">Active Members</p>
                </div>
              </div>

              {/* Floating Card 2: ⭐ 4.9/5 Rating (Top Right) */}
              <div className="absolute top-4 right-4 p-3 sm:p-3.5 rounded-2xl bg-black/75 border border-amber-500/30 backdrop-blur-xl flex items-center gap-3 shadow-2xl shadow-black/90 hover:border-amber-400 transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 font-extrabold flex items-center justify-center text-lg">
                  ⭐
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-black text-white">4.9 / 5.0</p>
                  <p className="text-[10px] text-amber-300 font-semibold">Member Rating</p>
                </div>
              </div>

              {/* Floating Card 3: 🔥 98% Success Rate (Bottom Left) */}
              <div className="absolute bottom-4 left-4 p-3 sm:p-3.5 rounded-2xl bg-black/75 border border-amber-500/30 backdrop-blur-xl flex items-center gap-3 shadow-2xl shadow-black/90 hover:border-orange-500 transition-all">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/40 font-extrabold flex items-center justify-center text-lg">
                  🔥
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-black text-white">98%</p>
                  <p className="text-[10px] text-zinc-300 font-semibold">Success Rate</p>
                </div>
              </div>

              {/* Floating Card 4: 🏆 15+ Expert Trainers (Bottom Right) */}
              <div className="absolute bottom-4 right-4 p-3 sm:p-3.5 rounded-2xl bg-black/75 border border-amber-500/30 backdrop-blur-xl flex items-center gap-3 shadow-2xl shadow-black/90 hover:border-amber-400 transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 font-extrabold flex items-center justify-center text-lg">
                  🏆
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-black text-white">15+</p>
                  <p className="text-[10px] text-zinc-300 font-semibold">Expert Trainers</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* BMI CALCULATOR SECTION */}
      <section id="bmi" className="py-20 px-4 lg:px-8 max-w-7xl mx-auto border-t border-zinc-900 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[320px] bg-[#FF6A00]/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="text-center max-w-2xl mx-auto mb-12 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-400 bg-orange-500/10 px-3.5 py-1.5 rounded-full border border-orange-500/20">
            BODY METRICS ENGINE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-3">BMI Calculator</h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">Know your Body Mass Index instantly and receive personalized calorie & workout recommendations.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start relative z-10">
          {/* Inputs Card */}
          <div className="lg:col-span-5 rounded-3xl bg-zinc-900/80 border border-zinc-800 p-6 md:p-8 glass-panel shadow-2xl space-y-5">
            {/* Unit Switch Toggle */}
            <div className="flex items-center justify-between gap-3 p-1.5 bg-zinc-950 rounded-2xl border border-zinc-800">
              <button
                type="button"
                onClick={() => setUnit('metric')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  unit === 'metric'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-lg shadow-orange-500/20'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Metric (cm, kg)
              </button>
              <button
                type="button"
                onClick={() => setUnit('imperial')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  unit === 'imperial'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-lg shadow-orange-500/20'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Imperial (ft/in, lbs)
              </button>
            </div>

            {/* Gender Switch */}
            <div>
              <label className="text-xs font-bold text-zinc-300 block mb-2">Gender</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    gender === 'male'
                      ? 'bg-orange-500/15 border-orange-500 text-orange-400'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <span>👨 Male</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    gender === 'female'
                      ? 'bg-orange-500/15 border-orange-500 text-orange-400'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <span>👩 Female</span>
                </button>
              </div>
            </div>

            {/* Age */}
            <div>
              <label className="text-xs font-bold text-zinc-300 block mb-1">Age (Years)</label>
              <input
                type="number"
                min={12}
                max={90}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500 font-bold"
              />
            </div>

            {/* Height Inputs */}
            {unit === 'metric' ? (
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500 font-bold"
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1">Height (Feet)</label>
                  <input
                    type="number"
                    value={heightFt}
                    onChange={(e) => setHeightFt(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500 font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1">Height (Inches)</label>
                  <input
                    type="number"
                    value={heightIn}
                    onChange={(e) => setHeightIn(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500 font-bold"
                  />
                </div>
              </div>
            )}

            {/* Weight Inputs */}
            {unit === 'metric' ? (
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500 font-bold"
                />
              </div>
            ) : (
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">Weight (lbs)</label>
                <input
                  type="number"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500 font-bold"
                />
              </div>
            )}

            <button
              type="button"
              onClick={handleCalculateBmi}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-black font-extrabold text-xs shadow-xl shadow-orange-500/25 hover:brightness-110 cursor-pointer transition-all flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate BMI</span>
            </button>
          </div>

          {/* Results Display Card */}
          <div className="lg:col-span-7 rounded-3xl bg-zinc-900/80 border border-zinc-800 p-6 md:p-8 glass-panel shadow-2xl flex flex-col justify-between min-h-[460px]">
            {detailedBmi ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                {/* Score Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                  <div>
                    <p className="text-xs text-zinc-400 font-semibold uppercase">Your BMI Score</p>
                    <p className="text-4xl sm:text-5xl font-black text-white mt-1">{detailedBmi.bmi}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-zinc-400 font-semibold uppercase mb-1">Category</p>
                    <span
                      className={`inline-block text-xs sm:text-sm font-extrabold px-3.5 py-1.5 rounded-full border ${
                        detailedBmi.category === 'Underweight'
                          ? 'bg-blue-500/15 border-blue-500/40 text-blue-400'
                          : detailedBmi.category === 'Normal'
                          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                          : detailedBmi.category === 'Overweight'
                          ? 'bg-amber-500/15 border-amber-500/40 text-amber-400'
                          : 'bg-rose-500/15 border-rose-500/40 text-rose-400'
                      }`}
                    >
                      {detailedBmi.category}
                    </span>
                  </div>
                </div>

                {/* BMI Gauge Visual Progress Bar */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-zinc-400">
                    <span>BMI Scale Indicator</span>
                    <span className="text-zinc-300">Healthy Range: {detailedBmi.healthyRange}</span>
                  </div>

                  <div className="relative h-4 w-full rounded-full bg-zinc-950 overflow-hidden border border-zinc-800 p-0.5">
                    <div className="h-full w-full rounded-full bg-gradient-to-r from-blue-500 via-emerald-500 via-amber-500 to-rose-500" />
                    {/* Indicator Pointer Pin */}
                    <div
                      className="absolute top-0 bottom-0 w-3 bg-white rounded-full shadow-lg shadow-white/80 border-2 border-black -translate-x-1/2 transition-all duration-500"
                      style={{
                        left: `${Math.min(Math.max(((detailedBmi.bmi - 15) / (40 - 15)) * 100, 0), 100)}%`,
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-4 text-[10px] font-bold text-center pt-1">
                    <span className="text-blue-400">&lt;18.5 Underweight</span>
                    <span className="text-emerald-400">18.5-24.9 Normal</span>
                    <span className="text-amber-400">25-29.9 Overweight</span>
                    <span className="text-rose-400">30+ Obese</span>
                  </div>
                </div>

                {/* Recommendation Cards */}
                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
                    <p className="text-[11px] font-bold text-orange-400 uppercase tracking-wide">Weight Recommendation</p>
                    <p className="text-xs text-zinc-200 leading-relaxed font-medium">{detailedBmi.weightRec}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
                    <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wide">Calorie Recommendation</p>
                    <p className="text-lg font-black text-white">{detailedBmi.calorieRec} <span className="text-xs font-medium text-zinc-400">kcal / day</span></p>
                  </div>
                </div>

                {/* Personalized Fitness Tip */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-transparent border border-orange-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-orange-400" />
                    <p className="text-xs font-extrabold text-white">Personalized Royal Coaching Tip</p>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed font-normal">{detailedBmi.tip}</p>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="p-4 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400">
                  <Calculator className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Instant Body Composition Analysis</h3>
                  <p className="text-xs text-zinc-400 max-w-md mt-1">
                    Enter your metrics on the left and click "Calculate BMI" to view your body mass index score, weight recommendations, custom calorie target, and coach guidance.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PROGRAMS SECTION */}
      <section id="programs" className="py-20 px-4 lg:px-8 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
            TRAINING DISCIPLINES
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">Elite Training Programs</h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">Designed by world-class athletic biomechanists and certified nutritionists.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Hypertrophy & Bodybuilding',
              desc: 'High-volume hypertrophy split focused on progressive overload, mechanical tension, and symmetry.',
              img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop&q=80',
              tag: 'Strength',
            },
            {
              title: 'HIIT & Metabolic Conditioning',
              desc: 'High-intensity interval protocols designed for rapid calorie burn and post-exercise oxygen consumption.',
              img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=80',
              tag: 'Endurance',
            },
            {
              title: 'Functional Pilates & Mobility',
              desc: 'Deep core stabilization, joint range-of-motion optimization, and injury rehabilitation.',
              img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&auto=format&fit=crop&q=80',
              tag: 'Recovery',
            },
          ].map((prog, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-zinc-900/60 border border-zinc-800/80 overflow-hidden hover:border-orange-500/40 transition-all group glass-panel-hover"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={prog.img}
                  alt={prog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/70 text-orange-400 border border-orange-500/30 backdrop-blur-md">
                  {prog.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">{prog.title}</h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{prog.desc}</p>
                <button
                  onClick={() => setShowTrialModal(true)}
                  className="mt-4 text-xs font-bold text-orange-400 flex items-center gap-1 hover:gap-2 transition-all cursor-pointer"
                >
                  <span>Book Trial Class</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 px-4 lg:px-8 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400 bg-orange-500/10 px-3.5 py-1.5 rounded-full border border-orange-500/20">
              ABOUT ROYAL FITNESS CLUB
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Where Royalty Meets <br />
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                Relentless Performance.
              </span>
            </h2>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Royal Fitness Club is a premium fitness destination offering world-class strength training, functional fitness, personal coaching, nutrition guidance, and transformation programs in a luxurious environment.
            </p>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Founded on principles of scientific progression and athletic mastery, our facilities combine top-tier biomechanical machinery, Olympic platforms, digital tracking, and certified coaches to elevate your physique and performance.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                <Crown className="w-5 h-5 text-amber-400 mb-2" />
                <p className="text-sm font-bold text-white">World-Class Equipment</p>
                <p className="text-xs text-zinc-400 mt-1">Eleiko, Hammer Strength & Prime Fitness rigs</p>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                <ShieldCheck className="w-5 h-5 text-orange-400 mb-2" />
                <p className="text-sm font-bold text-white">Certified Master Coaches</p>
                <p className="text-xs text-zinc-400 mt-1">IFBB & CSCS certified personal trainers</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#FF6A00]/20 to-amber-500/10 rounded-3xl blur-2xl -z-10" />
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80"
                alt="Royal Fitness Gym Floor"
                className="rounded-3xl h-64 object-cover w-full border border-zinc-800 shadow-xl"
              />
              <img
                src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80"
                alt="Royal Fitness Training"
                className="rounded-3xl h-64 object-cover w-full border border-zinc-800 shadow-xl mt-6"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MEMBERSHIP PRICING SECTION */}
      <section id="membership" className="py-20 px-4 lg:px-8 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
            TRANSPARENT PRICING
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">Choose Your Membership Tier</h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">No hidden enrollment fees. Cancel or upgrade anytime.</p>

          {/* Monthly / Annual Toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 rounded-2xl bg-zinc-900 border border-zinc-800 mt-6">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                billingCycle === 'monthly' ? 'bg-orange-500 text-black' : 'text-zinc-400'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'annual' ? 'bg-orange-500 text-black' : 'text-zinc-400'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-black/20">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const finalPrice = billingCycle === 'annual' ? Math.round(plan.price * 0.8) : plan.price;
            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative transition-all glass-panel ${
                  plan.popular
                    ? 'border-2 border-orange-500/80 bg-zinc-900/90 shadow-2xl glow-orange'
                    : 'border border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[10px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-md">
                    MOST POPULAR ATHLETE CHOICE
                  </span>
                )}

                <div>
                  <h3 className="text-xl font-black text-white">{plan.name}</h3>
                  <p className="text-xs text-zinc-400 mt-1">{plan.description}</p>

                  <div className="my-6">
                    <span className="text-4xl font-black text-white">
                      {settings.currencySymbol}
                      {finalPrice}
                    </span>
                    <span className="text-xs text-zinc-500 font-semibold"> / month</span>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-zinc-800">
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <Check className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <button
                    onClick={() => {
                      setSelectedPlanForPurchase(plan);
                      setPurchaseSuccess(false);
                    }}
                    className={`w-full py-3 rounded-2xl font-extrabold text-xs shadow-lg transition-all cursor-pointer ${
                      plan.popular
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black hover:brightness-110'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
                    }`}
                  >
                    Select {plan.name}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* TRAINERS SECTION */}
      <section id="trainers" className="py-20 px-4 lg:px-8 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
            WORLD-CLASS COACHES
          </span>
          <h2 className="text-3xl font-black text-white mt-3">Meet Our Certified Personal Trainers</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {trainers.map((tr) => (
            <div key={tr.id} className="rounded-3xl bg-zinc-900/60 border border-zinc-800 p-6 glass-panel flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <img src={tr.avatar} alt={tr.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-orange-500" />
                  <div>
                    <h3 className="text-base font-bold text-white">{tr.name}</h3>
                    <p className="text-xs text-orange-400 font-semibold">{tr.branch}</p>
                    <div className="flex items-center gap-1 text-amber-400 text-xs mt-1 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{tr.rating}</span>
                      <span className="text-zinc-500 font-normal">({tr.experienceYears} yrs exp)</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed mb-4">{tr.bio}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tr.specialty.map((spec, sIdx) => (
                    <span key={sIdx} className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowTrialModal(true)}
                className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-bold text-orange-400 cursor-pointer transition-all"
              >
                Book 1-on-1 Session
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* TRANSFORMATIONS SECTION */}
      <section id="transformations" className="py-20 px-4 lg:px-8 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-400 bg-orange-500/10 px-3.5 py-1.5 rounded-full border border-orange-500/20">
            MEMBER SUCCESS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">Transformations That Inspire</h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">Real member results achieved through dedicated coaching and structured nutrition.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: 'Rahul Sharma',
              duration: '16 Weeks Program',
              achievement: '-18 kg Fat Loss | +4.5 kg Lean Muscle',
              quote: 'Royal Fitness Club completely altered my mindset and body structure. The coaches and facility are top tier.',
              image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&auto=format&fit=crop&q=80',
              tag: 'Fat Loss & Hypertrophy',
            },
            {
              name: 'Priya Patel',
              duration: '12 Weeks Program',
              achievement: '14% Body Fat Reduction | Core Power',
              quote: 'The personalized nutrition plan and functional training restored my energy and strength post-pregnancy.',
              image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&auto=format&fit=crop&q=80',
              tag: 'Toning & Mobility',
            },
            {
              name: 'Vikram Singh',
              duration: '24 Weeks Program',
              achievement: '+8 kg Muscle Mass | Powerlifting Peak',
              quote: 'Training with Coach Marcus pushed my squat and deadlift numbers to national competitive levels.',
              image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=80',
              tag: 'Strength & Recomp',
            },
          ].map((t, idx) => (
            <div key={idx} className="rounded-3xl bg-zinc-900/60 border border-zinc-800 p-6 glass-panel flex flex-col justify-between hover:border-orange-500/40 transition-all">
              <div>
                <div className="relative h-52 rounded-2xl overflow-hidden mb-4 border border-zinc-800">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-black/80 text-orange-400 border border-orange-500/30 backdrop-blur-md">
                    {t.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">{t.name}</h3>
                <p className="text-xs text-orange-400 font-semibold">{t.duration}</p>
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 my-3">
                  <p className="text-xs font-bold text-emerald-400">{t.achievement}</p>
                </div>
                <p className="text-xs text-zinc-400 italic leading-relaxed">"{t.quote}"</p>
              </div>

              <button
                onClick={() => setShowTrialModal(true)}
                className="mt-4 w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-bold text-white hover:text-orange-400 transition-all cursor-pointer"
              >
                Start Your Transformation
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="py-20 px-4 lg:px-8 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-400 bg-orange-500/10 px-3.5 py-1.5 rounded-full border border-orange-500/20">
            LUXURY FACILITY
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">Royal Fitness Club Gallery</h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">Take a visual tour of our cutting-edge training spaces and wellness zones.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { title: 'Heavy Strength Arena', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80' },
            { title: 'Olympic Lifting Rigs', img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80' },
            { title: 'Functional CrossFit Turf', img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80' },
            { title: 'Cardio & Conditioning Deck', img: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80' },
            { title: 'Recovery & Cryotherapy Lounge', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80' },
            { title: 'VIP Coaching Studio', img: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=600&auto=format&fit=crop&q=80' },
          ].map((item, idx) => (
            <div key={idx} className="relative group rounded-2xl overflow-hidden h-48 sm:h-60 border border-zinc-800">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                <p className="text-xs sm:text-sm font-bold text-white group-hover:text-orange-400 transition-colors">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 px-4 lg:px-8 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400 bg-orange-500/10 px-3.5 py-1.5 rounded-full border border-orange-500/20">
              GET IN TOUCH
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Visit Royal Fitness Club</h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Step inside India's premier fitness destination. Speak with our concierge team or schedule your VIP tour today.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                <MapPin className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-white">Branch Locations</p>
                  <p className="text-xs text-zinc-400 mt-0.5">Central Connaught Place, Bandra Elite Center, Indiranagar Hub</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                <PhoneCall className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-white">Concierge Desk</p>
                  <p className="text-xs text-zinc-400 mt-0.5">+91 98765 43210 (Mon - Sun, 6:00 AM - 10:00 PM)</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                <Mail className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-white">Official Support</p>
                  <p className="text-xs text-zinc-400 mt-0.5">contact@royalfitnessclub.in</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-3xl bg-zinc-900/90 border border-zinc-800 p-6 md:p-8 glass-panel shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2">Send Us an Inquiry</h3>
            <p className="text-xs text-zinc-400 mb-6">Have questions regarding memberships, corporate plans, or personal coaching?</p>

            <form onSubmit={(e) => { e.preventDefault(); alert('Inquiry received! Our team will contact you shortly.'); }} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Roy"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 00000"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="ananya@example.com"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">Your Message or Query</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Ask about personal training, membership tiers, or branch tours..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-extrabold text-xs shadow-lg hover:brightness-110 cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 px-4 lg:px-8 max-w-4xl mx-auto border-t border-zinc-900">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-zinc-400 mt-2">Everything you need to know about membership and facility access.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left font-bold text-xs sm:text-sm text-white flex items-center justify-between cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-orange-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="p-4 pt-0 text-xs text-zinc-400 leading-relaxed border-t border-zinc-800/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-12 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 text-xs text-zinc-400">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FF6A00] via-orange-500 to-amber-400 p-0.5 shadow-md">
                <div className="w-full h-full bg-[#050505] rounded-[10px] flex items-center justify-center relative overflow-hidden">
                  <Crown className="w-2.5 h-2.5 text-amber-300 absolute top-0.5 left-1/2 -translate-x-1/2" />
                  <Dumbbell className="w-3.5 h-3.5 text-[#FF6A00] transform -rotate-45 mt-1.5" />
                </div>
              </div>
              <span className="font-extrabold text-base text-white">{settings.gymName}</span>
            </div>
            <p className="text-zinc-500 leading-relaxed">{settings.tagline}</p>
            <p className="text-zinc-600">© 2026 Royal Fitness Club. All rights reserved.</p>
          </div>

          <div>
            <p className="font-bold text-white uppercase tracking-wider mb-3">Branches</p>
            <ul className="space-y-2">
              {settings.branches.map((b, i) => (
                <li key={i} className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-bold text-white uppercase tracking-wider mb-3">Contact & Support</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>contact@royalfitnessclub.in</span>
              </li>
              <li className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-bold text-white uppercase tracking-wider mb-3">Staff & Member Access</p>
            <p className="text-zinc-500 mb-3">Test multi-role dashboards directly:</p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => handleRoleSelect('admin')} className="px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 text-orange-400 font-bold cursor-pointer">Admin Panel</button>
              <button onClick={() => handleRoleSelect('trainer')} className="px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 text-orange-400 font-bold cursor-pointer">Trainer Hub</button>
              <button onClick={() => handleRoleSelect('receptionist')} className="px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 text-orange-400 font-bold cursor-pointer">Reception Desk</button>
              <button onClick={() => handleRoleSelect('member')} className="px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 text-orange-400 font-bold cursor-pointer">Member Portal</button>
            </div>
          </div>
        </div>
      </footer>

      {/* FREE TRIAL MODAL */}
      {showTrialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
          <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-2xl">
            <button
              onClick={() => {
                setShowTrialModal(false);
                setTrialSubmitted(false);
              }}
              className="absolute top-4 right-4 p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!trialSubmitted ? (
              <form onSubmit={handleTrialSubmit} className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-zinc-800">
                  <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Book 7-Day Free Trial</h3>
                    <p className="text-xs text-zinc-400">Experience world-class facilities with zero commitment</p>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marcus Vance"
                    value={trialForm.name}
                    onChange={(e) => setTrialForm({ ...trialForm, name: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={trialForm.email}
                      onChange={(e) => setTrialForm({ ...trialForm, email: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">Phone</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={trialForm.phone}
                      onChange={(e) => setTrialForm({ ...trialForm, phone: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">Preferred Date</label>
                    <input
                      type="date"
                      required
                      value={trialForm.date}
                      onChange={(e) => setTrialForm({ ...trialForm, date: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">Time Slot</label>
                    <select
                      value={trialForm.slot}
                      onChange={(e) => setTrialForm({ ...trialForm, slot: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                    >
                      <option value="08:00 AM">08:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="05:00 PM">05:00 PM</option>
                      <option value="07:00 PM">07:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Select Branch Location</label>
                  <select
                    value={trialForm.branch}
                    onChange={(e) => setTrialForm({ ...trialForm, branch: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                  >
                    {settings.branches.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-extrabold text-xs shadow-lg hover:brightness-110 cursor-pointer transition-all mt-2"
                >
                  Confirm Free Trial Booking
                </button>
              </form>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Trial Tour Confirmed!</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  We have dispatched your instant digital access trial pass to <span className="text-orange-400">{trialForm.email}</span>. Show your pass at the front desk.
                </p>
                <button
                  onClick={() => {
                    setShowTrialModal(false);
                    setTrialSubmitted(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ONLINE MEMBERSHIP PURCHASE MODAL */}
      {selectedPlanForPurchase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
          <div className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-2xl">
            <button
              onClick={() => setSelectedPlanForPurchase(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!purchaseSuccess ? (
              <form onSubmit={handlePurchaseSubmit} className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-zinc-800">
                  <div className="p-2.5 rounded-xl bg-orange-500 text-black font-extrabold">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Subscribe to {selectedPlanForPurchase.name}</h3>
                    <p className="text-xs text-orange-400 font-semibold">
                      Total: {settings.currencySymbol}
                      {billingCycle === 'annual' ? selectedPlanForPurchase.price * 10 : selectedPlanForPurchase.price} ({billingCycle})
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Rivera"
                    value={purchaseMemberName}
                    onChange={(e) => setPurchaseMemberName(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={purchaseMemberEmail}
                    onChange={(e) => setPurchaseMemberEmail(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1.5">Select Payment Gateway</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'stripe', label: 'Stripe Credit Card', icon: '💳' },
                      { id: 'upi', label: 'UPI Direct QR', icon: '📱' },
                      { id: 'razorpay', label: 'Razorpay Gateway', icon: '⚡' },
                      { id: 'cash', label: 'Cash at Desk', icon: '💵' },
                    ].map((pm) => (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => setPaymentMethod(pm.id as any)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                          paymentMethod === pm.id
                            ? 'bg-orange-500/20 border-orange-500 text-orange-300'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        <span>{pm.icon}</span>
                        <span>{pm.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-extrabold text-xs shadow-lg hover:brightness-110 cursor-pointer transition-all mt-2"
                >
                  Complete Secure Payment Now
                </button>
              </form>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Payment Successful!</h3>
                <p className="text-xs text-zinc-400">
                  Welcome to {settings.gymName}! Your digital membership pass and invoice have been generated.
                </p>
                <div className="flex gap-2 justify-center pt-2">
                  <button
                    onClick={() => handleRoleSelect('member')}
                    className="px-5 py-2.5 rounded-xl bg-orange-500 text-black font-extrabold text-xs hover:brightness-110 cursor-pointer"
                  >
                    Go to Member Portal
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
