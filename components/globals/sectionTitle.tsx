import React from "react";

type Props = {
  title: string;
  subtitle?: string;
};

const SectionTitle = ({ title, subtitle }: Props) => {
  return (
    <div className="text-center dark:bg-white">
      <h3 className="text-2xl font-bold text-primary md:text-4xl lg:text-3xl">
        {title}
      </h3>

      {subtitle && (
        <h3 className="mt-2 text-sm text-gray-600 lg:text-lg">{subtitle}</h3>
      )}
    </div>
  );
};

export default SectionTitle;
