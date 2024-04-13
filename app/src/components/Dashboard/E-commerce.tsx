'use client';
import React from 'react';
import ChartOne from '../Charts/ChartOne';
import ChartThree from '../Charts/ChartThree';
import ChartTwo from '../Charts/ChartTwo';
import ChatCard from '../Chat/ChatCard';
import TableOne from '../Tables/TableOne';
import CardDataStats from '../CardDataStats';
import MapOne from '../Maps/MapOne';
import { Send } from 'react-feather';

export const ECommerce: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <CardDataStats className='bg-red'  title="SMS sent"> <Send/></CardDataStats>
        <CardDataStats
          title="SMS Delivered"
          backgroundColor="blue"
        ></CardDataStats>
        <CardDataStats title="Total Product"></CardDataStats>
        {/* <CardDataStats title="Total Users"></CardDataStats> */}
      </div>

      <div className="2xl:mt-7.5 2xl:gap-7.5 mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

//export default ECommerce;
