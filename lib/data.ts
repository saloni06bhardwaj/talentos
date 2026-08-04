export const employees = [
  { id: 1, name: 'Sarah Chen', role: 'Senior Engineer', department: 'Engineering', email: 'sarah.chen@company.com', location: 'San Francisco', status: 'active', avatar: 'SC', salary: 145000, startDate: '2021-03-15', manager: 'James Wilson', phone: '+1 (415) 555-0123' },
  { id: 2, name: 'Marcus Rivera', role: 'Product Manager', department: 'Product', email: 'marcus.r@company.com', location: 'New York', status: 'active', avatar: 'MR', salary: 135000, startDate: '2020-07-01', manager: 'Lisa Park', phone: '+1 (212) 555-0456' },
  { id: 3, name: 'Aisha Johnson', role: 'UX Designer', department: 'Design', email: 'aisha.j@company.com', location: 'Austin', status: 'active', avatar: 'AJ', salary: 115000, startDate: '2022-01-10', manager: 'Marcus Rivera', phone: '+1 (512) 555-0789' },
  { id: 4, name: 'David Kim', role: 'Data Analyst', department: 'Analytics', email: 'david.kim@company.com', location: 'Seattle', status: 'active', avatar: 'DK', salary: 110000, startDate: '2021-09-20', manager: 'Sarah Chen', phone: '+1 (206) 555-0321' },
  { id: 5, name: 'Emma Thompson', role: 'Marketing Lead', department: 'Marketing', email: 'emma.t@company.com', location: 'Chicago', status: 'on-leave', avatar: 'ET', salary: 120000, startDate: '2019-11-05', manager: 'Lisa Park', phone: '+1 (312) 555-0654' },
  { id: 6, name: 'James Wilson', role: 'Engineering Manager', department: 'Engineering', email: 'james.w@company.com', location: 'San Francisco', status: 'active', avatar: 'JW', salary: 175000, startDate: '2018-04-22', manager: 'CEO', phone: '+1 (415) 555-0987' },
  { id: 7, name: 'Priya Patel', role: 'Backend Engineer', department: 'Engineering', email: 'priya.p@company.com', location: 'Remote', status: 'active', avatar: 'PP', salary: 130000, startDate: '2022-06-01', manager: 'James Wilson', phone: '+1 (650) 555-0111' },
  { id: 8, name: 'Carlos Mendez', role: 'Sales Executive', department: 'Sales', email: 'carlos.m@company.com', location: 'Miami', status: 'active', avatar: 'CM', salary: 95000, startDate: '2023-02-14', manager: 'Lisa Park', phone: '+1 (305) 555-0222' },
]

export const candidates = [
  { id: 1, name: 'Alex Morgan', role: 'Senior Frontend Engineer', stage: 'interview', score: 87, applied: '2024-01-15', avatar: 'AM', experience: '6 years', location: 'San Francisco', email: 'alex.morgan@email.com' },
  { id: 2, name: 'Jordan Lee', role: 'Product Manager', stage: 'offer', score: 92, applied: '2024-01-10', avatar: 'JL', experience: '8 years', location: 'New York', email: 'jordan.lee@email.com' },
  { id: 3, name: 'Sam Torres', role: 'Backend Engineer', stage: 'applied', score: 74, applied: '2024-01-18', avatar: 'ST', experience: '4 years', location: 'Austin', email: 'sam.torres@email.com' },
  { id: 4, name: 'Riley Park', role: 'UX Designer', stage: 'screening', score: 81, applied: '2024-01-12', avatar: 'RP', experience: '5 years', location: 'Seattle', email: 'riley.park@email.com' },
  { id: 5, name: 'Casey Brown', role: 'DevOps Engineer', stage: 'interview', score: 79, applied: '2024-01-14', avatar: 'CB', experience: '7 years', location: 'Remote', email: 'casey.brown@email.com' },
  { id: 6, name: 'Morgan Davis', role: 'Data Scientist', stage: 'applied', score: 85, applied: '2024-01-20', avatar: 'MD', experience: '5 years', location: 'Boston', email: 'morgan.davis@email.com' },
  { id: 7, name: 'Drew Wilson', role: 'Senior Frontend Engineer', stage: 'screening', score: 76, applied: '2024-01-16', avatar: 'DW', experience: '3 years', location: 'Chicago', email: 'drew.wilson@email.com' },
  { id: 8, name: 'Taylor Smith', role: 'Marketing Manager', stage: 'offer', score: 89, applied: '2024-01-08', avatar: 'TS', experience: '9 years', location: 'Los Angeles', email: 'taylor.smith@email.com' },
  { id: 9, name: 'Quinn Johnson', role: 'Backend Engineer', stage: 'interview', score: 83, applied: '2024-01-13', avatar: 'QJ', experience: '6 years', location: 'Denver', email: 'quinn.johnson@email.com' },
]

export const jobs = [
  { id: 1, title: 'Senior Frontend Engineer', department: 'Engineering', location: 'San Francisco / Remote', applicants: 47, status: 'active', posted: '2024-01-05', type: 'Full-time', salary: '$140k–$180k' },
  { id: 2, title: 'Product Manager', department: 'Product', location: 'New York', applicants: 32, status: 'active', posted: '2024-01-08', type: 'Full-time', salary: '$130k–$160k' },
  { id: 3, title: 'UX Designer', department: 'Design', location: 'Remote', applicants: 28, status: 'active', posted: '2024-01-10', type: 'Full-time', salary: '$110k–$140k' },
  { id: 4, title: 'DevOps Engineer', department: 'Engineering', location: 'Seattle', applicants: 19, status: 'paused', posted: '2023-12-20', type: 'Full-time', salary: '$130k–$160k' },
  { id: 5, title: 'Data Scientist', department: 'Analytics', location: 'Remote', applicants: 55, status: 'active', posted: '2024-01-12', type: 'Full-time', salary: '$125k–$155k' },
]

