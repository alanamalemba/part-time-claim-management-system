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
  hours: number;
  date: string;
  status: string;
  user_id: string;
  job_id: string;
  file_url: string;
  department: string;
  unit_id: number;
};

export type ClaimantType = {
  name: string;
  email: string;
  job_id: string;
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
  name: string;
  CF: string;
  department: string;
  unit_code: string;
  unit_title: string;
};
