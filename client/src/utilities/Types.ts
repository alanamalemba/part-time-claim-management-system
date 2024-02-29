export type UserType = {
  id: string;
  name: string;
  email: string;
  role: string;
  account_number: string;
  national_id: string;
  department: string;
};

export type ClaimType = {
  id: string;
  claimant_id: number;
  hours: number;
  date: string;
  department_status: string;
  registrar_status: string;
  finance_status: string;
  file_url: string;
  department: string;
  unit_id: number;
};

export type ClaimantType = {
  name: string;
  email: string;
};

export type DepartmentType = {
  id: string;
  name: string;
  manager_id: string;
};

export type JobType = {
  id: string;
  name: string;
  pay_rate: string;
  department_id: string;
};

export type UnitType = {
  id: string;
  CF: string;
  department: string;
  unit_code: string;
  unit_title: string;
};
