import { IFetchedFood } from '../../../../core/@types/IFetchedFood'

export interface IProps {
  pageContext: {
    data: IFetchedFood[]
  }
}
