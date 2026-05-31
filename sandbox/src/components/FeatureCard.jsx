import { Check } from 'lucide-react';

export default function FeatureCard({ title, description }) {
  return (
    <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition">
      <Check className="text-emerald-450 mb-3" size={20} />
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{description}</p>
    </div>
  );
}