// campaigns/campaigns.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Campaign {
  id: number; title: string; excerpt: string; imageUrl: string;
  raised: number; goal: number; donors: number; daysLeft: number;
  category: string; categoryLabel: string; categoryIcon: string;
  creatorName: string; creatorAvatar: string; location: string;
  province: string; createdAt: Date;
}

@Component({
  selector: 'app-campaigns',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './campaigns.component.html',
})
export class CampaignsComponent implements OnInit {
  searchQuery = '';
  sortBy = 'newest';
  viewMode: 'grid' | 'list' = 'grid';
  selectedProvince = '';
  maxGoal = 1000000;
  selectedStatus = 'all';
  currentPage = 1;
  pages = [1, 2, 3, 4];

  categories = [
    { name: 'Education', icon: '🎓', slug: 'education', count: 84, selected: false },
    { name: 'Medical', icon: '🏥', slug: 'medical', count: 67, selected: false },
    { name: 'Disaster Relief', icon: '🌪️', slug: 'disaster', count: 42, selected: false },
    { name: 'Agriculture', icon: '🌾', slug: 'agriculture', count: 38, selected: false },
    { name: 'Environment', icon: '🌳', slug: 'environment', count: 24, selected: false },
    { name: 'Child Welfare', icon: '🧒', slug: 'children', count: 25, selected: false },
  ];

  provinces = ['Koshi', 'Madhesh', 'Bagmati', 'Gandaki', 'Lumbini', 'Karnali', 'Sudurpashchim'];

  statusOptions = [
    { value: 'all', label: 'All Campaigns' },
    { value: 'active', label: 'Active' },
    { value: 'ending', label: 'Ending Soon' },
    { value: 'completed', label: 'Completed' },
  ];

  allCampaigns: Campaign[] = [
    { id: 1, title: 'Scholarships for Girls in Jumla District', excerpt: 'Help 20 bright young women pursue higher education in remote Karnali Province.', imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600', raised: 72000, goal: 100000, donors: 134, daysLeft: 18, category: 'education', categoryLabel: 'Education', categoryIcon: '🎓', creatorName: 'Sunita Tamang', creatorAvatar: 'https://i.pravatar.cc/40?img=5', location: 'Jumla', province: 'Karnali', createdAt: new Date('2024-01-10') },
    { id: 2, title: 'Emergency Surgery Fund for Bir Hospital Patient', excerpt: '12-year-old Roshan needs life-saving cardiac surgery. Every rupee counts.', imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600', raised: 185000, goal: 300000, donors: 412, daysLeft: 5, category: 'medical', categoryLabel: 'Medical', categoryIcon: '🏥', creatorName: 'Dr. Ankit Sharma', creatorAvatar: 'https://i.pravatar.cc/40?img=12', location: 'Kathmandu', province: 'Bagmati', createdAt: new Date('2024-01-15') },
    { id: 3, title: 'Rebuild Kavre School Damaged by Floods', excerpt: 'Monsoon floods destroyed the only school in Banepa village. Help us rebuild it.', imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600', raised: 410000, goal: 500000, donors: 891, daysLeft: 12, category: 'disaster', categoryLabel: 'Disaster', categoryIcon: '🌪️', creatorName: 'Kavre Community Trust', creatorAvatar: 'https://i.pravatar.cc/40?img=22', location: 'Kavre', province: 'Bagmati', createdAt: new Date('2024-01-05') },
    { id: 4, title: 'Organic Farming Training for Mustang Farmers', excerpt: 'Sustainable agriculture training for 50 high-altitude farmers in Upper Mustang.', imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600', raised: 28000, goal: 80000, donors: 67, daysLeft: 30, category: 'agriculture', categoryLabel: 'Agriculture', categoryIcon: '🌾', creatorName: 'Nepal Agro Foundation', creatorAvatar: 'https://i.pravatar.cc/40?img=31', location: 'Mustang', province: 'Gandaki', createdAt: new Date('2024-01-20') },
    { id: 5, title: 'Tree Plantation Drive — Terai Region', excerpt: '10,000 native trees across degraded Terai forest lands. Join the green movement.', imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600', raised: 55000, goal: 75000, donors: 203, daysLeft: 22, category: 'environment', categoryLabel: 'Environment', categoryIcon: '🌳', creatorName: 'Green Nepal Collective', creatorAvatar: 'https://i.pravatar.cc/40?img=41', location: 'Chitwan', province: 'Bagmati', createdAt: new Date('2024-01-18') },
    { id: 6, title: 'Child Nutrition Program — Humla', excerpt: 'Providing daily nutritious meals to 200 malnourished children in Humla district.', imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600', raised: 92000, goal: 120000, donors: 315, daysLeft: 9, category: 'children', categoryLabel: 'Child Welfare', categoryIcon: '🧒', creatorName: 'Care Nepal NGO', creatorAvatar: 'https://i.pravatar.cc/40?img=51', location: 'Humla', province: 'Karnali', createdAt: new Date('2024-01-12') },
  ];

  filteredCampaigns: Campaign[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.filteredCampaigns = [...this.allCampaigns];
  }

  onSearch(): void { this.applyFilters(); }
  onSort(): void { this.applyFilters(); }

  applyFilters(): void {
    let result = [...this.allCampaigns];
    const selectedCats = this.categories.filter(c => c.selected).map(c => c.slug);

    if (this.searchQuery.trim())
      result = result.filter(c => c.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || c.excerpt.toLowerCase().includes(this.searchQuery.toLowerCase()));
    if (selectedCats.length > 0)
      result = result.filter(c => selectedCats.includes(c.category));
    if (this.selectedProvince)
      result = result.filter(c => c.province === this.selectedProvince);
    result = result.filter(c => c.goal <= this.maxGoal);
    if (this.selectedStatus === 'ending')
      result = result.filter(c => c.daysLeft <= 7);
    else if (this.selectedStatus === 'active')
      result = result.filter(c => c.daysLeft > 0);

    if (this.sortBy === 'newest') result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    else if (this.sortBy === 'ending') result.sort((a, b) => a.daysLeft - b.daysLeft);
    else if (this.sortBy === 'popular') result.sort((a, b) => b.raised - a.raised);
    else if (this.sortBy === 'goal') result.sort((a, b) => b.goal - a.goal);

    this.filteredCampaigns = result;
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedProvince = '';
    this.maxGoal = 1000000;
    this.selectedStatus = 'all';
    this.categories.forEach(c => c.selected = false);
    this.filteredCampaigns = [...this.allCampaigns];
  }

  getProgress(c: Campaign): number {
    return Math.min(100, Math.round((c.raised / c.goal) * 100));
  }

  goToDetail(id: number): void {
    this.router.navigate(['/campaigns', id]);
  }
}