import { RateI } from '../../utils/types';
export interface ComponentPropsI {
  rateChart: RateI[];
  insertRate: (orangeName: string, orangePrice: number) => void;
  deleteRate: (id: string) => void;
  updateRate: (id: string, jobs: { path: string[]; value: any }[]) => void;
  isProfileOwner: boolean;
}

export interface ComponentStateI {
  rowIdToEdit: string;
}
