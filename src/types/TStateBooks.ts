import { TBook } from './TBook'
import { TLoadingStatus } from './TLoadingStatus'


export type TStateBooks = {
  totalItems: number,
  items: TBook[],
  loadingStatus: TLoadingStatus,
}
