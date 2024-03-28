import { Product } from '@/src/payload-type';
import { create } from 'zustand';

// export type ProductsAll = {
//   products: Product[];
// };

type ProductsState = {
  firstRound: boolean;
  products: Product[] | null;
  isLoading: boolean;
  filterArray: object[];
  defaultValueTags: object[] | { [key: string]: string }[];
  sortOption: string;
  hasNextPage: boolean | null;
  nextPage: number | null;
  setNewProducts: (
    products: Product[] | null,
    hasNextPage: boolean,
    nextPage: number | null
  ) => void;
  updateNewProducts: (
    products: Product[] | null,
    hasNextPage: boolean,
    nextPage: number | null
  ) => void;
  updateFilter: (filterArray: object[]) => void; //需要辨別是否有已經存在的 有變更 無新增
  changSort: (sort: string) => void;
  removeSort: (sortType: object) => void;
  firstRender: (
    filterCookie: object[],
    tagsArray: object[],
    sortCookie: object[]
  ) => void;
  setDefaultValueTags: (
    tagArray: object[] | { [key: string]: string }[]
  ) => void;
  setFirstRound: () => void;
  setIsLoading: (boolean: boolean) => void;
};

// 因為這些篩選排序的選項只是暫時存在，所以選擇使用cookie能維持一段時間。
export const useProducts = create<ProductsState>()((set) => ({
  firstRound: false,
  isLoading: false,
  products: [],
  filterArray: [],
  defaultValueTags: [],
  sortOption: '-createdAt',
  hasNextPage: false,
  nextPage: 1,
  setNewProducts: (products, hasNextPage, nextPage) => {
    set((state) => {
      return { hasNextPage: hasNextPage };
    });
    set((state) => {
      return { nextPage: nextPage };
    });
    if (products) {
      set((state) => {
        return { products: [...products] };
      });
    }
  },
  // 只有在到底時會觸發
  updateNewProducts: (products, hasNextPage, nextPage) => {
    set((state) => {
      return { hasNextPage: hasNextPage };
    });
    set((state) => {
      return { nextPage: nextPage };
    });
    set((state) => {
      if (!state.products || !products) {
        //保持原來
        return { products: state.products };
      }
      //有東西
      return { products: [...state.products, ...products] };
    });
  },
  updateFilter: async (filterArray) => {
    //加入至cookies
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/addFilterCookie`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application / json; charset = uft-8',
        },
        body: JSON.stringify(filterArray),
      }
    );
    const data = response.json();

    set((state) => {
      return { filterArray: filterArray };
    });
  },
  changSort: (sort) => {
    set(() => {
      return {
        nextPage: 1,
      };
    });
    set(() => {
      return {
        sortOption: sort,
      };
    });
  },
  removeSort: (sortType) => {},
  firstRender: async (filterCookie, tagsCookie, sortCookie) => {
    set((state) => {
      return {
        filterArray: [...filterCookie],
      };
    });
    set(() => {
      return {
        defaultValueTags: [...tagsCookie],
      };
    });
  },
  setDefaultValueTags: async (tags) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/addFilterTags`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application / json; charset = uft-8',
        },
        body: JSON.stringify(tags),
      }
    );
    const data = response.json();
    set((state) => {
      return { defaultValueTags: [...tags] };
    });
  },
  setFirstRound: () => {
    set((state) => {
      return {
        firstRound: true,
      };
    });
  },
  setIsLoading: (boolean) => {
    set((state) => {
      return {
        isLoading: boolean,
      };
    });
  },
}));
