'use client';

import React, { useState } from 'react';
import { Calendar, Clock, User, CreditCard, Package, Menu, X, ChevronRight, Star, MapPin, Phone, Mail } from 'lucide-react';

export default function CoreSynergyApp() {
  const [currentView, setCurrentView] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [cart, setCart] = useState([]);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Sample data - in production this would come from a backend
  const classes = [
    { id: 1, name: 'Morning Flow', instructor: 'Jess', time: '6:00 AM', duration: '50 min', spots: 3, day: 'Monday' },
    { id: 2, name: 'Power Pilates', instructor: 'Sarah', time: '9:00 AM', duration: '50 min', spots: 5, day: 'Monday' },
    { id: 3, name: 'Lunchtime Stretch', instructor: 'Emma', time: '12:30 PM', duration: '50 min', spots: 2, day: 'Monday' },
    { id: 4, name: 'Evening Burn', instructor: 'Jess', time: '5:30 PM', duration: '50 min', spots: 4, day: 'Monday' },
    { id: 5, name: 'Morning Flow', instructor: 'Emma', time: '6:00 AM', duration: '50 min', spots: 6, day: 'Tuesday' },
    { id: 6, name: 'Reformer Basics', instructor: 'Sarah', time: '10:00 AM', duration: '50 min', spots: 4, day: 'Tuesday' },
    { id: 7, name: 'Core Strength', instructor: 'Jess', time: '6:00 PM', duration: '50 min', spots: 1, day: 'Wednesday' },
  ];

  const memberships = [
    { 
      id: 'm1', 
      name: 'Unlimited Monthly', 
      price: 299, 
      description: 'Unlimited classes per month',
      features: ['Unlimited classes', 'Priority booking', 'Free guest pass monthly', '10% retail discount']
    },
    { 
      id: 'm2', 
      name: '12 Classes/Month', 
      price: 199, 
      description: '12 classes per month',
      features: ['12 classes per month', 'Roll over 2 classes', '5% retail discount', 'Book 7 days ahead']
    },
    { 
      id: 'm3', 
      name: '8 Classes/Month', 
      price: 149, 
      description: '8 classes per month',
      features: ['8 classes per month', 'Roll over 1 class', 'Book 5 days ahead']
    },
  ];

  const packs = [
    { id: 'p1', name: '20 Class Pack', price: 450, validity: '6 months', perClass: 22.50 },
    { id: 'p2', name: '10 Class Pack', price: 250, validity: '3 months', perClass: 25.00 },
    { id: 'p3', name: '5 Class Pack', price: 140, validity: '2 months', perClass: 28.00 },
    { id: 'p4', name: 'Single Class', price: 35, validity: '1 day', perClass: 35.00 },
    { id: 'p5', name: 'Intro Offer', price: 49, validity: '2 weeks', perClass: 16.33, featured: true, description: '3 classes for new members' },
  ];

  const instructors = [
    { name: 'Jess', role: 'Owner & Head Instructor', specialty: 'Reformer Pilates', image: '👩‍🏫' },
    { name: 'Sarah', role: 'Senior Instructor', specialty: 'Power Pilates', image: '👩‍💼' },
    { name: 'Emma', role: 'Instructor', specialty: 'Flexibility & Stretch', image: '👩‍⚕️' },
  ];

  const addToCart = (item, type) => {
    setCart([...cart, { ...item, type, addedAt: Date.now() }]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  // Navigation Component
  const Navigation = () => (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center font-bold text-black">
            CS
          </div>
          <div>
            <h1 className="text-xl font-bold">Core Synergy</h1>
            <p className="text-xs text-gray-400">Reformer Pilates</p>
          </div>
        </div>
        
        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden lg:flex gap-6">
          <NavButton view="home" label="Home" />
          <NavButton view="schedule" label="Schedule" />
          <NavButton view="memberships" label="Memberships" />
          <NavButton view="packs" label="Class Packs" />
          <NavButton view="about" label="About" />
          <button 
            onClick={() => setCurrentView('cart')}
            className="relative bg-amber-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-amber-400 transition"
          >
            Cart {cart.length > 0 && `(${cart.length})`}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-gray-900 px-4 py-4 space-y-2">
          <MobileNavButton view="home" label="Home" />
          <MobileNavButton view="schedule" label="Schedule" />
          <MobileNavButton view="memberships" label="Memberships" />
          <MobileNavButton view="packs" label="Class Packs" />
          <MobileNavButton view="about" label="About" />
          <button 
            onClick={() => { setCurrentView('cart'); setMenuOpen(false); }}
            className="w-full bg-amber-500 text-black px-4 py-3 rounded-lg font-semibold hover:bg-amber-400 transition text-left"
          >
            Cart {cart.length > 0 && `(${cart.length})`}
          </button>
        </div>
      )}
    </nav>
  );

  const NavButton = ({ view, label }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`px-4 py-2 rounded-lg transition ${
        currentView === view 
          ? 'bg-gray-800 text-amber-400' 
          : 'text-gray-300 hover:text-white hover:bg-gray-800'
      }`}
    >
      {label}
    </button>
  );

  const MobileNavButton = ({ view, label }) => (
    <button
      onClick={() => { setCurrentView(view); setMenuOpen(false); }}
      className={`w-full text-left px-4 py-3 rounded-lg transition ${
        currentView === view 
          ? 'bg-gray-800 text-amber-400' 
          : 'text-gray-300 hover:text-white hover:bg-gray-800'
      }`}
    >
      {label}
    </button>
  );

  // Home View
  const HomeView = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl overflow-hidden p-8 md:p-12">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Core Synergy</h2>
          <p className="text-xl text-gray-300 mb-6">
            Milperra&apos;s premier reformer pilates studio. Transform your body, strengthen your core, join our community.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setCurrentView('schedule')}
              className="bg-amber-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-amber-400 transition"
            >
              Book a Class
            </button>
            <button 
              onClick={() => setCurrentView('packs')}
              className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              View Packages
            </button>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-amber-500/20 to-transparent"></div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="text-amber-500 mb-2">
            <Star size={32} fill="currentColor" />
          </div>
          <h3 className="text-2xl font-bold mb-1">6:1 Ratio</h3>
          <p className="text-gray-600">Personalized attention in every class</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="text-amber-500 mb-2">
            <User size={32} />
          </div>
          <h3 className="text-2xl font-bold mb-1">Expert Trainers</h3>
          <p className="text-gray-600">Highly qualified and experienced instructors</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="text-amber-500 mb-2">
            <Package size={32} />
          </div>
          <h3 className="text-2xl font-bold mb-1">Top Equipment</h3>
          <p className="text-gray-600">State-of-the-art reformer machines</p>
        </div>
      </div>

      {/* Featured Offer */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-8 text-black">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="inline-block bg-black text-white px-3 py-1 rounded-full text-sm font-semibold mb-3">
              NEW MEMBER SPECIAL
            </div>
            <h3 className="text-3xl font-bold mb-2">3 Classes for $49</h3>
            <p className="text-lg mb-4">Try us out with our introductory offer - valid for 2 weeks</p>
            <button 
              onClick={() => {
                addToCart(packs.find(p => p.id === 'p5'), 'pack');
                setCurrentView('cart');
              }}
              className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
            >
              Claim Offer
            </button>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-2xl font-bold mb-4">Visit Us</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="text-amber-500 flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="font-semibold">Shop 6B, 48 Amiens Avenue</p>
              <p className="text-gray-600">Milperra, NSW 2214</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="text-amber-500" size={20} />
            <a href="tel:0406444067" className="text-gray-700 hover:text-amber-500">0406 444 067</a>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="text-amber-500" size={20} />
            <a href="mailto:info@coresynergy.com.au" className="text-gray-700 hover:text-amber-500">info@coresynergy.com.au</a>
          </div>
        </div>
      </div>
    </div>
  );

  // Schedule View
  const ScheduleView = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const [selectedDay, setSelectedDay] = useState('Monday');

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Calendar className="text-amber-500" />
            Class Schedule
          </h2>
          <p className="text-gray-600">Book your spot in upcoming classes</p>
        </div>

        {/* Day Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {days.map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition ${
                selectedDay === day
                  ? 'bg-amber-500 text-black'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Classes for Selected Day */}
        <div className="space-y-4">
          {classes.filter(c => c.day === selectedDay).length > 0 ? (
            classes.filter(c => c.day === selectedDay).map(classItem => (
              <div key={classItem.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{classItem.name}</h3>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{classItem.time} • {classItem.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        <span>with {classItem.instructor}</span>
                      </div>
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        classItem.spots <= 2 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {classItem.spots} {classItem.spots === 1 ? 'spot' : 'spots'} left
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedClass(classItem);
                      setCurrentView('booking');
                    }}
                    className="bg-amber-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-amber-400 transition"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl p-12 text-center shadow-lg">
              <p className="text-gray-500 text-lg">No classes scheduled for {selectedDay}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Memberships View
  const MembershipsView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <CreditCard className="text-amber-500" />
          Memberships
        </h2>
        <p className="text-gray-600">Choose the perfect membership for your lifestyle</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {memberships.map((membership, index) => (
          <div 
            key={membership.id} 
            className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition ${
              index === 0 ? 'ring-2 ring-amber-500 relative' : ''
            }`}
          >
            {index === 0 && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-amber-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </span>
              </div>
            )}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">{membership.name}</h3>
              <div className="text-4xl font-bold text-amber-500 mb-2">
                ${membership.price}
                <span className="text-lg text-gray-500">/mo</span>
              </div>
              <p className="text-gray-600">{membership.description}</p>
            </div>
            <ul className="space-y-3 mb-6">
              {membership.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2">
                  <ChevronRight className="text-amber-500 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                addToCart(membership, 'membership');
                setCurrentView('cart');
              }}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                index === 0
                  ? 'bg-amber-500 text-black hover:bg-amber-400'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // Class Packs View
  const PacksView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Package className="text-amber-500" />
          Class Packs
        </h2>
        <p className="text-gray-600">Flexible class packages to suit your schedule</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packs.map(pack => (
          <div 
            key={pack.id} 
            className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition ${
              pack.featured ? 'ring-2 ring-amber-500 relative' : ''
            }`}
          >
            {pack.featured && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-amber-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                  BEST VALUE
                </span>
              </div>
            )}
            <h3 className="text-xl font-bold mb-3">{pack.name}</h3>
            {pack.description && (
              <p className="text-gray-600 text-sm mb-3">{pack.description}</p>
            )}
            <div className="text-3xl font-bold text-amber-500 mb-2">
              ${pack.price}
            </div>
            <div className="text-sm text-gray-600 mb-4">
              ${pack.perClass.toFixed(2)} per class • Valid {pack.validity}
            </div>
            <button
              onClick={() => {
                addToCart(pack, 'pack');
                setCurrentView('cart');
              }}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                pack.featured
                  ? 'bg-amber-500 text-black hover:bg-amber-400'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              Buy Pack
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // About View
  const AboutView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-3xl font-bold mb-4">About Core Synergy</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Welcome to Core Synergy, Milperra&apos;s first reformer pilates studio. Founded by Jess, our studio 
          is built on the philosophy of wellness, strength, and community. We&apos;re dedicated to helping you 
          achieve your fitness goals while fostering a supportive and inclusive environment.
        </p>
        <p className="text-gray-700 leading-relaxed">
          At Core Synergy, you&apos;ll experience top-of-the-line reformer machines and highly qualified trainers 
          who provide a personalized experience with our signature 6:1 ratio. You&apos;ll always get the attention 
          you deserve. Located just a short drive from Bankstown, Revesby, and Liverpool.
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-2xl font-bold mb-6">Our Instructors</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {instructors.map(instructor => (
            <div key={instructor.name} className="text-center">
              <div className="text-6xl mb-3">{instructor.image}</div>
              <h4 className="text-xl font-bold mb-1">{instructor.name}</h4>
              <p className="text-amber-500 font-semibold mb-2">{instructor.role}</p>
              <p className="text-gray-600 text-sm">{instructor.specialty}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900 text-white rounded-xl p-8">
        <h3 className="text-2xl font-bold mb-4">What Our Members Say</h3>
        <div className="space-y-4">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex text-amber-400 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <p className="text-gray-300 mb-3">
              &quot;I&apos;ve been attending classes almost three times a week since October 2024, and I absolutely 
              love it! Pilates has become my new favorite form of exercise—it challenges me, strengthens 
              my body, and leaves me feeling amazing after every session.&quot;
            </p>
            <p className="text-amber-400 font-semibold">- Jade Carpenter</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Booking View
  const BookingView = () => (
    <div className="space-y-6">
      <button 
        onClick={() => setCurrentView('schedule')}
        className="text-amber-500 hover:text-amber-600 flex items-center gap-2"
      >
        ← Back to Schedule
      </button>

      {selectedClass && (
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Book Your Class</h2>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold mb-4">{selectedClass.name}</h3>
            <div className="space-y-2 text-gray-700">
              <p><strong>Instructor:</strong> {selectedClass.instructor}</p>
              <p><strong>Time:</strong> {selectedClass.time}</p>
              <p><strong>Duration:</strong> {selectedClass.duration}</p>
              <p><strong>Day:</strong> {selectedClass.day}</p>
              <p><strong>Spots Available:</strong> {selectedClass.spots}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Full Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:outline-none"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:outline-none"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Phone</label>
              <input 
                type="tel" 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:outline-none"
                placeholder="0400 000 000"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Special Requirements (Optional)</label>
              <textarea 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:outline-none"
                rows={3}
                placeholder="Any injuries or special requirements we should know about?"
              ></textarea>
            </div>
            <button
              onClick={() => {
                setBookingConfirmed(true);
                setTimeout(() => {
                  setBookingConfirmed(false);
                  setCurrentView('schedule');
                }, 3000);
              }}
              className="w-full bg-amber-500 text-black py-4 rounded-lg font-bold text-lg hover:bg-amber-400 transition"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      )}

      {bookingConfirmed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full text-center">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
            <p className="text-gray-600">
              You&apos;re all set for {selectedClass?.name} on {selectedClass?.day} at {selectedClass?.time}
            </p>
          </div>
        </div>
      )}
    </div>
  );

  // Cart View
  const CartView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <CreditCard className="text-amber-500" />
          Your Cart
        </h2>
        <p className="text-gray-600">Review your items before checkout</p>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-lg">
          <Package className="mx-auto text-gray-300 mb-4" size={64} />
          <h3 className="text-xl font-bold mb-2">Your cart is empty</h3>
          <p className="text-gray-600 mb-6">Add memberships or class packs to get started</p>
          <button
            onClick={() => setCurrentView('memberships')}
            className="bg-amber-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-amber-400 transition"
          >
            Browse Memberships
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {item.type === 'membership' ? 'Monthly Membership' : 'Class Pack'}
                  </p>
                  {item.description && (
                    <p className="text-gray-500 text-sm">{item.description}</p>
                  )}
                </div>
                <div className="text-right ml-4">
                  <div className="text-2xl font-bold text-amber-500 mb-2">
                    ${item.price}
                  </div>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-red-500 hover:text-red-700 text-sm font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center text-xl font-bold mb-6">
              <span>Total:</span>
              <span className="text-amber-500">${getTotalPrice()}</span>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Payment Method</label>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:outline-none">
                  <option>Credit/Debit Card</option>
                  <option>PayPal</option>
                  <option>Apple Pay</option>
                  <option>Google Pay</option>
                </select>
              </div>
              <button className="w-full bg-amber-500 text-black py-4 rounded-lg font-bold text-lg hover:bg-amber-400 transition">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {currentView === 'home' && <HomeView />}
        {currentView === 'schedule' && <ScheduleView />}
        {currentView === 'memberships' && <MembershipsView />}
        {currentView === 'packs' && <PacksView />}
        {currentView === 'about' && <AboutView />}
        {currentView === 'booking' && <BookingView />}
        {currentView === 'cart' && <CartView />}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400 mb-2">© 2024 Core Synergy. All rights reserved.</p>
          <p className="text-gray-500 text-sm">
            Shop 6B, 48 Amiens Avenue, Milperra, NSW 2214 | 0406 444 067
          </p>
        </div>
      </footer>
    </div>
  );
}
