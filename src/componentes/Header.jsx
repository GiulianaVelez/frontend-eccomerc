'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from '@heroicons/react/20/solid'

const products = [
  { name: 'REMERAS', description: 'REMERAS A LOS MEJORES PRECIOS', href: '/REMERAS', imgSrc: 'https://netivooregon.s3.amazonaws.com/attach/modelo/20241011/2035/89722753.webp?259-0' },
  { name: 'PANTALONES', description: 'Descubre nuestra colección de pantalones', href: '/PANTALONES', imgSrc: 'https://netivooregon.s3.amazonaws.com/attach/modelo/20240808/2547/87756388.webp?259-0' },
  { name: 'FALDAS', description: 'Faldas para cada ocasión', href: '/FALDAS', imgSrc: 'https://netivooregon.s3.amazonaws.com/attach/modelo/20230713/2213/95404237.webp?259-0' },
  { name: 'VESTIDOS', description: 'Vestidos elegantes y cómodos', href: '/VESTIDOS', imgSrc: 'https://netivooregon.s3.amazonaws.com/attach/modelo/20241011/2035/93447308.webp?259-183703' },
]

const callsToAction = [
  { name: 'Ver carrito', href: '/carrito', icon: PlayCircleIcon },
  { name: 'Contactate con nosotros', href: '/contacto', icon: PhoneIcon },
]

const sections = [
  { name: 'Ofertas', href: '/ofertas' },
  { name: 'Novedades', href: '/novedades' },
  { name: 'Quiénes somos', href: '/quienes-somos' },
]

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-pink-500">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
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
              Productos
              <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition"
            >
              <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                  >
                    <div className="flex-none">
                      <img
                        src={item.imgSrc}
                        alt={item.name}
                        className="h-16 w-16 rounded-lg object-cover group-hover:border-2 group-hover:border-pink-500"
                      />
                    </div>
                    <div className="text-left">
                      <a href={item.href} className="block font-semibold text-gray-900">
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                {callsToAction.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                  >
                    <item.icon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
                    {item.name}
                  </a>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          {sections.map((section) => (
            <a key={section.name} href={section.href} className="text-sm font-semibold leading-6 text-gray-900">
              {section.name}
            </a>
          ))}
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="/carrito" className="text-sm font-semibold leading-6 text-gray-900">
            <button className="flex p-3 bg-pink-500 rounded-md hover:bg-pink-600">
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
  )
}
