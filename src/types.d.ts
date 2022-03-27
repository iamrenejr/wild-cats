// This file stores the app's most important types

// Store action payloads
interface ICatDataByBreedPayload {
  breed: string;
  data: ICatDataItem[];
}

// Generic Reducer/Store data types
type Reducer<S, A> = (prevState: S, action: A) => S;
type ActionPayload = string | ICatBreedsData[] | ICatDataByBreedPayload;
type StoreAction = { type: string; payload?: ActionPayload };
interface IStoreState {
  selectedCat: string;
  breeds: Record<string, ICatBreedsData>;
  catData: Record<string, ICatDataItem[]>;
}

// Context values interface
interface IContextValues {
  state: IStoreState;
  selectCat: function;
  getBreedData: function;
  getCatDataByBreed: function;
}

// Items stored under `breeds` key of store
// This is used to populate the drop down in the home page
interface ICatBreedsData {
  id: string;
  name: string;
}

// Items stored under `catData` key of store
// This is used to populate the gallery of cat photos
interface ICatDataItem {
  id: string;
  name: string;
  description: string;
  url: string;
  origin: string;
  temperament: string;
}
type UrlRecord = Partial<ICatDataItem>;

// Common Component event handler data types
type SelectOnChangeHandler = (ev: ChangeEvent<HTMLSelectElement>) => void;

// Common Component prop data types
type Style = Record<string, string | number>;
