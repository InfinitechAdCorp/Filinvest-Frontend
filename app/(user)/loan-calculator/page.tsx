import Hero from "@/components/globals/hero";
import LoanForm from "@/components/user/loan-calculator/loanForm";
import React from "react";

const Page = () => {
  return (
    <>
      <Hero image="/images/banner.jpg" title="Loan Calculator" />

      <div className="my-7 flex justify-center">
        <LoanForm />
      </div>
    </>
  );
};

export default Page;
