"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  User,
  Phone,
  Mail,
  Scissors,
  Check,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Star,
  MapPin,
  Camera,
  ArrowRight,
} from "lucide-react";

// ========== البيانات ==========
const services = [
  {
    id: 1,
    name: "قص شعر",
    duration: "45 دقيقة",
    price: "$25",
    icon: Scissors,
    color: "from-rose-500 to-pink-500",
  },
  {
    id: 2,
    name: "تصفيف + سشوار",
    duration: "60 دقيقة",
    price: "$35",
    icon: Sparkles,
    color: "from-amber-500 to-orange-500",
  },
  {
    id: 3,
    name: "صبغة",
    duration: "90 دقيقة",
    price: "$80",
    icon: Star,
    color: "from-violet-500 to-purple-500",
  },
  {
    id: 4,
    name: "مكياج",
    duration: "60 دقيقة",
    price: "$50",
    icon: Sparkles,
    color: "from-cyan-500 to-blue-500",
  },
];

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00",
  "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00",
];

const daysOfWeek = ["أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"];

export default function BookingSystem() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [confirmed, setConfirmed] = useState(false);

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const monthNames = [
    "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
  ];

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isDateAvailable = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const handleConfirm = () => {
    if (!selectedService || !selectedDate || !selectedTime || !formData.name || !formData.phone) {
      alert("الرجاء إكمال جميع البيانات");
      return;
    }
    setConfirmed(true);
  };

  const resetBooking = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setFormData({ name: "", phone: "", email: "" });
    setConfirmed(false);
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white" dir="rtl">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -right-40 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="border-b border-white/10 backdrop-blur-lg bg-black/30 sticky top-0 z-40"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-amber-500 rounded-full flex items-center justify-center font-bold text-lg">
              E
            </div>
            <div>
              <h1 className="text-xl font-bold">Elegance</h1>
              <p className="text-xs text-gray-400">صالون تجميل</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#services" className="text-gray-400 hover:text-white transition">الخدمات</a>
            <a href="#booking" className="text-gray-400 hover:text-white transition">احجز الآن</a>
            <a href="#contact" className="text-gray-400 hover:text-white transition">تواصل</a>
          </div>
        </div>
      </motion.header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 text-rose-400 px-4 py-2 rounded-full text-sm mb-6">
            <Sparkles size={14} />
            احجز موعدك في ثوانٍ
          </span>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            أناقتك{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-400">
              تبدأ من هنا
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            صالون Elegance يقدم لك أفضل خدمات التجميل. احجز موعدك الآن بسهولة.
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#booking"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white px-8 py-4 rounded-full font-bold hover:opacity-90 transition"
          >
            احجز الآن
            <ArrowRight size={20} className="rotate-180" />
          </motion.a>
        </motion.div>
      </section>

      {/* Services */}
      <section id="services" className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-rose-400 text-sm font-semibold tracking-widest uppercase">Services</span>
          <h3 className="text-4xl md:text-5xl font-bold mt-3">خدماتنا</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-[#1A1A1A] rounded-2xl border border-white/10 p-6 hover:border-rose-500/50 transition-colors"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4`}>
                <service.icon size={28} className="text-white" />
              </div>
              <h4 className="text-xl font-bold mb-2">{service.name}</h4>
              <p className="text-sm text-gray-400 mb-4">{service.duration}</p>
              <p className="text-2xl font-bold text-rose-400">{service.price}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Booking System */}
      <section id="booking" className="max-w-4xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-rose-400 text-sm font-semibold tracking-widest uppercase">Booking</span>
          <h3 className="text-4xl md:text-5xl font-bold mt-3">احجز موعدك</h3>
        </motion.div>

        {/* Progress Steps */}
        {!confirmed && (
          <div className="flex items-center justify-center gap-2 mb-10">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    step >= s
                      ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white"
                      : "bg-[#1A1A1A] text-gray-500 border border-white/10"
                  }`}
                >
                  {step > s ? <Check size={18} /> : s}
                </div>
                {s < 4 && (
                  <div
                    className={`w-12 md:w-20 h-0.5 mx-1 ${
                      step > s ? "bg-rose-500" : "bg-white/10"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* Step 1 */}
          {step === 1 && !confirmed && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-[#1A1A1A] rounded-3xl border border-white/10 p-8"
            >
              <h4 className="text-2xl font-bold mb-6">اختر الخدمة</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <motion.button
                    key={service.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedService(service.id)}
                    className={`p-5 rounded-2xl border-2 text-right transition-all ${
                      selectedService === service.id
                        ? "border-rose-500 bg-rose-500/10"
                        : "border-white/10 hover:border-white/20 bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                        <service.icon size={22} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold">{service.name}</p>
                        <p className="text-sm text-gray-400">{service.duration} • {service.price}</p>
                      </div>
                      {selectedService === service.id && (
                        <Check className="text-rose-400" size={24} />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={!selectedService}
                className={`w-full mt-8 py-4 rounded-full font-bold transition-all ${
                  selectedService
                    ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white hover:opacity-90"
                    : "bg-white/5 text-gray-500 cursor-not-allowed"
                }`}
              >
                التالي
              </button>
            </motion.div>
          )}

          {/* Step 2 */}
          {step === 2 && !confirmed && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-[#1A1A1A] rounded-3xl border border-white/10 p-8"
            >
              <h4 className="text-2xl font-bold mb-6">اختر التاريخ</h4>

              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={prevMonth}
                  className="p-2 rounded-lg hover:bg-white/10 transition"
                >
                  <ChevronRight size={24} />
                </button>
                <h5 className="text-xl font-bold">
                  {monthNames[currentMonth]} {currentYear}
                </h5>
                <button
                  onClick={nextMonth}
                  className="p-2 rounded-lg hover:bg-white/10 transition"
                >
                  <ChevronLeft size={24} />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-4">
                {daysOfWeek.map((day) => (
                  <div key={day} className="text-center text-sm text-gray-400 font-semibold">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: getFirstDayOfMonth(currentMonth, currentYear) }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: getDaysInMonth(currentMonth, currentYear) }).map((_, i) => {
                  const day = i + 1;
                  const available = isDateAvailable(day);
                  const isSelected =
                    selectedDate?.getDate() === day &&
                    selectedDate?.getMonth() === currentMonth &&
                    selectedDate?.getFullYear() === currentYear;

                  return (
                    <motion.button
                      key={day}
                      whileHover={available ? { scale: 1.1 } : {}}
                      whileTap={available ? { scale: 0.95 } : {}}
                      disabled={!available}
                      onClick={() => setSelectedDate(new Date(currentYear, currentMonth, day))}
                      className={`aspect-square rounded-xl flex items-center justify-center font-semibold transition-all ${
                        isSelected
                          ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white"
                          : available
                          ? "bg-white/5 hover:bg-white/10 border border-white/10"
                          : "text-gray-600 cursor-not-allowed"
                      }`}
                    >
                      {day}
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 rounded-full font-bold bg-white/5 hover:bg-white/10 transition"
                >
                  السابق
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!selectedDate}
                  className={`flex-1 py-4 rounded-full font-bold transition-all ${
                    selectedDate
                      ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white hover:opacity-90"
                      : "bg-white/5 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  التالي
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3 */}
          {step === 3 && !confirmed && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-[#1A1A1A] rounded-3xl border border-white/10 p-8"
            >
              <h4 className="text-2xl font-bold mb-2">اختر الوقت</h4>
              <p className="text-gray-400 mb-6">
                {selectedDate?.toLocaleDateString("ar-LB", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {timeSlots.map((time) => (
                  <motion.button
                    key={time}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedTime(time)}
                    className={`py-3 rounded-xl font-semibold transition-all ${
                      selectedTime === time
                        ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white"
                        : "bg-white/5 hover:bg-white/10 border border-white/10"
                    }`}
                  >
                    {time}
                  </motion.button>
                ))}
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-4 rounded-full font-bold bg-white/5 hover:bg-white/10 transition"
                >
                  السابق
                </button>
                <button
                  onClick={() => setStep(4)}
                  disabled={!selectedTime}
                  className={`flex-1 py-4 rounded-full font-bold transition-all ${
                    selectedTime
                      ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white hover:opacity-90"
                      : "bg-white/5 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  التالي
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4 */}
          {step === 4 && !confirmed && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-[#1A1A1A] rounded-3xl border border-white/10 p-8"
            >
              <h4 className="text-2xl font-bold mb-6">بياناتك</h4>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">الاسم الكامل *</label>
                  <div className="relative">
                    <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="مثال: أحمد علي"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-12 pl-4 focus:outline-none focus:border-rose-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">رقم الهاتف *</label>
                  <div className="relative">
                    <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+961 XX XXX XXX"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-12 pl-4 focus:outline-none focus:border-rose-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">الإيميل (اختياري)</label>
                  <div className="relative">
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pr-12 pl-4 focus:outline-none focus:border-rose-500 transition"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-4 rounded-full font-bold bg-white/5 hover:bg-white/10 transition"
                >
                  السابق
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 py-4 rounded-full font-bold bg-gradient-to-r from-rose-500 to-amber-500 text-white hover:opacity-90 transition"
                >
                  تأكيد الحجز
                </button>
              </div>
            </motion.div>
          )}

          {/* Confirmation */}
          {confirmed && (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#1A1A1A] rounded-3xl border border-rose-500/30 p-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="w-24 h-24 bg-gradient-to-br from-rose-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Check size={48} className="text-white" />
              </motion.div>
              <h4 className="text-3xl font-bold mb-4">تم تأكيد الحجز! 🎉</h4>
              <p className="text-gray-400 mb-8">
                رح نتواصل معك على الواتساب خلال 24 ساعة للتأكيد.
              </p>

              <div className="bg-white/5 rounded-2xl p-6 max-w-md mx-auto text-right mb-8">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">الخدمة:</span>
                    <span className="font-semibold">
                      {services.find((s) => s.id === selectedService)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">التاريخ:</span>
                    <span className="font-semibold">
                      {selectedDate?.toLocaleDateString("ar-LB")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">الوقت:</span>
                    <span className="font-semibold">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">الاسم:</span>
                    <span className="font-semibold">{formData.name}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={resetBooking}
                className="bg-gradient-to-r from-rose-500 to-amber-500 text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition"
              >
                حجز موعد آخر
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#1A1A1A] rounded-2xl border border-white/10 p-6 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center">
              <Phone className="text-rose-400" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-400">اتصل بنا</p>
              <p className="font-bold">+961 70 000 000</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-[#1A1A1A] rounded-2xl border border-white/10 p-6 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <MapPin className="text-amber-400" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-400">الموقع</p>
              <p className="font-bold">بيروت، لبنان</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#1A1A1A] rounded-2xl border border-white/10 p-6 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center">
              <Camera className="text-violet-400" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-400">تابعنا</p>
              <p className="font-bold">@elegance.lb</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Elegance Salon. All rights reserved.
      </footer>
    </main>
  );
}