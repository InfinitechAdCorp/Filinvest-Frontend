import Hero from "@/components/globals/hero";
import LoanForm from "@/components/user/loan-calculator/loanForm";
import React from "react";

const LoanCalculator = () => {
  return (
    <>
      <Hero image="/images/banner.jpg" title="Loan Calculator" />

      <div className="flex justify-center my-7">
        <LoanForm />
      </div>
    </>
  );
};

export default LoanCalculator;
