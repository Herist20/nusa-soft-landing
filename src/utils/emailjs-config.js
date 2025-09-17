// EmailJS Configuration
// Sign up at https://www.emailjs.com/ to get your own IDs

export const EMAILJS_CONFIG = {
  // Replace with your actual EmailJS Service ID
  SERVICE_ID: 'YOUR_SERVICE_ID',
  
  // Replace with your actual EmailJS Template ID
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID',
  
  // Replace with your actual EmailJS Public Key
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY'
}

// Instructions to set up EmailJS:
// 1. Go to https://www.emailjs.com/ and create an account
// 2. Add your email service (Gmail, Outlook, etc.)
// 3. Create an email template with these variables:
//    - to_email
//    - from_name
//    - from_email
//    - phone
//    - company
//    - project_type
//    - budget
//    - contact_method
//    - timeline
//    - description
//    - submission_date
// 4. Get your Service ID, Template ID, and Public Key from the dashboard
// 5. Replace the values above with your actual IDs

// Example Email Template:
// Subject: New Project Inquiry from {{from_name}}
//
// Hello Nusa Software Team,
//
// You have received a new project inquiry through your website.
//
// Contact Information:
// - Name: {{from_name}}
// - Email: {{from_email}}
// - Phone: {{phone}}
// - Company: {{company}}
//
// Project Details:
// - Type: {{project_type}}
// - Budget: {{budget}}
// - Timeline: {{timeline}}
// - Preferred Contact: {{contact_method}}
//
// Description:
// {{description}}
//
// Submitted on: {{submission_date}}
//
// Please respond within 24 hours as promised.