"use client";

import { formatPeso } from "@/utils/formatters";
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
import React, { useEffect, useState } from "react";

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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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
    <div className="container mx-auto flex w-full max-w-7xl flex-grow flex-col gap-4 px-2">
      <Card>
        <CardBody>
          <div className="flex flex-wrap gap-3 md:flex-nowrap">
            <Select
              name="years"
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
              name="months"
              className="w-full md:max-w-xs"
              label="Select Months"
              size="sm"
              onChange={onChange}
            >
              {Array.from({ length: 12 }).map((_, index) => (
                <SelectItem
                  key={index}
                  textValue={`${index} ${index == 1 ? "Month" : "Months"}`}
                >
                  {index} {index == 1 ? "Month" : "Months"}
                </SelectItem>
              ))}
            </Select>

            <Input
              name="amount"
              label="Enter Loan Amount (00.00)"
              size="sm"
              type="number"
              onChange={onChange}
            />

            <Input
              name="rate"
              label="Enter Interest (%)"
              size="sm"
              type="number"
              onChange={onChange}
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
              {values.years} Year{values.years > 1 ? "s" : ""}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Selected Months</TableCell>
            <TableCell>
              {values.months} Month{values.months > 1 ? "s" : ""}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Loan Amount</TableCell>
            <TableCell>{formatPeso(values.amount)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Interest Rate</TableCell>
            <TableCell>{values.rate}%</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Monthly Payment</TableCell>
            <TableCell>
              {formatPeso(
                isNaN(values.monthly) || !isFinite(values.monthly)
                  ? 0.0
                  : values.monthly,
              )}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Total Loan Amount</TableCell>
            <TableCell>
              {formatPeso(isNaN(values.total) ? 0.0 : values.total)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <h3 className="text-sm text-default-500">
        * Please note that the results provided by this calculator are estimates
        and may vary. The final loan amount, interest rates, and monthly
        payments will be determined by the bank upon approval.
      </h3>
    </div>
  );
};

export default LoanForm;
