import React from "react";

type Props = {
  title: string;
  subtitle?: string;
};

const SectionTitle = ({ title, subtitle }: Props) => {
  return (
    <div className="text-center dark:bg-white">
      <h3 className="text-2xl lg:text-3xl md:text-4xl font-bold text-primary">
        {title}
      </h3>

      {subtitle && (
        <h3 className="text-sm lg:text-lg text-gray-600 mt-2">{subtitle}</h3>
      )}
    </div>
  );
};

export default SectionTitle;
