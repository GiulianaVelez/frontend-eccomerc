'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  UserIcon,
  PhoneIcon, // Añadido el icono de teléfono
} from '@heroicons/react/20/solid';

const offers = [
  { name: '2x1', href: '/ofertas/2x1' },
  { name: '10% de descuento', href: '/ofertas/10-descuento' },
  { name: 'Liquidación temporada invierno', href: '/ofertas/invierno' },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-pink-500">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex items-center lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Bella Chic</span>
            <img
              alt="Bella Chic Logo"
              src="https://th.bing.com/th/id/OIP.NSMFPFYHBFbN6r7futOCEwHaHa?rs=1&pid=ImgDetMain"
              className="max-w-[89px] max-h-[89px] rounded-full"
            />
          </a>
        </div>

        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Inicio
              <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
            </PopoverButton>
            <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
              <div className="p-4">
                <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-pink-200">
                  <a href="/mi-cuenta" className="block font-semibold text-gray-900">
                    <UserIcon className="h-5 w-5 text-gray-600 mr-2" aria-hidden="true" />
                    Ingresar a mi cuenta
                  </a>
                </div>
                <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-pink-200">
                  <a href="/contacto" className="block font-semibold text-gray-900">
                    <PhoneIcon className="h-5 w-5 text-gray-600 mr-2" aria-hidden="true" />
                    Contactate con nosotros
                  </a>
                </div>
              </div>
            </PopoverPanel>
          </Popover>

          <Popover className="relative">
            <PopoverButton className="text-sm font-semibold leading-6 text-gray-900 flex items-center gap-x-1">
              Ofertas
              <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
            </PopoverButton>
            <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
              <div className="p-4">
                {offers.map((offer) => (
                  <div key={offer.name} className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-pink-200">
                    <a href={offer.href} className="block font-semibold text-gray-900">{offer.name}</a>
                  </div>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          <a href="/acerca-de-nosotros" className="text-sm font-semibold leading-6 text-gray-900">Acerca de nosotros</a>
          <a href="/ayuda" className="text-sm font-semibold leading-6 text-gray-900">Ayuda</a>
        </PopoverGroup>

        <div className="lg:flex lg:flex-1 lg:justify-end">
          <a href="/carrito" className="text-sm font-semibold leading-6 text-gray-900">
            <button className="flex p-3 bg-pink-200 rounded-md hover:bg-pink-300">
              <div className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
              </div>
              <div>
                Carrito <span aria-hidden="true">&rarr;</span>
              </div>
            </button>
          </a>
        </div>
      </nav>
    </header>
  );
}
