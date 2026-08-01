import React, { useState } from 'react';
import { motion } from 'motion/react';
import heroGymFallback from '../../assets/images/hero-gym.webp';
import { useAuth } from '../../context/AuthContext';
import { MembershipPlan } from '../../types';
import {
  Dumbbell,
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
} from 'lucide-react';

interface PublicWebsiteProps {
  onSelectRole: (role: 'admin' | 'trainer' | 'receptionist' | 'member') => void;
}

export const PublicWebsite: React.FC<PublicWebsiteProps> = ({ onSelectRole }) => {
  const { plans, trainers, addTrialBooking, addPayment, settings } = useAuth();

  // BMI State
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weight, setWeight] = useState<number>(75);
  const [height, setHeight] = useState<number>(178);
  const [bmiResult, setBmiResult] = useState<{ bmi: number; category: string; calories: number } | null>(null);

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

  // Hero Image State
  const [heroImgSrc, setHeroImgSrc] = useState<string>(
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop'
  );

  // FAQ Accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const calculateBmi = () => {
    let bmiValue = 0;
    if (unit === 'metric') {
      const heightM = height / 100;
      bmiValue = weight / (heightM * heightM);
    } else {
      bmiValue = (weight / (height * height)) * 703;
    }

    let cat = 'Normal Weight';
    let targetCal = 2400;
    if (bmiValue < 18.5) {
      cat = 'Underweight (Bulking Recommended)';
      targetCal = 2900;
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      cat = 'Overweight (Fat Loss & HIIT Focus)';
      targetCal = 2100;
    } else if (bmiValue >= 30) {
      cat = 'Obese (Metabolic Conditioning)';
      targetCal = 1800;
    }

    setBmiResult({
      bmi: parseFloat(bmiValue.toFixed(1)),
      category: cat,
      calories: targetCal,
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
    { q: 'Can I switch between branches with one membership pass?', a: 'Yes! Pro and Elite VIP memberships include multi-branch access across all our Central Connaught Place, Bandra Elite, and Indiranagar Iron Temple centers.' },
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
      <nav className="sticky top-0 z-40 bg-white/[0.02] backdrop-blur-2xl border-b border-white/10 px-4 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FF6A00] p-0.5 shadow-lg shadow-[#FF6A00]/20">
            <div className="w-full h-full bg-[#050505] rounded-[14px] flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-[#FF6A00] transform -rotate-45" />
            </div>
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-white">{settings.gymName}</span>
            <span className="text-[10px] text-[#FF6A00] block font-semibold -mt-1">Premium Fitness Club</span>
          </div>
        </div>

        {/* Quick Section Nav Links */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-semibold text-zinc-400">
          <a href="#programs" className="hover:text-[#FF6A00] transition-colors">Programs</a>
          <a href="#pricing" className="hover:text-[#FF6A00] transition-colors">Pricing & Plans</a>
          <a href="#bmi" className="hover:text-[#FF6A00] transition-colors">BMI Calculator</a>
          <a href="#trainers" className="hover:text-[#FF6A00] transition-colors">Elite Coaches</a>
          <a href="#faq" className="hover:text-[#FF6A00] transition-colors">FAQ</a>
        </div>

        {/* Quick Portal Switcher */}
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
              onClick={() => onSelectRole('admin')}
              className="px-2.5 py-1 rounded-lg hover:bg-[#FF6A00]/20 hover:text-[#FF6A00] text-zinc-300 font-medium transition-all cursor-pointer"
            >
              Admin
            </button>
            <button
              onClick={() => onSelectRole('trainer')}
              className="px-2.5 py-1 rounded-lg hover:bg-[#FF6A00]/20 hover:text-[#FF6A00] text-zinc-300 font-medium transition-all cursor-pointer"
            >
              Trainer
            </button>
            <button
              onClick={() => onSelectRole('member')}
              className="px-2.5 py-1 rounded-lg hover:bg-[#FF6A00]/20 hover:text-[#FF6A00] text-zinc-300 font-medium transition-all cursor-pointer"
            >
              Member
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative pt-12 pb-24 px-4 lg:px-8 max-w-7xl mx-auto overflow-hidden"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FF6A00]/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
          {/* Left Text Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6A00]/10 border border-[#FF6A00]/30 text-[#FF6A00] text-xs font-bold">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>PREMIUM INDIAN FITNESS & WELLNESS CLUB</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-none">
              Transform Your Body. <br />
              <span className="bg-gradient-to-r from-[#FF6A00] via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Master Your Limits.
              </span>
            </h1>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl">
              Precision fitness management powered by digital QR attendance, automated workout & diet builders, real-time analytics, and elite personal coaching.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => setShowTrialModal(true)}
                className="px-6 py-3.5 rounded-2xl bg-[#FF6A00] hover:bg-[#FF6A00]/90 text-black font-extrabold text-sm shadow-xl shadow-[#FF6A00]/25 flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>Start 7-Day Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#pricing"
                className="px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 font-bold text-sm flex items-center gap-2 cursor-pointer transition-all backdrop-blur-md"
              >
                <span>Explore Membership Plans</span>
              </a>
            </div>

            {/* Metrics Ticker */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div>
                <p className="text-2xl font-black text-white">2,400+</p>
                <p className="text-xs text-zinc-400">Active Members</p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#FF6A00]">98.4%</p>
                <p className="text-xs text-zinc-400">Member Retention</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">15+</p>
                <p className="text-xs text-zinc-400">Certified Coaches</p>
              </div>
            </div>
          </div>

          {/* Right Hero Image Section (45-50% width on Desktop, Below text on Mobile) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="lg:col-span-6 relative w-full mt-4 lg:mt-0"
          >
            {/* Orange Glow Behind the Athlete */}
            <div className="absolute -inset-3 bg-gradient-to-tr from-[#FF6A00]/30 via-amber-500/20 to-orange-600/30 rounded-3xl blur-3xl -z-10 opacity-80 animate-pulse" />

            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-black/40 backdrop-blur-xl group">
              <img
                src={heroImgSrc}
                alt="Ultra-realistic Gym Athlete Training"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={() => {
                  if (heroImgSrc !== heroGymFallback) {
                    setHeroImgSrc(heroGymFallback);
                  }
                }}
                className="w-full h-[450px] sm:h-[500px] lg:h-[540px] object-cover rounded-3xl group-hover:scale-105 transition-transform duration-700 shadow-2xl"
              />

              {/* Dark Overlays for Cinematic Atmosphere */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/25 to-transparent pointer-events-none rounded-3xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/30 via-transparent to-transparent pointer-events-none rounded-3xl" />

              {/* Floating Stat Card 1: Top Left */}
              <div className="absolute top-4 left-4 p-3.5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl flex items-center gap-3 shadow-2xl shadow-black/80 hover:border-[#FF6A00]/40 transition-all">
                <div className="p-2.5 rounded-xl bg-[#FF6A00] text-black font-bold shadow-md shadow-[#FF6A00]/30">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">QR Speed Check-In</p>
                  <p className="text-[10px] text-zinc-400">0.4 sec desk scan pass</p>
                </div>
              </div>

              {/* Floating Stat Card 2: Bottom Right */}
              <div className="absolute bottom-4 right-4 p-3.5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl flex items-center gap-3 shadow-2xl shadow-black/80 hover:border-emerald-500/40 transition-all">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">InBody 770 Scan</p>
                  <p className="text-[10px] text-emerald-400 font-semibold">Track Muscle vs Fat %</p>
                </div>
              </div>

              {/* Floating Stat Card 3: Bottom Left */}
              <div className="hidden sm:flex absolute bottom-4 left-4 p-3 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl items-center gap-3 shadow-2xl shadow-black/80 hover:border-amber-500/40 transition-all">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Live Performance</p>
                  <p className="text-[10px] text-zinc-400">780 kcal burned today</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

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

      {/* BMI CALCULATOR SECTION */}
      <section id="bmi" className="py-20 px-4 lg:px-8 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
              HEALTH METRICS ENGINE
            </span>
            <h2 className="text-3xl font-black text-white">Interactive BMI & Calorie Calculator</h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Calculate your Body Mass Index (BMI) and receive instant daily caloric targets customized for fat loss or muscle hypertrophy.
            </p>
            <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-orange-400" />
                <span>Instant Basal Metabolic Rate (BMR) estimation</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-orange-400" />
                <span>Automatic macro split recommendations</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-3xl bg-zinc-900/90 border border-zinc-800 p-6 md:p-8 glass-panel shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-orange-400" />
                <span>Calculate Your BMI</span>
              </h3>
              <div className="flex p-1 bg-zinc-950 rounded-xl border border-zinc-800">
                <button
                  onClick={() => setUnit('metric')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    unit === 'metric' ? 'bg-orange-500 text-black' : 'text-zinc-400'
                  }`}
                >
                  Metric (kg / cm)
                </button>
                <button
                  onClick={() => setUnit('imperial')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    unit === 'imperial' ? 'bg-orange-500 text-black' : 'text-zinc-400'
                  }`}
                >
                  Imperial (lbs / in)
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                  Weight ({unit === 'metric' ? 'kg' : 'lbs'})
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                  Height ({unit === 'metric' ? 'cm' : 'inches'})
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <button
              onClick={calculateBmi}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-extrabold text-xs shadow-lg hover:brightness-110 cursor-pointer transition-all mb-6"
            >
              Calculate BMI & Macros Now
            </button>

            {bmiResult && (
              <div className="p-4 rounded-2xl bg-zinc-950 border border-orange-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in">
                <div>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Your Body Mass Index</p>
                  <p className="text-2xl font-black text-orange-400">{bmiResult.bmi}</p>
                  <p className="text-xs font-bold text-white mt-0.5">{bmiResult.category}</p>
                </div>
                <div className="sm:text-right border-t sm:border-t-0 sm:border-l border-zinc-800 pt-3 sm:pt-0 sm:pl-6 w-full sm:w-auto">
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Target Daily Calories</p>
                  <p className="text-xl font-black text-white">{bmiResult.calories} kcal/day</p>
                  <p className="text-[10px] text-emerald-400 mt-0.5">High-protein split auto-suggested</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP PRICING SECTION */}
      <section id="pricing" className="py-20 px-4 lg:px-8 max-w-7xl mx-auto border-t border-zinc-900">
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
              <div className="p-2 rounded-xl bg-orange-500 text-black font-extrabold">
                <Dumbbell className="w-4 h-4 transform -rotate-45" />
              </div>
              <span className="font-extrabold text-base text-white">{settings.gymName}</span>
            </div>
            <p className="text-zinc-500 leading-relaxed">{settings.tagline}</p>
            <p className="text-zinc-600">© 2026 Iron Temple Fitness. All rights reserved.</p>
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
                <span>contact@irontemplefitness.in</span>
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
              <button onClick={() => onSelectRole('admin')} className="px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 text-orange-400 font-bold cursor-pointer">Admin Panel</button>
              <button onClick={() => onSelectRole('trainer')} className="px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 text-orange-400 font-bold cursor-pointer">Trainer Hub</button>
              <button onClick={() => onSelectRole('receptionist')} className="px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 text-orange-400 font-bold cursor-pointer">Reception Desk</button>
              <button onClick={() => onSelectRole('member')} className="px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 text-orange-400 font-bold cursor-pointer">Member Portal</button>
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
                    onClick={() => onSelectRole('member')}
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
