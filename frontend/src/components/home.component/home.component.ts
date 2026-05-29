// home.component.ts
import { Component, OnInit } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Campaign {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  raised: number;
  goal: number;
  donors: number;
  daysLeft: number;
  category: string;
  categoryLabel: string;
  creatorName: string;
  creatorAvatar: string;
  location: string;
  bookmarked: boolean;
}

interface Category {
  icon: string;
  name: string;
  slug: string;
  count: number;
  color: string;
}

interface Step {
  icon: string;
  title: string;
  desc: string;
}

interface ImpactStat {
  value: string;
  label: string;
  desc: string;
}

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  menuOpen = false;

  totalRaised = 12500000;
  totalCampaigns = 340;
  totalDonors = 8900;

  categories: Category[] = [
    { icon: '🎓', name: 'Education', slug: 'education', count: 84, color: '#3B82F6' },
    { icon: '🏥', name: 'Medical', slug: 'medical', count: 67, color: '#EF4444' },
    { icon: '🌪️', name: 'Disaster Relief', slug: 'disaster', count: 42, color: '#F59E0B' },
    { icon: '🌾', name: 'Agriculture', slug: 'agriculture', count: 38, color: '#10B981' },
    { icon: '🐄', name: 'Livestock', slug: 'livestock', count: 29, color: '#8B5CF6' },
    { icon: '🏗️', name: 'Infrastructure', slug: 'infrastructure', count: 31, color: '#EC4899' },
    { icon: '🧒', name: 'Child Welfare', slug: 'children', count: 25, color: '#06B6D4' },
    { icon: '🌳', name: 'Environment', slug: 'environment', count: 24, color: '#2E7D32' },
  ];

  featuredCampaigns: Campaign[] = [
    {
      id: 1,
      title: 'Scholarships for Girls in Jumla District',
      excerpt: 'Help 20 bright young women pursue higher education in remote Karnali Province.',
      imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600',
      raised: 72000,
      goal: 100000,
      donors: 134,
      daysLeft: 18,
      category: 'education',
      categoryLabel: '🎓 Education',
      creatorName: 'Sunita Tamang',
      creatorAvatar: 'https://i.pravatar.cc/40?img=5',
      location: 'Jumla, Karnali',
      bookmarked: false,
    },
    {
      id: 2,
      title: 'Emergency Surgery Fund for Bir Hospital Patient',
      excerpt: '12-year-old Roshan needs life-saving cardiac surgery. Every rupee brings him closer.',
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600',
      raised: 185000,
      goal: 300000,
      donors: 412,
      daysLeft: 5,
      category: 'medical',
      categoryLabel: '🏥 Medical',
      creatorName: 'Dr. Ankit Sharma',
      creatorAvatar: 'https://i.pravatar.cc/40?img=12',
      location: 'Kathmandu',
      bookmarked: true,
    },
    {
      id: 3,
      title: 'Rebuild Kavre School Damaged by Floods',
      excerpt: 'Monsoon floods destroyed the only school in Banepa village. Help us rebuild.',
      imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600',
      raised: 410000,
      goal: 500000,
      donors: 891,
      daysLeft: 12,
      category: 'disaster',
      categoryLabel: '🌪️ Disaster Relief',
      creatorName: 'Kavre Community Trust',
      creatorAvatar: 'https://i.pravatar.cc/40?img=22',
      location: 'Kavre, Bagmati',
      bookmarked: false,
    },
  ];

  steps: Step[] = [
    {
      icon: '✏️',
      title: 'Create Your Campaign',
      desc: 'Tell your story with photos, videos, and your funding goal. It takes less than 10 minutes.',
    },
    {
      icon: '📣',
      title: 'Share & Spread the Word',
      desc: 'Share on social media, WhatsApp, and beyond. The more you share, the more impact you create.',
    },
    {
      icon: '💸',
      title: 'Receive Funds Securely',
      desc: 'Donations flow directly to your verified account via eSewa, Khalti, or bank transfer.',
    },
  ];

  impactStats: ImpactStat[] = [
    { value: 'रू 1.25 Cr+', label: 'Total Raised', desc: 'funds mobilized since 2023' },
    { value: '340+', label: 'Campaigns', desc: 'across 7 provinces' },
    { value: '8,900+', label: 'Donors', desc: 'from Nepal and diaspora worldwide' },
    { value: '94%', label: 'Success Rate', desc: 'of verified campaigns reach goal' },
  ];

  testimonials: Testimonial[] = [
    {
      quote: 'Within 3 days of launching, my daughter\'s medical campaign was fully funded. Supportify gave our family hope when we had none.',
      name: 'Kamala Devi Poudel',
      role: 'Campaign Creator',
      location: 'Pokhara, Gandaki',
      avatar: 'https://i.pravatar.cc/60?img=47',
    },
    {
      quote: 'I donated to 5 campaigns this year. It feels incredible to know exactly where my money goes and to see real progress updates.',
      name: 'Rohan Bhattarai',
      role: 'Regular Donor',
      location: 'Lalitpur, Bagmati',
      avatar: 'https://i.pravatar.cc/60?img=33',
    },
    {
      quote: 'As an NGO, Supportify helped us raise funds 3x faster than traditional methods. The platform is transparent and trustworthy.',
      name: 'Srijana Magar',
      role: 'NGO Director',
      location: 'Butwal, Lumbini',
      avatar: 'https://i.pravatar.cc/60?img=9',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  navigateToCategory(slug: string): void {
    this.router.navigate(['/campaigns'], { queryParams: { category: slug } });
  }

  getProgress(campaign: Campaign): number {
    return Math.min(100, Math.round((campaign.raised / campaign.goal) * 100));
  }

  toggleBookmark(campaign: Campaign, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    campaign.bookmarked = !campaign.bookmarked;
  }
}