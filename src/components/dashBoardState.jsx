// components/dashboard/StatsGrid.jsx

import {
  Briefcase,
  Persons,
  Rocket,
  CircleCheck,
} from "@gravity-ui/icons";
import StatCard from "./StateCard";

// import StatCard from "./StatCard";

export default function StatsGrid() {
  const stats = [
    {
      icon: Briefcase,
      title: "Total Job Posts",
      value: 48,
    },
    {
      icon: Persons,
      title: "Total Applicants",
      value: "1,284",
    },
    {
      icon: Rocket,
      title: "Active Jobs",
      value: 18,
    },
    {
      icon: CircleCheck,
      title: "Jobs Closed",
      value: 32,
    },
  ];

  return (
<div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <StatCard
          key={item.title}
          icon={item.icon}
          title={item.title}
          value={item.value}
        />
      ))}
    </div>
  );
}