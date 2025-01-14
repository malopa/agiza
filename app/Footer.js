import Image from 'next/image'
import React from 'react'

export default function Footer() {
  return (
    <footer className="row-start-3 flex bg-white p-2 flex-wrap items-center justify-center">
            <a
          className="flex items-center  hover:underline hover:underline-offset-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/icon.png"
            alt="Globe icon"
            width={16}
            height={16}
          />
        agiza.com →
        </a>
      </footer>
  )
}
