import { z } from 'zod';

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  accountType: z.enum(['contractor', 'procurement']),
});

export const signupSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  accountType: z.enum(['contractor', 'procurement']),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

// Profile schemas
export const contractorProfileSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  location: z.string().optional(),
  naicsCodes: z.string().transform(val => val.split(',').map(s => s.trim()).filter(Boolean)),
  serviceAreas: z.string().transform(val => val.split(',').map(s => s.trim()).filter(Boolean)),
  description: z.string().optional(),
  yearsInBusiness: z.number().min(0).optional(),
  openToTeaming: z.boolean(),
  openToJv: z.boolean(),
  openToSubcontracting: z.boolean(),
  certifications: z.object({
    dbe: z.boolean(),
    hubzone: z.boolean(),
    eighta: z.boolean(),
    mbe: z.boolean(),
    wbe: z.boolean(),
    sdvosb: z.boolean(),
  }),
});

export const procurementProfileSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  agency: z.string().min(2, 'Agency/Organization is required'),
  department: z.string().optional(),
  title: z.string().optional(),
});

// Opportunity schemas
export const opportunitySchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  naicsCodes: z.string()
    .min(1, 'At least one NAICS code is required')
    .transform(val => val.split(',').map(s => s.trim()).filter(Boolean)),
  location: z.string().min(2, 'Location is required'),
  budgetMin: z.number().min(0).optional(),
  budgetMax: z.number().min(0).optional(),
  submissionDeadline: z.string().min(1, 'Submission deadline is required'),
  type: z.enum(['procurement', 'teaming']),
  requirements: z.string().optional().transform(val => val ? val.split('\n').filter(Boolean) : []),
  contactEmail: z.string().email('Please enter a valid contact email'),
  contactName: z.string().min(2, 'Contact name is required'),
}).refine((data) => {
  if (data.budgetMin && data.budgetMax) {
    return data.budgetMax >= data.budgetMin;
  }
  return true;
}, {
  message: 'Maximum budget must be greater than minimum budget',
  path: ['budgetMax'],
});

// Bid schema
export const bidSchema = z.object({
  amount: z.number().min(1, 'Bid amount is required'),
  summary: z.string().min(20, 'Summary must be at least 20 characters'),
});

// Message schema
export const messageSchema = z.object({
  subject: z.string().min(2, 'Subject is required'),
  content: z.string().min(10, 'Message must be at least 10 characters'),
});

// Event registration schema
export const eventRegistrationSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email'),
  company: z.string().min(2, 'Company name is required'),
  phone: z.string().optional(),
  dietaryRestrictions: z.string().optional(),
});

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type ContractorProfileFormData = z.infer<typeof contractorProfileSchema>;
export type ProcurementProfileFormData = z.infer<typeof procurementProfileSchema>;
export type OpportunityFormData = z.infer<typeof opportunitySchema>;
export type BidFormData = z.infer<typeof bidSchema>;
export type MessageFormData = z.infer<typeof messageSchema>;
export type EventRegistrationFormData = z.infer<typeof eventRegistrationSchema>;
