// LocalStorage data structures

export interface FavoriteFund {
  proj_id: string;
  proj_abbr_name: string;
  proj_name_th: string;
  proj_name_en: string;
  added_at: string;
}

export interface RecentViewFund {
  proj_id: string;
  proj_abbr_name: string;
  proj_name_th: string;
  proj_name_en: string;
  viewed_at: string;
}

export interface LocalStorageData {
  favorites: FavoriteFund[];
  recent: RecentViewFund[];
  theme: 'light' | 'dark';
  locale: 'th' | 'en';
}

// MongoDB schema interfaces (for future migration)

export interface MongoFavoriteFund {
  _id?: string;
  userId: string;
  projId: string;
  projAbbrName: string;
  projNameTh: string;
  projNameEn: string;
  addedAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MongoRecentViewFund {
  _id?: string;
  userId: string;
  projId: string;
  projAbbrName: string;
  projNameTh: string;
  projNameEn: string;
  viewedAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MongoUserPreferences {
  _id?: string;
  userId: string;
  theme: 'light' | 'dark';
  locale: 'th' | 'en';
  createdAt?: Date;
  updatedAt?: Date;
}
