'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';

// ============================================
// Animated Popover
// ============================================
export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;

export const PopoverContent = React.forwardRef(
  ({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'z-50 w-72 rounded-sm border border-dark-600 bg-dark-900/95 backdrop-blur-xl p-4 text-gray-100 shadow-xl outline-none',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        style={{
          clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 212, 255, 0.1)',
        }}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

// ============================================
// Animated Tabs
// ============================================
export const Tabs = TabsPrimitive.Root;

export const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex h-12 items-center justify-center rounded-sm bg-dark-800/50 p-1 text-gray-400 border border-dark-600/50',
      className
    )}
    style={{
      clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
    }}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

export const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'relative inline-flex items-center justify-center whitespace-nowrap px-4 py-2 text-sm font-medium uppercase tracking-wider',
      'transition-all duration-200 outline-none',
      'disabled:pointer-events-none disabled:opacity-50',
      'data-[state=active]:text-primary-400 data-[state=active]:shadow-sm',
      'hover:text-gray-200',
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-4 outline-none',
      'data-[state=active]:animate-in data-[state=inactive]:animate-out',
      'data-[state=inactive]:fade-out-0 data-[state=active]:fade-in-0',
      'data-[state=inactive]:slide-out-to-left-2 data-[state=active]:slide-in-from-right-2',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

// Animated Tab Indicator
export function AnimatedTabs({ tabs, activeTab, onTabChange, className }) {
  return (
    <div 
      className={cn(
        'relative inline-flex h-12 items-center bg-dark-800/50 p-1 border border-dark-600/50',
        className
      )}
      style={{
        clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'relative px-4 py-2 text-sm font-medium uppercase tracking-wider transition-colors z-10',
            activeTab === tab.id ? 'text-white' : 'text-gray-400 hover:text-gray-200'
          )}
        >
          {tab.label}
          {activeTab === tab.id && (
            <motion.div
              layoutId="active-tab"
              className="absolute inset-0 bg-primary-600/80 -z-10"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
                boxShadow: '0 0 15px rgba(0, 212, 255, 0.3)',
              }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}

// ============================================
// Animated Tooltip
// ============================================
export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipContent = React.forwardRef(
  ({ className, sideOffset = 4, ...props }, ref) => (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 overflow-hidden rounded-sm border border-dark-600 bg-dark-800 px-3 py-1.5 text-sm text-gray-100',
        'animate-in fade-in-0 zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
        'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      style={{
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 10px rgba(0, 212, 255, 0.1)',
      }}
      {...props}
    />
  )
);
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// ============================================
// Animated Theme Switch
// ============================================
export const Switch = React.forwardRef(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    className={cn(
      'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent',
      'transition-colors duration-200 ease-in-out',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'data-[state=checked]:bg-primary-600 data-[state=unchecked]:bg-dark-700',
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        'pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0',
        'transition-transform duration-200 ease-in-out',
        'data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0'
      )}
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = SwitchPrimitive.Root.displayName;

// Theme Toggle with Animation
export function ThemeSwitch({ isDark, onToggle, className }) {
  return (
    <motion.button
      onClick={onToggle}
      className={cn(
        'relative flex items-center justify-center w-12 h-12 rounded-sm',
        'bg-dark-800 border border-dark-600 text-gray-400 hover:text-white',
        'transition-colors',
        className
      )}
      style={{
        clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.svg
            key="moon"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </motion.svg>
        ) : (
          <motion.svg
            key="sun"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            transition={{ duration: 0.2 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ============================================
// Animated Card
// ============================================
export function AnimatedCard({ className, children, hover = true, glow = false, ...props }) {
  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-sm border border-dark-600/50 bg-dark-800/80 backdrop-blur-sm',
        glow && 'shadow-[0_0_30px_rgba(0,212,255,0.1)]',
        className
      )}
      style={{
        clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
      }}
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
      
      {/* Content */}
      {children}
    </motion.div>
  );
}

// ============================================
// Sliding Number (Animate UI style)
// ============================================
export function SlidingNumber({ value, className }) {
  const digits = String(value).split('');
  
  return (
    <span className={cn('inline-flex overflow-hidden font-display tabular-nums', className)}>
      {digits.map((digit, index) => (
        <span key={index} className="relative inline-block">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={digit}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="inline-block"
            >
              {digit}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  );
}

// ============================================
// Stagger Container for animations
// ============================================
export function StaggerContainer({ children, className, staggerDelay = 0.1 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
