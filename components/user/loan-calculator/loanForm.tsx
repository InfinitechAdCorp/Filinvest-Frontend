"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

const LoanForm = () => {
  const [values, setValues] = useState({
    amount: 0,
    years: 0,
    months: 0,
    rate: 0,
    monthly: 0,
    total: 0,
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const key = e.target.name;
    const value = Number(e.target.value);
    setValues({ ...values, [key]: value });
  };

  useEffect(() => {
    const totalMonths = values.years * 12 + values.months;
    const monthlyRate = values.rate / 100 / 12;

    const monthlyPayment =
      (values.amount * (monthlyRate * (1 + monthlyRate) ** totalMonths)) /
      ((1 + monthlyRate) ** totalMonths - 1);
    const totalPayment = monthlyPayment * totalMonths;

    setValues({ ...values, monthly: monthlyPayment, total: totalPayment });
  }, [values.amount, values.years, values.months, values.rate]);

  return (
    <div className="container mx-auto flex-grow max-w-7xl px-2 w-full flex flex-col gap-4">
      <Card>
        <CardBody>
          <div className="flex flex-wrap md:flex-nowrap gap-3">
            <Select
              className="w-full md:max-w-xs"
              label="Select Years"
              size="sm"
              onChange={onChange}
            >
              {Array.from({ length: 26 }).map((_, index) => (
                <SelectItem
                  key={index}
                  textValue={`${index} ${index == 1 ? "Year" : "Years"}`}
                >
                  {index} {index == 1 ? "Year" : "Years"}
                </SelectItem>
              ))}
            </Select>

            <Select
              className="w-full md:max-w-xs"
              label="Select Months"
              size={"sm"}
              onChange={(e) => setSelectedMonths(Number(e.target.value))}
            >
              {months.map((month) => (
                <SelectItem key={month.key}>{month.label}</SelectItem>
              ))}
            </Select>

            <Input
              label="Enter Loan Amount (00.00)"
              size="sm"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
            <Input
              label="Enter Interest (%)"
              size="sm"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
          </div>
        </CardBody>
      </Card>

      <Table aria-label="Calculation Results">
        <TableHeader>
          <TableColumn>LOAN DETAILS</TableColumn>
          <TableColumn>VALUE</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Selected Years</TableCell>
            <TableCell>
              {selectedYears} Year{selectedYears > 1 ? "s" : ""}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Selected Months</TableCell>
            <TableCell>
              {selectedMonths} Month{selectedMonths > 1 ? "s" : ""}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Loan Amount</TableCell>
            <TableCell>
              ₱{" "}
              {parseFloat(loanAmount || "0").toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Interest Rate</TableCell>
            <TableCell>
              {parseFloat(interestRate || "0").toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
              %
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total Loan Amount (w/ interest)</TableCell>
            <TableCell>
              ₱ {isNaN(Number(results.totalLoan)) ? "0.00" : results.totalLoan}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Monthly Payment</TableCell>
            <TableCell>
              ₱{" "}
              {isNaN(Number(results.monthlyPayment))
                ? "0.00"
                : results.monthlyPayment}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total Amount</TableCell>
            <TableCell>
              ₱{" "}
              {isNaN(Number(results.totalAmount))
                ? "0.00"
                : results.totalAmount}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <p className="text-sm text-default-500">
        * Please note that the results provided by this calculator are estimates
        and may vary. The final loan amount, interest rates, and monthly
        payments will be determined by the bank upon approval.
      </p>
    </div>
  );
};

export default LoanForm;
