import { whatsappLink } from '@/lib/site'
import { WhatsAppIcon } from './Icons'

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat to Apex Metals on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center border border-line-strong bg-base/90 text-[#25d366] backdrop-blur transition-colors hover:border-[#25d366] sm:bottom-7 sm:right-7"
    >
      <WhatsAppIcon size={24} />
      <span className="label pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap border border-line-strong bg-base px-3 py-2 text-fg opacity-0 transition-opacity group-hover:opacity-100 md:block">
        WhatsApp us
      </span>
    </a>
  )
}
