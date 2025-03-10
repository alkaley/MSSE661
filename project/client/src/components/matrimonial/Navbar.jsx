"use client"
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '/', label: 'Home', id: '#' },
  { href: '/user/sign-in', label: 'Sign In', id: 'sign-in' },
  { href: '/user/sign-up', label: 'Sign Up', id: 'sign-up' },
];
const Navbar = () => {
  const pathname = usePathname();
  console.log(pathname)
  const isActive = (href) => {
    return pathname === href;
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handle server-side rendering (SSR) and client-side hydration
  useEffect(() => {
    const initialMenuState = window?.localStorage?.getItem('isMenuOpen') === 'true';
    setIsMenuOpen(initialMenuState);
  }, []); // Empty dependency array to run only on initial render

  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="bg-[#f5f2ee] md:bg-[transparent] w-full md:px-4 py-[10px] z-50">
      <div className="custom_container">
        <div className="flex w-full flex-row md:flex-col md:justify-center  justify-between items-center">
          <Link href="/" >
            <div className="">
              <img src="/icoi_logo_bm.png" alt="Logo" className='h-auto w-[235px] sm:w-[300px] lg:[400px] 2xl:w-[450px]' />
            </div>
          </Link>
          <div className="md:hidden flex flex-col justify-center items-center gap-[4px] sm:gap-[5px] absolute z-50 right-[20px] sm:right-[30px] cursor-pointer" onClick={toggleMenu}>
            <div className={`bg-black h-[2px] sm:h-[3px] w-[20px] sm:w-[24px] transition duration-300 ease-in-out ${isMenuOpen ? 'rotate-45' : ''}`}></div>
            <div className={`bg-black h-[2px] sm:h-[3px] w-[20px] sm:w-[24px] transition duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`bg-black h-[2px] sm:h-[3px] w-[20px] sm:w-[24px] transition duration-300 ease-in-out ${isMenuOpen ? '-rotate-45' : ''}`}></div>
          </div>
          <ul className={`hidden md:flex md:gap-[5px] lg:gap-[10px] `}>
            {navItems.map((item) => (
              <li key={item.href}>
                {console.log(item.href, pathname)}
                <Link href={item.href} onClick={handleLinkClick}>
                  <span className={`text-black font-[700] md:text-[16px] lg:text-[18px] 2xl:text-[20px] leading-[32px] px-2 border-b-2  hover:border-[#841c32]  transition duration-700 ease-in-out
                   ${item.href === pathname ? 'border-b-2 border-[#841c32] ' : 'border-[transparent]'}
                  `}>
                    {item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className={`  absolute top-0 bottom-0 right-0 bg-[#841c32] transition duration-300 ease-in-out navbar ${isMenuOpen ? 'opacity-100 z-20 block' : 'opacity-0 hidden'}`}>
            <ul className={`md:hidden flex flex-col gap-[5px] sm:gap-[10px] py-[70px] sm:py-[100px] px-[10px] sm:px-[30px] `}>
              {navItems.map((item) => (
                <li key={item.href} className={` md:py-0   py-[5px] sm:py-[10px]`}>
                  <Link href={item.href} onClick={handleLinkClick}>
                    <span className={`text-black font-[700] text-[16px] sm:text-[22px] md:text-[18px] 2xl:text-[20px] leading-[32px] px-2 border-b-[transparent]  hover:border-b-[#841c32]
                      ${item.href === pathname ? 'border-[#841c32]' : 'border-[transparent]'}
                  `}>
                      {item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
