"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Header = () => {
  const pathname = usePathname()

  return (
    <header>
      <div className="main-container header-row">
        {/* Left */}
        <Link
          href="/"
          className={cn("nav-link flex items-center gap-2", {
            "is-active": pathname === "/",
          })}
        >
          <span>Home</span>
          <Image
            src="/logo.svg"
            alt="CoinPulse logo"
            width={132}
            height={40}
          />
        </Link>

        {/* Right */}
        <nav className="flex items-center gap-6">
          <Link href="/home" className="nav-link">
            Search Modal
          </Link>

          <Link
            href="/coins"
            className={cn("nav-link", {
              "is-active": pathname === "/coins",
            })}
          >
            All coins
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
