import { GlobeAmericasIcon, Bars3Icon, UserCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Image from 'next/image'
import { truncate } from '../utils/string'
require('@solana/wallet-adapter-react-ui/styles.css')

function Header({ connected, publicKey, initializeUser , initialized, transactionPending}) {
    return (
        <header className="sticky top-0 transition-all md:grid md:grid-cols-3 items-center px-10 xl:px-20 py-4 z-50 bg-white border-b">
            <div>
                <svg className="xl:hidden w-8 h-8 transition-all duration-300 text-[#FF385C]" fill="currentcolor">
                    <path d="M29.24 22.68c-.16-.39-.31-.8-.47-1.15l-.74-1.67-.03-.03c-2.2-4.8-4.55-9.68-7.04-14.48l-.1-.2c-.25-.47-.5-.99-.76-1.47-.32-.57-.63-1.18-1.14-1.76a5.3 5.3 0 00-8.2 0c-.47.58-.82 1.19-1.14 1.76-.25.52-.5 1.03-.76 1.5l-.1.2c-2.45 4.8-4.84 9.68-7.04 14.48l-.06.06c-.22.52-.48 1.06-.73 1.64-.16.35-.32.73-.48 1.15a6.8 6.8 0 007.2 9.23 8.38 8.38 0 003.18-1.1c1.3-.73 2.55-1.79 3.95-3.32 1.4 1.53 2.68 2.59 3.95 3.33A8.38 8.38 0 0022.75 32a6.79 6.79 0 006.75-5.83 5.94 5.94 0 00-.26-3.5zm-14.36 1.66c-1.72-2.2-2.84-4.22-3.22-5.95a5.2 5.2 0 01-.1-1.96c.07-.51.26-.96.52-1.34.6-.87 1.65-1.41 2.8-1.41a3.3 3.3 0 012.8 1.4c.26.4.45.84.51 1.35.1.58.06 1.25-.1 1.96-.38 1.7-1.5 3.74-3.21 5.95zm12.74 1.48a4.76 4.76 0 01-2.9 3.75c-.76.32-1.6.41-2.42.32-.8-.1-1.6-.36-2.42-.84a15.64 15.64 0 01-3.63-3.1c2.1-2.6 3.37-4.97 3.85-7.08.23-1 .26-1.9.16-2.73a5.53 5.53 0 00-.86-2.2 5.36 5.36 0 00-4.49-2.28c-1.85 0-3.5.86-4.5 2.27a5.18 5.18 0 00-.85 2.21c-.13.84-.1 1.77.16 2.73.48 2.11 1.78 4.51 3.85 7.1a14.33 14.33 0 01-3.63 3.12c-.83.48-1.62.73-2.42.83a4.76 4.76 0 01-5.32-4.07c-.1-.8-.03-1.6.29-2.5.1-.32.25-.64.41-1.02.22-.52.48-1.06.73-1.6l.04-.07c2.16-4.77 4.52-9.64 6.97-14.41l.1-.2c.25-.48.5-.99.76-1.47.26-.51.54-1 .9-1.4a3.32 3.32 0 015.09 0c.35.4.64.89.9 1.4.25.48.5 1 .76 1.47l.1.2c2.44 4.77 4.8 9.64 7 14.41l.03.03c.26.52.48 1.1.73 1.6.16.39.32.7.42 1.03.19.9.29 1.7.19 2.5z"></path>
                </svg>
                <svg className="hidden xl:inline-flex h-8 transition-all duration-300 text-[#FF385C]" fill="currentcolor">
                    <path d="M29.24 22.68c-.16-.39-.31-.8-.47-1.15l-.74-1.67-.03-.03c-2.2-4.8-4.55-9.68-7.04-14.48l-.1-.2c-.25-.47-.5-.99-.76-1.47-.32-.57-.63-1.18-1.14-1.76a5.3 5.3 0 00-8.2 0c-.47.58-.82 1.19-1.14 1.76-.25.52-.5 1.03-.76 1.5l-.1.2c-2.45 4.8-4.84 9.68-7.04 14.48l-.06.06c-.22.52-.48 1.06-.73 1.64-.16.35-.32.73-.48 1.15a6.8 6.8 0 007.2 9.23 8.38 8.38 0 003.18-1.1c1.3-.73 2.55-1.79 3.95-3.32 1.4 1.53 2.68 2.59 3.95 3.33A8.38 8.38 0 0022.75 32a6.79 6.79 0 006.75-5.83 5.94 5.94 0 00-.26-3.5zm-14.36 1.66c-1.72-2.2-2.84-4.22-3.22-5.95a5.2 5.2 0 01-.1-1.96c.07-.51.26-.96.52-1.34.6-.87 1.65-1.41 2.8-1.41a3.3 3.3 0 012.8 1.4c.26.4.45.84.51 1.35.1.58.06 1.25-.1 1.96-.38 1.7-1.5 3.74-3.21 5.95zm12.74 1.48a4.76 4.76 0 01-2.9 3.75c-.76.32-1.6.41-2.42.32-.8-.1-1.6-.36-2.42-.84a15.64 15.64 0 01-3.63-3.1c2.1-2.6 3.37-4.97 3.85-7.08.23-1 .26-1.9.16-2.73a5.53 5.53 0 00-.86-2.2 5.36 5.36 0 00-4.49-2.28c-1.85 0-3.5.86-4.5 2.27a5.18 5.18 0 00-.85 2.21c-.13.84-.1 1.77.16 2.73.48 2.11 1.78 4.51 3.85 7.1a14.33 14.33 0 01-3.63 3.12c-.83.48-1.62.73-2.42.83a4.76 4.76 0 01-5.32-4.07c-.1-.8-.03-1.6.29-2.5.1-.32.25-.64.41-1.02.22-.52.48-1.06.73-1.6l.04-.07c2.16-4.77 4.52-9.64 6.97-14.41l.1-.2c.25-.48.5-.99.76-1.47.26-.51.54-1 .9-1.4a3.32 3.32 0 015.09 0c.35.4.64.89.9 1.4.25.48.5 1 .76 1.47l.1.2c2.44"></path>
                </svg>
            </div>

            <div className="flex-1 flex xl:justify-center px-6 transition-all duration-300">
                <button className="flex-1 flex items-center justify-between border rounded-full p-2 w-[300px] shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center divide-x">
                        <p className="text-gray-800 bg-transparent text-sm font-medium px-4" type="text">
                            Anywhere
                        </p>
                        <p className="text-gray-800 bg-transparent text-sm font-medium px-4" type="text">
                            Any week
                        </p>
                        <p className="text-gray-600 bg-transparent text-sm font-light px-4">Add guests</p>
                    </div>
                    <MagnifyingGlassIcon className="h-8 w-8 bg-[#FF385C] text-white stroke-[3.5px] p-2 rounded-full" />
                </button>
            </div>

            <div className="flex items-center justify-end">
                <div className="border border-transparent cursor-pointer hover:bg-gray-100 rounded-full px-3 py-2">
                    <a className="text-sm font-medium transition-all duration-300 text-gray-800" href="#">
                        Become a Host
                    </a>
                </div>

                <div className="border border-transparent cursor-pointer hover:bg-gray-100 rounded-full p-3">
                    <GlobeAmericasIcon className="h-5 w-5 transition-all duration-300 text-gray-800" />
                </div>

          {/* <div className="flex items-center bg-white text-gray-500 space-x-2 border rounded-full px-2 py-1 cursor-pointer shadow-sm hover:shadow-md transition">
                    <Bars3Icon className="h-5 w-5" />

                    <UserCircleIcon className="h-8 w-8" />
                </div>*/}

                
                <WalletMultiButton className="phantom-button" startIcon={<UserCircleIcon style={{ height: 32, width: 32, color: '#1f2937' }} />}>
                    <span className="text-sm font-medium text-black">{connected ? truncate(publicKey.toString()) : 'Connect Wallet'}</span>
                </WalletMultiButton>
            </div>
        </header>
    )
}

export default Header
