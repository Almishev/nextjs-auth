import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-xl font-bold mb-4 border-b border-indigo-400 pb-2 inline-block">Луксозен Престой</h3>
            <p className="text-gray-300 mb-4">
              Предлагаме перфектно съчетание от комфорт и елегантност за вашата почивка или бизнес пътуване.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 hover:scale-110 transform">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 hover:scale-110 transform">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 hover:scale-110 transform">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-xl font-bold mb-4 border-b border-indigo-400 pb-2 inline-block">Контакти</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <MapPin size={18} className="mr-2 text-indigo-400" />
                <span>ул. Княз Борис I 12, София</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Phone size={18} className="mr-2 text-indigo-400" />
                <span>+359 888 123 456</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Mail size={18} className="mr-2 text-indigo-400" />
                <span>info@luxhotel.bg</span>
              </li>
            </ul>
          </div>
          
          <div className="animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
            <h3 className="text-xl font-bold mb-4 border-b border-indigo-400 pb-2 inline-block">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 hover:translate-x-1 transform inline-block">
                  Начало
                </Link>
              </li>
              <li>
                <Link href="/rooms" className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 hover:translate-x-1 transform inline-block">
                  Стаи
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 hover:translate-x-1 transform inline-block">
                  За нас
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 hover:translate-x-1 transform inline-block">
                  Резервация
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-700 text-center">
          <p className="text-gray-300 animate-fadeIn">&copy; {new Date().getFullYear()} Луксозен Престой. Всички права запазени.</p>
        </div>
      </div>
    </footer>
  );
} 