export const hiringFunnelData = [
  { stage: 'Applied', count: 342, fill: '#7c3aed' },
  { stage: 'Screening', count: 187, fill: '#8b5cf6' },
  { stage: 'Interview', count: 94, fill: '#a78bfa' },
  { stage: 'Offer', count: 28, fill: '#c4b5fd' },
  { stage: 'Hired', count: 18, fill: '#ddd6fe' },
]

export const attendanceData = [
  { day: 'Mon', present: 142, absent: 8, remote: 24 },
  { day: 'Tue', present: 138, absent: 11, remote: 27 },
  { day: 'Wed', present: 145, absent: 6, remote: 22 },
  { day: 'Thu', present: 140, absent: 9, remote: 25 },
  { day: 'Fri', present: 133, absent: 14, remote: 29 },
  { day: 'Sat', present: 18, absent: 0, remote: 12 },
  { day: 'Sun', present: 5, absent: 0, remote: 3 },
]

export const monthlyHeadcount = [
  { month: 'Aug', headcount: 142 },
  { month: 'Sep', headcount: 148 },
  { month: 'Oct', headcount: 155 },
  { month: 'Nov', headcount: 159 },
  { month: 'Dec', headcount: 163 },
  { month: 'Jan', headcount: 174 },
]

export const payrollData = [
  { month: 'Aug', total: 1820000 },
  { month: 'Sep', total: 1890000 },
  { month: 'Oct', total: 1950000 },
  { month: 'Nov', total: 1980000 },
  { month: 'Dec', total: 2100000 },
  { month: 'Jan', total: 2150000 },
]

export const departmentData = [
  { name: 'Engineering', value: 68, fill: '#7c3aed' },
  { name: 'Product', value: 24, fill: '#8b5cf6' },
  { name: 'Design', value: 18, fill: '#a78bfa' },
  { name: 'Sales', value: 32, fill: '#c4b5fd' },
  { name: 'Marketing', value: 22, fill: '#6d28d9' },
  { name: 'HR & Ops', value: 10, fill: '#4c1d95' },
]

export const activityFeed = [
  { id: 1, type: 'hire', user: 'Jordan Lee', action: 'accepted offer for Product Manager', time: '2 hours ago', avatar: 'JL' },
  { id: 2, type: 'interview', user: 'Alex Morgan', action: 'completed technical interview', time: '4 hours ago', avatar: 'AM' },
  { id: 3, type: 'review', user: 'Sarah Chen', action: 'submitted performance review', time: '6 hours ago', avatar: 'SC' },
  { id: 4, type: 'onboard', user: 'Priya Patel', action: 'completed onboarding checklist', time: '1 day ago', avatar: 'PP' },
  { id: 5, type: 'leave', user: 'Emma Thompson', action: 'leave request approved — 5 days', time: '1 day ago', avatar: 'ET' },
  { id: 6, type: 'job', user: 'HR Team', action: 'posted new role: Data Scientist', time: '2 days ago', avatar: 'HR' },
]

export const upcomingInterviews = [
  { id: 1, candidate: 'Alex Morgan', role: 'Senior Frontend Engineer', time: 'Today 2:00 PM', interviewer: 'James Wilson', type: 'Technical' },
  { id: 2, candidate: 'Casey Brown', role: 'DevOps Engineer', time: 'Today 4:30 PM', interviewer: 'Sarah Chen', type: 'Technical' },
  { id: 3, candidate: 'Quinn Johnson', role: 'Backend Engineer', time: 'Tomorrow 10:00 AM', interviewer: 'James Wilson', type: 'System Design' },
  { id: 4, candidate: 'Riley Park', role: 'UX Designer', time: 'Tomorrow 2:00 PM', interviewer: 'Aisha Johnson', type: 'Portfolio Review' },
]

export const payrollEmployees = [
  { id: 1, name: 'Sarah Chen', role: 'Senior Engineer', department: 'Engineering', avatar: 'SC', gross: 12083, deductions: 2900, net: 9183, status: 'paid' },
  { id: 2, name: 'Marcus Rivera', role: 'Product Manager', department: 'Product', avatar: 'MR', gross: 11250, deductions: 2700, net: 8550, status: 'paid' },
  { id: 3, name: 'James Wilson', role: 'Engineering Manager', department: 'Engineering', avatar: 'JW', gross: 14583, deductions: 3500, net: 11083, status: 'paid' },
  { id: 4, name: 'Aisha Johnson', role: 'UX Designer', department: 'Design', avatar: 'AJ', gross: 9583, deductions: 2300, net: 7283, status: 'pending' },
  { id: 5, name: 'David Kim', role: 'Data Analyst', department: 'Analytics', avatar: 'DK', gross: 9167, deductions: 2200, net: 6967, status: 'pending' },
  { id: 6, name: 'Priya Patel', role: 'Backend Engineer', department: 'Engineering', avatar: 'PP', gross: 10833, deductions: 2600, net: 8233, status: 'paid' },
]
