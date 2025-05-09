'use client';

const RoomPlannerPage = () => {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <iframe
        src="https://roomplanner-six.vercel.app/roomplanner/dmci"
        className="w-full h-full"
        style={{ border: 'none' }}
        title="Room Planner"
      />
    </div>
  );
};

export default RoomPlannerPage;
