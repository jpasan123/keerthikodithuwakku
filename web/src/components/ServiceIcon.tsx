import {
  Cpu,
  Eye,
  FlaskConical,
  Globe2,
  GraduationCap,
  HeartPulse,
  Sparkles,
  Trophy,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  HeartPulse,
  Cpu,
  FlaskConical,
  GraduationCap,
  Sparkles,
  Globe2,
  Trophy,
  Eye,
};

export function ServiceIcon({
  name,
  className = "size-6",
}: {
  name: string;
  className?: string;
}) {
  const Icon = map[name] ?? HeartPulse;
  return <Icon className={className} aria-hidden strokeWidth={1.75} />;
}
