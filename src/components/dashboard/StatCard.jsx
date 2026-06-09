import React from "react";
import { Card } from "@heroui/react";

export function StatCard({ title, value, icon: Icon }) {
  return (
    <Card 
      className="bg-[#18181b] border border-neutral-800 text-white rounded-2xl shadow-sm hover:border-neutral-700 transition-colors duration-200"
    >
      <Card.Content className="p-6 flex flex-col gap-6">
        <div className="w-10 h-10 flex items-center justify-center bg-neutral-800 rounded-lg text-neutral-400">
          {Icon && <Icon className="w-5 h-5" />}
        </div>
        <div className="flex flex-col gap-1">
          <Card.Description className="text-sm font-medium text-neutral-400 truncate m-0 p-0">
            {title}
          </Card.Description>
          <Card.Title className="text-3xl font-semibold tracking-tight text-neutral-100 m-0 p-0">
            {value}
          </Card.Title>
        </div>
      </Card.Content>
    </Card>
  );
}