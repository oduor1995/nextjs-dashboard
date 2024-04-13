'use client';
import { lusitana } from '@/app/ui/fonts';
import React from 'react';
import App, { DashboardCard } from '../ui/dashboard/card';
import { ECommerce } from '@/app/src/components/Dashboard/E-commerce';
import { DefaultLayout } from '@/app/src/components/Layouts/DefaultLayout';
import Chart from '../src/components/Charts/page';
import { DarkModeToggle } from '../DarkModeToggle';
import { BasicSpeedDial } from '../speeddial/page';
import { ActionAreaCard } from '@/app/ui/dashboard/card';
import { SimpleLineChart } from '@/app/ui/dashboard/charts';

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div>
        <div className="col-span-full mx-auto flex justify-between space-x-6">
          <div className="w-1/3">
            <ActionAreaCard
              image="https://cdn.mos.cms.futurecdn.net/6ZYk9A8EBh62fytQ64a5JW-1600-80.jpg.webp"
              title="Sms Sent"
              description="Stay connected and informed "
              bgColor="#d0d0d0"
              textColor="#333"
            />
          </div>
          <div className="w-1/3">
            <ActionAreaCard
              image="https://www.infotectraining.com/sites/default/files/field/image/infotec_75.png"
              title="Total Customers"
              description="Join our growing community of satisfied customers"
              bgColor="#d0d0d0"
              textColor="#444"
            />
          </div>
          <div className="w-1/3">
            <ActionAreaCard
              image="https://www.finserve.africa/images/equitel-logo.svg"
              title="Sms Campaign"
              description="Unlock greater engagement and reach with  SMS campaigns"
              bgColor="#d0d0d0"
              textColor="#555"
            />
          </div>
          {/* <DashboardCard /> */}
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <SimpleLineChart />
      </div>
    </main>
  );
}
