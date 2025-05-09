'use client';

const RoomPlannerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen overflow-hidden">
      {children}
    </div>
  );
};

export default RoomPlannerLayout;
