import { create } from 'zustand';

type layoutState = {
  currentLayout: string;
  changeLayout: (layout: string) => void;
};

export const useLayout = create<layoutState>()((set) => ({
  currentLayout: 'Card',
  changeLayout: (layout) => {
    set(() => {
      return {
        currentLayout: layout,
      };
    });
  },
}));
