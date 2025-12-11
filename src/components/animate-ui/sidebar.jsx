'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Animated Sidebar Navigation
export function AnimatedSidebar({ 
  links = [], 
  className,
  isCollapsed = false,
  onToggleCollapse,
}) {
  const location = useLocation();

  return (
    <motion.aside
      className={cn(
        'relative h-screen bg-dark-900/95 backdrop-blur-xl border-r border-dark-700/50',
        'flex flex-col overflow-hidden',
        className
      )}
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500" />
        <motion.div 
          className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-primary-500/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Logo Section */}
      <div className="relative p-6 border-b border-dark-700/50">
        <motion.div
          className="flex items-center gap-3"
          initial={false}
          animate={{ justifyContent: isCollapsed ? 'center' : 'flex-start' }}
        >
          <motion.div
            className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-xl font-bold text-white font-display">X</span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-xl font-bold text-white font-display tracking-wider">
                  FIN<span className="text-primary-400">STUDIO</span>
                </h1>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Finance Tools</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-dark-600">
        {links.map((link, index) => {
          const isActive = location.pathname === link.href;
          
          return (
            <NavLink key={link.href} to={link.href}>
              <motion.div
                className={cn(
                  'relative flex items-center gap-3 px-4 py-3 rounded-sm transition-all cursor-pointer group',
                  'border border-transparent',
                  isActive 
                    ? 'bg-primary-500/10 border-primary-500/30 text-primary-400' 
                    : 'text-gray-400 hover:text-white hover:bg-dark-800/50'
                )}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 4 }}
              >
                {/* Active indicator */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-500"
                      layoutId="sidebar-indicator"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        boxShadow: '0 0 15px rgba(0, 212, 255, 0.5)',
                      }}
                    />
                  )}
                </AnimatePresence>
                
                {/* Icon */}
                <div className={cn(
                  'flex items-center justify-center w-8 h-8 transition-colors',
                  isActive ? 'text-primary-400' : 'text-gray-500 group-hover:text-primary-400'
                )}>
                  {link.icon}
                </div>
                
                {/* Label */}
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      className="text-sm font-medium tracking-wide"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                
                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-sm bg-gradient-to-r from-primary-500/0 via-primary-500/5 to-primary-500/0 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </motion.div>
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      {onToggleCollapse && (
        <div className="p-4 border-t border-dark-700/50">
          <motion.button
            onClick={onToggleCollapse}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: isCollapsed ? 180 : 0 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </motion.svg>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  className="text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Réduire
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      )}
    </motion.aside>
  );
}

// Sidebar Link Item
export function SidebarLink({ icon, label, href, isActive }) {
  return (
    <NavLink to={href}>
      <motion.div
        className={cn(
          'relative flex items-center gap-3 px-4 py-3 rounded-sm transition-all cursor-pointer group',
          'border border-transparent',
          isActive 
            ? 'bg-primary-500/10 border-primary-500/30 text-primary-400' 
            : 'text-gray-400 hover:text-white hover:bg-dark-800/50'
        )}
        whileHover={{ x: 4 }}
      >
        <div className="flex items-center justify-center w-8 h-8">
          {icon}
        </div>
        <span className="text-sm font-medium tracking-wide">{label}</span>
      </motion.div>
    </NavLink>
  );
}
