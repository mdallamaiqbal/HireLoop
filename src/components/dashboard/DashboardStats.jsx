import {StatCard} from './StatCard'
export default function DashboardStats({ statsData = [] }) {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {statsData.map((item, index) => (
        <StatCard
          key={item.id || index}
          title={item.title}
          value={item.value}
          icon={item.icon}
        />
      ))}
    </div>
  );
}