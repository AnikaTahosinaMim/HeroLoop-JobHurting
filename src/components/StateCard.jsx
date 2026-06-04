// components/dashboard/StatCard.jsx

export default function StatCard({
  icon: Icon,
  title,
  value,
  change,
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 transition-all hover:border-zinc-700">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900">
        <Icon className="h-5 w-5 text-zinc-400" />
      </div>

      <p className="text-xs text-zinc-500">{title}</p>

      <h3 className="mt-2 text-3xl font-semibold text-white">
        {value}
      </h3>

      {change && (
        <p className="mt-2 text-xs text-emerald-400">
          {change}
        </p>
      )}
    </div>
  );
}