// faq/faq.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Faq {
  question: string;
  answer: string;
  category: string;
  open: boolean;
  link?: { label: string; url: string };
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './faq.component.html',
})
export class FaqComponent implements OnInit {
  searchQuery = '';
  selectedCategory = 'all';

  faqCategories = [
    { id: 'all',       icon: '📋', label: 'All Questions' },
    { id: 'general',   icon: '🌱', label: 'General' },
    { id: 'campaigns', icon: '🎯', label: 'Campaigns' },
    { id: 'donations', icon: '💚', label: 'Donations' },
    { id: 'payments',  icon: '💳', label: 'Payments' },
    { id: 'trust',     icon: '🔒', label: 'Trust & Safety' },
  ];

  faqs: Faq[] = [
    // General
    { category: 'general', open: false, question: 'What is Supportify?', answer: 'Supportify is Nepal\'s leading crowdfunding platform that connects people with causes worth supporting. Whether it\'s education, medical needs, disaster relief, or community development — Supportify helps individuals, NGOs, and communities raise funds transparently and efficiently.' },
    { category: 'general', open: false, question: 'Is Supportify free to use?', answer: 'Creating an account and browsing campaigns is completely free. Supportify charges a small platform fee (3%) only when funds are successfully raised, to cover operational costs. There is zero fee for donors — every rupee you donate goes directly to the campaign.' },
    { category: 'general', open: false, question: 'Who can use Supportify?', answer: 'Any Nepali citizen or Nepal-based organization can create a campaign. Donors can be from Nepal or the diaspora anywhere in the world. You must be 18 years or older to create a campaign or donate independently.' },
    { category: 'general', open: false, question: 'Is Supportify registered in Nepal?', answer: 'Yes. Supportify is a registered company in Nepal under the Company Act 2063 (2006). We are also registered with the Department of Industry and comply with Nepal\'s financial and digital service regulations.' },

    // Campaigns
    { category: 'campaigns', open: false, question: 'How do I start a campaign?', answer: 'Creating a campaign is simple. Click "Start a Campaign", fill in your title, category, funding goal, story, and upload photos. Our team will review and verify your campaign within 24–48 hours. Once approved, it goes live and you can start sharing it.', link: { label: 'Start a Campaign', url: '/campaigns/create' } },
    { category: 'campaigns', open: false, question: 'How long does campaign verification take?', answer: 'Our trust team reviews all campaigns within 24–48 business hours. We check for authenticity, completeness of information, and legitimacy of the cause. You will receive an email once your campaign is approved or if additional information is needed.' },
    { category: 'campaigns', open: false, question: 'What happens if my campaign doesn\'t reach its goal?', answer: 'Supportify uses a flexible funding model. Even if you don\'t reach 100% of your goal, you still receive all funds raised. However, we strongly encourage realistic goal-setting. Campaigns that reach 30%+ in the first week have a 90% success rate of full funding.' },
    { category: 'campaigns', open: false, question: 'Can I edit my campaign after it\'s published?', answer: 'Yes, you can edit most details including your story, photos, and budget breakdown. However, the campaign title, category, and original goal cannot be changed after the first donation is received, to maintain donor trust. You can always post updates to share new information.' },
    { category: 'campaigns', open: false, question: 'How do I post an update on my campaign?', answer: 'From your Dashboard, go to "My Campaigns" and click "Post Update". Updates appear on your campaign page and are emailed to all donors. We strongly recommend posting updates at least once a week — it builds trust and often re-triggers donations.' },

    // Donations
    { category: 'donations', open: false, question: 'How do I know my donation reaches the right person?', answer: 'All campaigns are verified before going live. Funds are held in an escrow-like mechanism and released in tranches to campaigners as they show proof of use. We require receipts for all disbursements above रू 10,000. You can also track the campaign updates posted by the organizer.' },
    { category: 'donations', open: false, question: 'Can I donate anonymously?', answer: 'Yes. During checkout, simply check the "Donate Anonymously" option. Your donation will appear as "Anonymous" on the public donor list, but your name will still be recorded internally for receipt and tax purposes.' },
    { category: 'donations', open: false, question: 'Can I get a donation receipt for tax purposes?', answer: 'Yes. Immediately after a successful donation, you will receive a PDF donation receipt via email. Donations to verified NGO campaigns may be eligible for tax deductions under Nepal\'s Income Tax Act. Please consult your tax advisor for eligibility.' },
    { category: 'donations', open: false, question: 'Can I cancel or refund a donation?', answer: 'Donations are generally non-refundable once processed, as funds may have already been partially transferred. However, if a campaign is found to be fraudulent or violates our policies, we will issue a full refund to all donors. Contact support@supportify.com.np within 48 hours for exceptional cases.' },

    // Payments
    { category: 'payments', open: false, question: 'What payment methods are accepted?', answer: 'We accept eSewa, Khalti, ConnectIPS, IME Pay, and direct bank transfers (for large donations). For Nepali diaspora, we support international card payments (Visa, Mastercard) and Wise transfers. All payments are processed through secure, encrypted gateways.' },
    { category: 'payments', open: false, question: 'How long does it take for campaign creators to receive funds?', answer: 'Fund disbursements happen in three tranches: 30% after reaching 50% of goal, 50% more after campaign ends, and the remaining 20% after submission of final receipts. Direct bank transfer takes 2–3 business days after disbursement is triggered.' },
    { category: 'payments', open: false, question: 'Is there a minimum donation amount?', answer: 'Yes, the minimum donation is रू 10 to cover payment processing fees. There is no maximum — some donors have given up to रू 5 lakh in a single transaction for large campaigns.' },

    // Trust & Safety
    { category: 'trust', open: false, question: 'How does Supportify verify campaigns?', answer: 'Our trust team manually reviews every campaign before publishing. Verification includes: checking identity documents of the campaign creator, verifying the cause with third-party evidence (hospital letters, school certificates, etc.), and cross-referencing details with community partners. Verified campaigns display a blue checkmark.' },
    { category: 'trust', open: false, question: 'What if I suspect a campaign is fraudulent?', answer: 'Click the "Report" button on any campaign page. Our team investigates all reports within 12 hours. If fraud is confirmed, the campaign is immediately paused, funds are frozen, and all donors are notified and refunded. We take fraud very seriously and have a zero-tolerance policy.' },
    { category: 'trust', open: false, question: 'How is my personal and payment data protected?', answer: 'All data is encrypted using AES-256 encryption. We are GDPR-aligned and follow Nepal\'s data protection guidelines. We never share your personal data with third parties. Payment details are handled by certified payment gateways and are never stored on our servers.' },
    { category: 'trust', open: false, question: 'What are the rules for campaign content?', answer: 'Campaigns must be for legitimate, legal causes. Prohibited: campaigns for personal luxury, gambling, political parties, or anything that violates Nepali law. Content must not contain hate speech, misinformation, or explicit material. Violation results in immediate removal and account suspension.' },
  ];

  filteredFaqs: Faq[] = [];

  ngOnInit(): void {
    this.filteredFaqs = [...this.faqs];
  }

  filterFaqs(): void {
    let result = [...this.faqs];
    if (this.selectedCategory !== 'all')
      result = result.filter(f => f.category === this.selectedCategory);
    if (this.searchQuery.trim())
      result = result.filter(f =>
        f.question.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        f.answer.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    this.filteredFaqs = result;
  }

  toggleFaq(faq: Faq): void {
    faq.open = !faq.open;
  }

  get visibleCategories() {
    if (this.selectedCategory !== 'all') {
      return this.faqCategories.filter(c => c.id === this.selectedCategory);
    }
    const catsWithResults = [...new Set(this.filteredFaqs.map(f => f.category))];
    return this.faqCategories.filter(c => c.id !== 'all' && catsWithResults.includes(c.id));
  }

  getCatFaqs(catId: string): Faq[] {
    return this.filteredFaqs.filter(f => f.category === catId);
  }
}