export default function GradLine() {
  return (
    <div className="w-full py-2 sm:py-3 md:py-4 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 md:gap-6 text-xs gradLine">
      <p className="text-white text-[8px] sm:text-[10px] md:text-xs lg:text-sm text-center sm:text-left px-2 sm:px-0">
        Invite friends to Fashion Festival & get up to $150 Bonus for every Referral
      </p>
      <button className="bg-slate-100 text-[8px] sm:text-[10px] md:text-xs lg:text-sm px-3 py-1 sm:py-[3px] rounded-full hover:bg-slate-200 transition-colors">
        Invite Now
      </button>
    </div>
  )
}

