"use client"
import { Button } from '@/components/ui/button';
import {   DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,} from '@/components/ui/dropdown-menu'
import { SunMoon, MoonIcon, SunIcon } from 'lucide-react';

import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'

function Toggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
  
    useEffect(() => {
      setMounted(true);
    }, []);
  
    if (!mounted) {
      return null;
    }
  
    return (
      <DropdownMenu >
        <DropdownMenuTrigger  asChild>
          <Button
            variant='ghost'
            className='focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer'
          >
            {theme === 'system' ? (
              <SunMoon  className='cursor-pointer'/>
            ) : theme === 'dark' ? (
              <MoonIcon className='cursor-pointer' />
            ) : (
              <SunIcon className='cursor-pointer' />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuSeparator />
 
          <DropdownMenuCheckboxItem
          className='cursor-pointer'
            checked={theme === 'dark'}
            onClick={() => setTheme('dark')}
          >
            Dark
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
          className='cursor-pointer'
            checked={theme === 'light'}
            onClick={() => setTheme('light')}
          >
            Light
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
}

export default Toggle