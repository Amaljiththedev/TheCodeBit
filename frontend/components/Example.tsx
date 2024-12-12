'use client'

import { Pointer } from './cursor'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import IDETextBox from './Textbox'

export const Example = () => (
  <div className={'flex h-[700px] w-full flex-col justify-between rounded-lg bg-black text-white'}>
    <div className="flex h-full w-full flex-col justify-center px-4 text-start sm:items-center sm:text-center mt-64">
      <div className="text-8xl font-bold">Revolutionizing Collaboration</div>
      <div className="mt-3 text-lg text-neutral-400">Unleash seamless collaboration in the cloud</div>
      <button className="px-6 mt-10 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition duration-200">Get Started</button>

      {/* IDETextBox with animated cursor */}
      <div className="relative">
        <IDETextBox />
        <AnimatedCursor text="Team" className="absolute top-1/4 left-1/4 z-10" />
      </div>
    </div>

    <Pointer name="You" className={'relative flex h-fit w-full items-end justify-center'}>
      <div className={'relative h-[400px] w-full overflow-hidden'}>
        <div className="relative flex h-full w-full justify-end pt-4">
          {/* You can remove this if you don't need the extra animated cursor */}
          {/* <AnimatedCursor text="Niko" /> */}
        </div>
      </div>
      <div className="relative bottom-0 right-40 h-full w-full bg-gradient-to-br from-purple-500 via-fuchsia-500 to-red-500 opacity-[0.3] blur-3xl" />
    </Pointer>
  </div>
)

const AnimatedCursor: React.FC<{ className?: string; text: string }> = ({ className, text }) => (
  <motion.div
    initial={{ translateX: '0', translateY: '0' }}
    animate={{ translateX: ['0', '20px', '0'], translateY: ['0', '40px', '0'] }}
    transition={{ duration: 4, repeat: Infinity, bounce: true }}
    className={cn('relative z-[2] flex items-center gap-4', className)}>
    <div
      className={cn(
        'w-fit rounded-full border border-red-500 bg-red-500 px-2 py-1 text-white',
        className
      )}>
      {text}
    </div>
    <svg fill="none" height="18" viewBox="0 0 17 18" width="17">
      <path
        d="M15.5036 3.11002L12.5357 15.4055C12.2666 16.5204 10.7637 16.7146 10.22 15.7049L7.4763 10.6094L2.00376 8.65488C0.915938 8.26638 0.891983 6.73663 1.96711 6.31426L13.8314 1.65328C14.7729 1.28341 15.741 2.12672 15.5036 3.11002ZM7.56678 10.6417L7.56645 10.6416C7.56656 10.6416 7.56667 10.6416 7.56678 10.6417L7.65087 10.4062L7.56678 10.6417Z"
        fill="var(--red-500)"
        stroke="var(--red-400)"
        strokeWidth="1.5"
      />
    </svg>
  </motion.div>
)
