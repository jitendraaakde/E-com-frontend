export default function FilterItem({ item }) {
  return (
    <button className="text-xs sm:text-sm border border-slate-700 px-3 py-2 rounded-full hover:bg-slate-100 transition-colors">
      {item}
    </button>
  )
}
